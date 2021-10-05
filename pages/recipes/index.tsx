import { getRecipes } from '../../features/recipes/list/queries/allRecipes';
import { Recipe } from '../../features/recipes/types';
import RecipeLink from '../../features/recipes/list/components/RecipeLink';

type RecipesProps = {
  recipes: Recipe[];
};

function Recipes({ recipes }: RecipesProps) {
  console.log({ recipes });

  return recipes.map((recipe) => (
    <RecipeLink
      key={recipe.id}
      title={recipe.title}
      slug={recipe.slug}
      tags={recipe.tags}
    />
  ));
}

export async function getStaticProps() {
  const recipes = await getRecipes();

  return {
    props: {
      recipes,
      revalidate: 60, // TODO: figure out a sane default
    },
  };
}

export default Recipes;
