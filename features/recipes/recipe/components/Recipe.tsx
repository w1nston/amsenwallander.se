import { ReactNode } from 'react';
import styles from '../styles/Recipe.module.css';

type RecipeProps = {
  title: string;
} & { children: ReactNode };

function Recipe({ children, title }: RecipeProps) {
  return (
    <section className={styles.recipe__container}>
      <h1>{title}</h1>
      <article>{children}</article>
    </section>
  );
}

export default Recipe;
