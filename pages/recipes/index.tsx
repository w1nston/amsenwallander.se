import { getRecipes } from '../../features/recipes/list/queries/allRecipes';
import { IRecipe } from '../../features/recipes/types';
import RecipeLink from '../../features/recipes/list/components/RecipeLink';
import { fixCircularReferenceIssue } from '../../utils/fixCircularReferenceIssue';

type RecipesProps = {
  recipes: IRecipe[];
};

function Recipes({ recipes }: RecipesProps) {
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
  const rawRecipes = await getRecipes();
  const recipes = fixCircularReferenceIssue(rawRecipes);

  return {
    props: {
      recipes,
    },
    revalidate: 60, // TODO: figure out a sane default
  };
}

export default Recipes;
