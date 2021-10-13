import { client } from '../../../../lib/cms/client';
import { transformEntryToPreparation } from '../../transformers/preparationTransformer';
import { IPreparation } from '../../../../@types/index';

export async function getPreparations(): Promise<IPreparation[]> {
  const { items } = await client.getEntries({ content_type: 'preparation' });

  return items.map(transformEntryToPreparation);
}
