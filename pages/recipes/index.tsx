import Head from 'next/head';
import { getRecipeLinks } from '../../api/recipe';
import RecipeLinks from '../../components/recipe/RecipeLinks';
import { IRecipeLink } from '../../api/recipe/index';

type Props = {
  recipeLinks: IRecipeLink[];
};

export default function Recipes({ recipeLinks }: Props) {
  return (
    <>
      <Head>
        <title>AW - Recept</title>
      </Head>
      <main>
        <RecipeLinks recipeLinks={recipeLinks} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const recipeLinks = await getRecipeLinks();

  return {
    props: {
      recipeLinks,
    },
  };
}
