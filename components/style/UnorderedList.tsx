/** @jsx jsx */
import { Children } from 'react';
import { css, jsx } from '@emotion/core';

function cloneElement(element: any, props: any) {
  return jsx(element.type, {
    key: element.key,
    ref: element.ref,
    ...element.props,
    ...props,
  });
}

type Props = {
  children: any;
};

const listStyles = css`
  padding: 0 2rem;
  margin-top: 0;
`;

const listItemStyles = css`
  /* TODO */
`;

export function UnorderedList({ children }: Props) {
  return (
    <ul css={listStyles}>
      {Children.map(children, (child) =>
        cloneElement(child, {
          css: listItemStyles,
        })
      )}
    </ul>
  );
}
