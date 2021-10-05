import { ReactNode } from 'react';
import styles from '../styles/Preparation.module.css';

type PreparationProps = {
  title: string;
} & { children: ReactNode };

function Preparation({ children, title }: PreparationProps) {
  return (
    <section className={styles.preparation__container}>
      <h1>{title}</h1>
      <article>{children}</article>
    </section>
  );
}

export default Preparation;
