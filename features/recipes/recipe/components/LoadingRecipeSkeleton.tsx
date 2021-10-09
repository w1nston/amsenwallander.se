import styles from '../styles/LoadingRecipeSkeleton.module.css';

function TitleSkeleton() {
  return <div className={styles.loadingRecipeSkeleton__title}></div>;
}

function IngredientSkeleton() {
  return <div className={styles.loadingRecipeSkeleton__ingredient}></div>;
}
function IngredientsSkeleton() {
  return (
    <div>
      <div className={styles.loadingRecipeSkeleton__ingredientsTitle}></div>
      <IngredientSkeleton />
      <IngredientSkeleton />
      <IngredientSkeleton />
    </div>
  );
}

function InstructionsSkeleton() {
  return (
    <div>
      <div className={styles.loadingRecipeSkeleton__instructionsTitle}></div>
      <div className={styles.loadingRecipeSkeleton__instructionsText}></div>
    </div>
  );
}

function LoadingRecipeSkeleton() {
  return (
    <section className={styles.loadingRecipeSkeleton__container}>
      <TitleSkeleton />
      <IngredientsSkeleton />
      <InstructionsSkeleton />
    </section>
  );
}

export default LoadingRecipeSkeleton;
