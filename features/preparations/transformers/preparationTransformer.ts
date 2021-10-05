import { IPreparation } from '../types';

export function transformEntryToPreparation(entry: unknown): IPreparation {
  const { sys, fields } = entry;

  return {
    id: sys.id,
    createdAt: sys.createdAt,
    updatedAt: sys.updatedAt,
    title: fields.title,
    slug: fields.slug,
    content: fields.content,
  };
}
