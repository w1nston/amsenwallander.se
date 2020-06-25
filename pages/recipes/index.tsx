/** @jsx jsx */
import { useState } from 'react';
import Head from 'next/head';
import { css, jsx } from '@emotion/core';
import { getRecipeLinks } from '../../api/recipe';
import RecipeLinks from '../../components/recipe/RecipeLinks';
import { IRecipeLink, Category } from '../../api/recipe/index';
import FloatingButton from '../../components/recipe/FloatingButton';

type Props = {
  recipeLinks: IRecipeLink[];
};

const clearFilterButtonStyles = css`
  color: #fefdfa;
  background-color: #47b5ff;
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  height: 4rem;
  font-size: 1.2rem;
  width: 100vw;
  position: fixed;
  bottom: 0;

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }
`;

const noFilterMatchContainerStyles = css`
  padding: 1.5rem;
`;

export default function Recipes({ recipeLinks }: Props) {
  const [filterCategory, setFilterCategory] = useState<Category | null>(null);

  function handleFilterSelected(category: Category) {
    setFilterCategory(category);
  }

  function handleClearFilter(event: any) {
    event.preventDefault();
    setFilterCategory(null);
  }

  const recipes = filterCategory
    ? recipeLinks.filter((recipe) => recipe.category === filterCategory)
    : recipeLinks;

  return (
    <>
      <Head>
        <title>AW - Recept</title>
      </Head>
      <main>
        {recipes.length > 0 ? (
          <RecipeLinks recipeLinks={recipes} />
        ) : (
          <div css={noFilterMatchContainerStyles}>
            <p>Inga recept hittade med kategori: {filterCategory}.</p>
          </div>
        )}
        {filterCategory ? (
          <button css={clearFilterButtonStyles} onClick={handleClearFilter}>
            Rensa filter
          </button>
        ) : null}
        <FloatingButton onFilterSelected={handleFilterSelected} />
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
