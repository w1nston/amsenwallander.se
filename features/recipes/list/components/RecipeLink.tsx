import Link from 'next/link';
import styles from '../styles/RecipeLink.module.css';

type RecipeProps = {
  title: string;
  slug: string;
  tags: string[];
};

function RecipeLink({ title, slug, tags }: RecipeProps) {
  return (
    <Link href={`/recipes/${encodeURIComponent(slug)}`}>
      <a className={styles.recipeLink__container}>
        <div className={styles.recipeLink__primaryText}>{title}</div>
        <div className={styles.recipeLink__secondaryText}>
          {tags.join(', ')}
        </div>
      </a>
    </Link>
  );
}

export default RecipeLink;
