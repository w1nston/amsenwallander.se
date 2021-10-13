import { IPreparation } from '../../../@types/index';

export function transformEntryToPreparation(entry: unknown): IPreparation {
  // @ts-ignore
  const { sys, fields } = entry;

  return {
    id: sys.id,
    createdAt: sys.createdAt,
    updatedAt: sys.updatedAt,
    title: fields.title,
    slug: fields.slug,
    content: fields.content,
  } as IPreparation;
}
