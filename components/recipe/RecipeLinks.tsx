import RecipeLink from './RecipeLink';
import { IRecipeLink } from '../../api/recipe/index';

type Props = {
  recipeLinks: IRecipeLink[];
};

export default function RecipeLinks({ recipeLinks }: Props) {
  if (!recipeLinks) {
    return <p>Finns inga recept.</p>;
  }

  return (
    <>
      {recipeLinks.map((recipeLink) => (
        <RecipeLink
          key={`${recipeLink.filename}`}
          slug={recipeLink.slug}
          name={recipeLink.name}
          category={recipeLink.category}
        />
      ))}
    </>
  );
}
