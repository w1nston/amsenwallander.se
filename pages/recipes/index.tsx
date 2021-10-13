import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { getRecipes } from '../../features/recipes/list/queries/allRecipes';
import { IRecipe } from '../../features/recipes/types';
import RecipeLink from '../../features/recipes/list/components/RecipeLink';
import FilterButton from '../../features/recipes/list/components/FilterButton';
import { fixCircularReferenceIssue } from '../../utils/fixCircularReferenceIssue';

type RecipesProps = {
  recipes: IRecipe[];
  categories: string[];
};

const TEN_MINUTES = 60 * 10;

function Recipes({ categories, recipes }: RecipesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  function handleFilterChange(category: string) {
    setSelectedCategory(category);
  }

  function filterOnCategory(recipe) {
    if (selectedCategory === null) {
      return true;
    }

    return recipe.tags.some((tag) => tag === selectedCategory);
  }

  function handleClickResetFilter() {
    setSelectedCategory(null);
  }

  // TODO Try to use <Stack/> instead of <Box />
  return (
    <>
      {recipes.filter(filterOnCategory).map((recipe) => (
        <Box key={recipe.id} sx={{ margin: '1rem 0' }}>
          <RecipeLink
            title={recipe.title}
            slug={recipe.slug}
            tags={recipe.tags}
          />
        </Box>
      ))}
      <FilterButton
        categories={categories}
        onFilterChange={handleFilterChange}
      />
      {selectedCategory ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickResetFilter}
          sx={{
            position: 'absolute',
            bottom: '1rem',
            height: '3.5rem',
            width: '72vw',
          }}
        >
          Rensa filter
        </Button>
      ) : null}
    </>
  );
}

function transformTagsToSet(acc: Set<string>, tags: string[]): Set<string> {
  tags.forEach((tag) => {
    acc.add(tag);
  });
  return acc;
}

export async function getStaticProps() {
  const rawRecipes = await getRecipes();
  const recipes = fixCircularReferenceIssue(rawRecipes);

  const categories = recipes
    .map((recipe) => recipe.tags)
    .reduce(transformTagsToSet, new Set<string>());

  return {
    props: {
      recipes,
      categories: Array.from(categories),
    },
    revalidate: TEN_MINUTES,
  };
}

export default Recipes;
