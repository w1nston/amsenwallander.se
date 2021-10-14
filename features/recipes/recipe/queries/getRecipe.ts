import { client } from '../../../../lib/cms/client';
import { transformEntryToRecipe } from '../../transformers/recipeTransformers';
import { IRecipe } from '../../../../@types/index';

export async function getRecipe(slug: string): Promise<IRecipe | null> {
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug[in]': slug,
  });

  console.log({ items });

  if (items.length < 1) {
    return null;
  }

  return transformEntryToRecipe(items[0]);
}
