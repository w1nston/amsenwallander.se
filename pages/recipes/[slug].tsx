import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Block, Inline, INLINES } from '@contentful/rich-text-types';
import { getRecipes } from '../../features/recipes/list/queries/allRecipes';
import { getRecipe } from '../../features/recipes/recipe/queries/getRecipe';
import { IRecipe } from '../../features/recipes/types';
import { fixCircularReferenceIssue } from '../../utils/fixCircularReferenceIssue';
import Recipe from '../../features/recipes/recipe/components/Recipe';

type RecipeProps = {
  recipe: IRecipe;
};

const options = {
  renderNode: {
    [INLINES.ENTRY_HYPERLINK]: (node: Inline | Block) => (
      <Link href={`/recipes/${node.data.target.fields.slug}`}>
        <a>{node.content[0].value}</a>
      </Link>
    ),
  },
};

function RecipePage({ recipe }: RecipeProps) {
  return (
    <Recipe title={recipe.title}>
      {documentToReactComponents(recipe.content, options)}
    </Recipe>
  );
}

export async function getStaticProps(
  context: GetStaticPropsContext
): InferGetStaticPropsType<typeof getStaticProps> {
  const { params } = context;

  const rawRecipe = await getRecipe(params.slug);
  const recipe = fixCircularReferenceIssue(rawRecipe);

  return {
    props: {
      recipe,
    },
    revalidate: 60, // TODO: figure out a sane default
  };
}

export async function getStaticPaths() {
  const recipes = await getRecipes();

  const paths = recipes.map((recipe) => ({
    params: { slug: recipe.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export default RecipePage;
