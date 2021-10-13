import { client } from '../../../../lib/cms/client';
import { transformEntryToRecipe } from '../../transformers/recipeTransformers';
import { IRecipe } from '../../../../@types/index';

export async function getRecipe(slug: string): Promise<IRecipe> {
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug[in]': slug,
  });

  return transformEntryToRecipe(items[0]);
}
