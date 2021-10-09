import styles from '../styles/LoadingPreparationsListSkeleton.module.css';

function SkeletonItem() {
  return (
    <div className={styles.loadingListSkeleton__skeletonItemContainer}>
      <div className={styles.loadingListSkeleton__skeletonItemFirstRow}></div>
    </div>
  );
}

function LoadingListSkeleton() {
  return (
    <section>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </section>
  );
}

export default LoadingListSkeleton;
