#!/usr/local/bin/node
'use strict';
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { categories } = require('../data');

const RECIPE_METADATA_DIR = path.join(process.cwd(), 'metadata/recipes');
const RECIPE_PAGE_DIR = path.join(process.cwd(), 'pages/recipes');

function validateLength(minimumLength) {
  return function validate(answer) {
    return answer.length >= minimumLength;
  };
}

function validateKebabCase() {
  return function validate(answer) {
    const allowedCharacters = /[a-zA-Z-]/g;
    const matchedCharacters = answer.match(allowedCharacters);
    const containsSpace = /\s/g;
    return (
      matchedCharacters &&
      matchedCharacters.length === answer.length &&
      !answer.match(containsSpace)
    );
  };
}

function removeExtension(input) {
  const [filename, extension] = input.split('.');
  return filename;
}

async function validateSlugUniqueness(slug) {
  try {
    const filenames = await new Promise((resolve, reject) => {
      const options = { encoding: 'utf8' };
      fs.readdir(RECIPE_METADATA_DIR, options, (error, filenames) => {
        if (error) {
          return reject(error);
        }
        resolve(filenames);
      });
    });

    return !filenames.map(removeExtension).includes(slug);
  } catch (error) {
    console.error('aha!', error);
    return false;
  }
}

const questions = [
  {
    type: 'input',
    name: 'name',
    suffix: ' (of the dish)',
    validate: function validate(answer) {
      const isLongEnough = validateLength(2)(answer);
      if (!isLongEnough) {
        return '"Name" is too short. Needs to be at least two characters.';
      }
      return true;
    },
  },
  {
    type: 'input',
    name: 'slug',
    suffix: ' (Will be used for the url and filename)',
    validate: async function validate(answer) {
      const isLongEnough = validateLength(2)(answer);
      if (!isLongEnough) {
        return '"Slug" is too short. Needs to be at least two characters.';
      }

      const isKebabCase = validateKebabCase()(answer);
      if (!isKebabCase) {
        return '"Slug" contains illegal characters. Only kebab case (/[a-zA-Z-]/g) allowed.';
      }

      const isSlugUnique = await validateSlugUniqueness(answer);
      if (!isSlugUnique) {
        return '"Slug" already exists!';
      }

      return true;
    },
  },
  {
    type: 'list',
    name: 'category',
    suffix: ' (What type of dish it is)',
    choices: categories,
  },
  {
    type: 'input',
    name: 'timeToCook',
    message: 'time to cook',
  },
];

function createMetadata(filename, slug, name, category, timeToCook = '?') {
  return `{\n  "filename": "${filename}.mdx",\n  "slug": "${slug}",\n  "name": "${name}",\n  "category": "${category}"\n,  "time-to-cook": "${timeToCook}"\n}\n`;
}

function createRecipeTemplate(name) {
  return `# ${name}\n\n## Ingredienser\n\n ...\n\n## Instruktioner\n\n...\n`;
}

function createFile(filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, 'utf-8', (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
}

function createMetadataFile(name, slug, category, timeToCook) {
  const filename = `${RECIPE_METADATA_DIR}/${slug}.json`;
  const data = createMetadata(slug, slug, name, category, timeToCook);
  return createFile(filename, data);
}

function createRecipeTemplateFile(name, slug) {
  const filename = `${RECIPE_PAGE_DIR}/${slug}.mdx`;
  const data = createRecipeTemplate(name);
  return createFile(filename, data);
}

(async function run() {
  try {
    const answers = await inquirer.prompt(questions);

    try {
      await createMetadataFile(
        answers.name,
        answers.slug,
        answers.category,
        answers.timeToCook
      );
    } catch (error) {
      console.error('Error writing metadata file!', error);
      process.exit(1);
    }

    try {
      await createRecipeTemplateFile(answers.name, answers.slug);
    } catch (error) {
      console.error('Error writing mdx file!', error);
      process.exit(1);
    }

    process.exit(0);
  } catch (error) {
    if (error.isTtyError) {
      console.error(
        'Not possible to render prompt in current environment!',
        error
      );
      process.exit(1);
    } else {
      console.error('Something went wrong!', error);
      process.exit(1);
    }
  }
})();
