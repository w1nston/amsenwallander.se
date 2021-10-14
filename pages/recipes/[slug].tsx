import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Block, Inline, INLINES } from '@contentful/rich-text-types';
import { getRecipes } from '../../features/recipes/list/queries/allRecipes';
import { getRecipe } from '../../features/recipes/recipe/queries/getRecipe';
import { fixCircularReferenceIssue } from '../../utils/fixCircularReferenceIssue';
import Recipe from '../../features/recipes/recipe/components/Recipe';
import { IRecipe } from '../../@types/index';

type RecipeProps = {
  recipe: IRecipe;
};

const TEN_MINUTES = 60 * 10;

function getEntryLinkUrl(id: string, slug: string): string {
  switch (id) {
    case 'preparation': {
      return `/preparations/${slug}`;
    }
    case 'recipe': {
      return `/recipes/${slug}`;
    }
    default: {
      return `/404`;
    }
  }
}

const options = {
  renderNode: {
    [INLINES.ENTRY_HYPERLINK]: (node: Inline | Block) => {
      // @ts-ignore
      const value = node.content[0].value;

      const { sys, fields } = node.data.target;
      const { id } = sys.contentType.sys;
      const { slug } = fields;

      const url = getEntryLinkUrl(id, slug);
      console.log({ url });

      return (
        <Link href={url}>
          <a>{value}</a>
        </Link>
      );
    },
  },
};

function RecipePage({ recipe }: RecipeProps) {
  // @ts-ignore
  const content = documentToReactComponents(recipe.content, options);

  return <Recipe title={recipe.title}>{content}</Recipe>;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;

  // @ts-ignore
  const rawRecipe = await getRecipe(params.slug);

  if (!rawRecipe) {
    return {
      notFound: true,
    };
  }

  const recipe = fixCircularReferenceIssue(rawRecipe);

  return {
    props: {
      recipe,
    },
    revalidate: TEN_MINUTES,
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
