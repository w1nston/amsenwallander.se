import fs from 'fs';
import path from 'path';

const RECIPE_METADATA_DIR = path.join(process.cwd(), 'metadata/recipes');
const MARKDOWN_EXTENSIONS = ['md', 'mdx'];

export type IRecipeLink = {
  filename: string;
  slug: string;
  name: string;
  category: string; // TODO: perhaps string[]...
  // TODO: also, keywords: string[] ?
};

type RecipeFile = {
  name: string;
  slug: string;
  content: string;
};

function isJSONFile(file: string): boolean {
  const [, extension] = file.split('.');
  return 'json'.includes(extension);
}

function removeFileExtension(file: string): string {
  const matchGroup = MARKDOWN_EXTENSIONS.join('|');
  const regExp = new RegExp(`\\.(${matchGroup})$`);
  return file.replace(regExp, '');
}

export async function getRecipeMetadataFilenames(): Promise<string[]> {
  const options: any = { encoding: 'utf-8' };
  return new Promise((resolve, reject) => {
    fs.readdir(
      RECIPE_METADATA_DIR,
      options,
      (error: Error | null, files: string[]) => {
        if (error) {
          return reject(error);
        }

        // TODO:
        // Could keep a check if non-json files are discovered
        // and warn that files here only should be generated...
        const manifestFiles = files.filter(isJSONFile);

        return resolve(manifestFiles);
      }
    );
  });
}

export async function getRecipeLinks(): Promise<IRecipeLink[]> {
  let recipeLinks: IRecipeLink[] = [];

  try {
    // TODO: Be able to display a name for the link, as well as providing the path
    const metadataFiles = await getRecipeMetadataFilenames();

    // TODO: extract to fn
    const metadataContent = await Promise.all(
      metadataFiles.map((filename) =>
        import(`../../metadata/recipes/${filename}`)
      )
    );

    recipeLinks = metadataContent.map((module) => module.default);

    /**
     * Tricky to figure out how to get hold of metadata from mdx this way.
     * The key is to be able to extract it at build time so it doesn't have
     * to happen in the client.
     *
     * First solution will be to generate a metadata file separately,
     * i.e. create a CLI command to generate a new recipe/blog post, so
     * that the metadata file is generated to make it easier.
     *
     * Not ideal, because it would be easier to colocate the metadata
     * directly in the mdx file, since it is supported by mdx, however
     * not supported at pages-level in nextjs (https://github.com/vercel/next.js/issues/4502)
     */
  } catch (error) {
    console.log('Error getting recipe files', error);
  }

  return recipeLinks;
}
