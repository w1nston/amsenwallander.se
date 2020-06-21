import Head from 'next/head';
import { getRecipeLinks } from '../../api/recipe';
import RecipeLinks from '../../components/recipe/RecipeLinks';
import { IRecipeLink } from '../../api/recipe/index';

type Props = {
  recipeLinks: IRecipeLink[];
};

export default function Recipes({ recipeLinks }: Props) {
  return (
    <div>
      <Head>
        <title>AW - Recept</title>
      </Head>
      <main>
        <RecipeLinks recipeLinks={recipeLinks} />
      </main>
    </div>
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
