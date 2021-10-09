import styles from '../styles/LoadingPreparationSkeleton.module.css';

function TitleSkeleton() {
  return <div className={styles.loadingPreparationSkeleton__title}></div>;
}

function InstructionsSkeleton() {
  return (
    <div>
      <div className={styles.loadingPreparationSkeleton__instructionsTitle}></div>
      <div className={styles.loadingPreparationSkeleton__instructionsText}></div>
    </div>
  );
}

function LoadingPreparationSkeleton() {
  return (
    <section className={styles.loadingPreparationSkeleton__container}>
      <TitleSkeleton />
      <InstructionsSkeleton />
    </section>
  );
}

export default LoadingPreparationSkeleton;
