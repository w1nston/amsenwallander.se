/** @jsx jsx */
import { css, jsx } from '@emotion/core';

type Props = {
  children: React.ReactNode;
};

const articleStyles = css`
  padding: 0 1rem;
`;

export function Layout({ children }: Props) {
  return <article css={articleStyles}>{children}</article>;
}
