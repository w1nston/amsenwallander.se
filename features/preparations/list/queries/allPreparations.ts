import { client } from '../../../../lib/cms/client';
import { IPreparation } from '../../types';
import { transformEntryToPreparation } from '../../transformers/preparationTransformer';

export async function getPreparations(): Promise<IPreparation> {
  const { items } = await client.getEntries({ content_type: 'preparation' });

  return items.map(transformEntryToPreparation);
}
