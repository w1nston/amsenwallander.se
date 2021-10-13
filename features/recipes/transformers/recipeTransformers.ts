import { IRecipe } from '../../../@types/index';

export function transformEntryToRecipe(entry: unknown): IRecipe {
  // @ts-ignore
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
}
