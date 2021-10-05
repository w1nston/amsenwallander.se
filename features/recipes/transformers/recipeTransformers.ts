import { IRecipe } from '../types';

export function transformEntryToRecipe(entry: unknown): IRecipe {
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
