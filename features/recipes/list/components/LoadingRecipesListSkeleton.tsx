import styles from '../styles/LoadingRecipesListSkeleton.module.css';

function SkeletonItem() {
  return (
    <div className={styles.loadingListSkeleton__skeletonItemContainer}>
      <div className={styles.loadingListSkeleton__skeletonItemFirstRow}></div>
      <div className={styles.loadingListSkeleton__skeletonItemSecondRow}></div>
    </div>
  );
}

function LoadingRecipesListSkeleton() {
  return (
    <section>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </section>
  );
}

export default LoadingRecipesListSkeleton;
