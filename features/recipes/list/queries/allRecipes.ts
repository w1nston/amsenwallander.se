import { client } from '../../../../lib/cms/client';
import { transformEntryToRecipe } from '../../transformers/recipeTransformers';
import { IRecipe } from '../../types';

export async function getRecipes(): Promise<IRecipe[]> {
  // TODO: Error handling...
  // TODO: can I type this?
  const { items } = await client.getEntries({ content_type: 'recipe' });

  return items.map(transformEntryToRecipe);
}
