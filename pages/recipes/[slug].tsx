import { getRecipes } from '../../features/recipes/list/queries/allRecipes'; 

function Recipe() {
  return <h1>I'm a recipe!</h1>;
}

export async function getStaticProps() {
  return {
    props: {},
  };
}

export async function getStaticPaths() {
  const recipes = await getRecipes();

  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default Recipe;
