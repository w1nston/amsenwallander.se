/** @jsx jsx */
import { css, jsx } from '@emotion/core';

type Props = {
  children: React.ReactNode;
};

const pStyles = css`
  font-family: 'Catamaran', sans-serif;
`;

export function Paragraph({ children }: Props) {
  return <p css={pStyles}>{children}</p>;
}
