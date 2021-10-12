export type Recipe = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  slug: string;
  content: unknown;
  tags: string[];
};
