import Link from 'next/link';
import styles from '../styles/PreparationLink.module.css';

type PreparationProps = {
  title: string;
  slug: string;
};

function PreparationLink({ title, slug }: PreparationProps) {
  return (
    <Link href={`/preparations/${slug}`}>
      <a className={styles.preparationLink__container}>
        <div className={styles.preparationLink__text}>{title}</div>
      </a>
    </Link>
  );
}

export default PreparationLink;
