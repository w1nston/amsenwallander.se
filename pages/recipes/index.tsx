/** @jsx jsx */
import Head from 'next/head';
import { css, jsx } from '@emotion/core';
import { getRecipeLinks } from '../../api/recipe';
import RecipeLinks from '../../components/recipe/RecipeLinks';
import { IRecipeLink } from '../../api/recipe/index';

type Props = {
  recipeLinks: IRecipeLink[];
};

const buttonStyles = css`
  color: #fefdfa;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0 1rem 1rem 0;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  font-size: 3rem;
  background-color: tomato;
  text-decoration: none;
  border: none;
`;

function FloatingButton() {
  return <button css={buttonStyles}>+</button>;
}

export default function Recipes({ recipeLinks }: Props) {
  return (
    <>
      <Head>
        <title>AW - Recept</title>
      </Head>
      <main>
        <RecipeLinks recipeLinks={recipeLinks} />
        <FloatingButton />
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
