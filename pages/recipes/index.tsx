/** @jsx jsx */
import Head from 'next/head';
import { css, jsx } from '@emotion/core';
import { getRecipeLinks } from '../../api/recipe';
import RecipeLinks from '../../components/recipe/RecipeLinks';
import { IRecipeLink } from '../../api/recipe/index';
import Filter from '../../components/icons/Filter';

type Props = {
  recipeLinks: IRecipeLink[];
};

/*
display: inline-block;
    border: none;
    padding: 1rem 2rem;
    margin: 0;
    text-decoration: none;
    background: #0069ed;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, 
                transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
}

button:hover,
button:focus {
    background: #0053ba;
}

button:focus {
    outline: 1px solid #fff;
    outline-offset: -4px;
}

button:active {
    transform: scale(0.99);
}
*/

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
  box-shadow: 6px 8px 8px -8px #4d4a48;

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }
`;

const filterIconStyles = css`
  width: 1.8rem;
`;

function FloatingButton() {
  return (
    <button css={buttonStyles}>
      <Filter css={filterIconStyles} />
    </button>
  );
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
