/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Link from 'next/link';

type Props = {
  title: string;
  slug: string;
};

const containerStyles = css`
  padding: 1.5rem;
  background-color: #faf0e630;
  margin: 1rem 0;
  box-shadow: 0 2px 6px -4px #4d4a48;
  border: none;
  width: 100vw;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  text-align: start;
`;

const primaryTextStyles = css`
  font-size: 1.5rem;
  padding: 0 0 12px 0;
`;

export default function PreparationLink({ title, slug }: Props) {
  return (
    <Link href={`preparations/${slug}`}>
      <a css={containerStyles}>
        <div css={primaryTextStyles}>{title}</div>
      </a>
    </Link>
  );
}
