/** @jsx jsx */
import { useState } from 'react';
import { css, jsx, keyframes } from '@emotion/core';
import Filter from '../icons/Filter';
import { categories } from '../../data';
import { Category } from '../../api/recipe/index';

type Props = {
  onFilterSelected?: (category: Category) => void;
};

const expand = keyframes`
  from {
    height: 0;
  }
  to {
    height: 10.5rem;
  }
`;

const buttonStyles = css`
  color: #fefdfa;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0 1rem 1rem 0;
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
  padding: 0; /* fix for webkit circle issue */
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

const menuContainerStyles = css`
  position: fixed;
  bottom: 110px;
  right: 0px;
  margin-right: 2.5rem;
  width: 180px;
  height: 10.5rem;
  background-color: transparent;
  padding: 0.2rem;
  overflow-y: scroll;
  animation-duration: 0.5s;
  animation-name: ${expand};
`;

const menuButtonContainerStyles = css`
  display: flex;
  flex-direction: column;
`;

const menuButtonStyles = css`
  color: #fefdfa;
  background-color: #47b5ff;
  cursor: pointer;
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  height: 3rem;
  margin: 4px 0;
  font-size: 1.2rem;
  box-shadow: 6px 8px 8px -8px #4d4a48;

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }
`;

export default function FloatingButton({ onFilterSelected }: Props) {
  const [isOpen, setOpen] = useState(false);

  function handleClick(event: any) {
    // TODO: figure out correct type...
    event.preventDefault();
    setOpen(!isOpen);
  }

  function handleFilterSelected(category: Category) {
    return function handleClick(event: any) {
      event.preventDefault();
      if (onFilterSelected) {
        onFilterSelected(category);
      }
      setOpen(false);
    };
  }

  return (
    <>
      {isOpen ? (
        <div css={menuContainerStyles}>
          {(categories as Category[]).map((category: Category) => (
            <div css={menuButtonContainerStyles} key={category}>
              <button
                onClick={handleFilterSelected(category)}
                css={menuButtonStyles}
              >
                {category}
              </button>
            </div>
          ))}
        </div>
      ) : null}
      <button onClick={handleClick} css={buttonStyles}>
        <Filter css={filterIconStyles} />
      </button>
    </>
  );
}
