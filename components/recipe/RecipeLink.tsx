/** @jsx jsx */
import * as React from 'react';
import { css, jsx } from '@emotion/core';
import Link from 'next/link';

type Props = {
  name: string;
  slug: string;
  category: string;
};

const containerStyles = css`
  padding: 1.5rem;
  background-color: #faf0e630;
  margin: 1rem 0;
  box-shadow: 0 2px 6px -4px #4d4a48;
  border: none;
  width: 100vw;
  display: flex;
  flex-direction: column;
  text-align: start;
`;

const primaryTextStyles = css`
  font-size: 1.5rem;
  padding: 0 0 12px 0;
`;

const secondaryTextStyles = css`
  font-size: 1rem;
`;

export default function RecipeLink({ name, slug, category }: Props) {
  return (
    <Link href={`recipes/${slug}`}>
      <a css={containerStyles}>
        <div css={primaryTextStyles}>{name}</div>
        <div css={secondaryTextStyles}>{category}</div>
      </a>
    </Link>
  );
}
