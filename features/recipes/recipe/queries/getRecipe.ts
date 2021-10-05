import { client } from '../../../../lib/cms/client';
import { IRecipe } from '../../types';
import { transformEntryToRecipe } from '../../transformers/recipeTransformers';

export async function getRecipe(slug: string): Promise<IRecipe> {
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug[in]': slug,
  });

  return transformEntryToRecipe(items[0]);
}
