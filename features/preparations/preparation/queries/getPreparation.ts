import { client } from '../../../../lib/cms/client';
import { transformEntryToPreparation } from '../../transformers/preparationTransformer';
import { IPreparation } from '../../../../@types/index';

export async function getPreparation(slug: string): Promise<IPreparation> {
  const { items } = await client.getEntries({
    content_type: 'preparation',
    'fields.slug[in]': slug,
  });

  return transformEntryToPreparation(items[0]);
}
