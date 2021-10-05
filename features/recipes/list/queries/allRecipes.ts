import { client } from '../../../../lib/cms/client';
import { Recipe } from '../../types';

export async function getRecipes(): Promise<Recipe[]> {
  // TODO: Error handling...
  // TODO: can I type this?
  const { items } = await client.getEntries();

  /*
  {
    metadata: { tags: [] },
    sys: {
      space: [Object],
      id: '1I9ojkNU8N6HrE3eZiZBAe',
      type: 'Entry',
      createdAt: '2021-10-02T19:53:47.222Z',
      updatedAt: '2021-10-02T19:53:47.222Z',
      environment: [Object],
      revision: 1,
      contentType: [Object],
      locale: 'en-US'
    },
    fields: { title: 'Allaroundsås', slug: 'allaroundsas', content: [Object] }
  */

  return items.map((entry) => {
    const { sys, fields } = entry;

    // TODO: fields with types?
    return {
      id: sys.id,
      createdAt: sys.createdAt,
      updatedAt: sys.updatedAt,
      title: fields.title,
      slug: fields.slug,
      content: fields.content,
      tags: fields.tags,
    };
  });
}
