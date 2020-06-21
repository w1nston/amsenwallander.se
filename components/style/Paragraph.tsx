/** @jsx jsx */
import { css, jsx } from '@emotion/core';

type Props = {
  children: React.ReactNode;
};

const pStyles = css`
  padding: 0 1rem;
  font-family: 'Catamaran', sans-serif;
`;

export function Paragraph({ children }: Props) {
  return <p css={pStyles}>{children}</p>;
}
