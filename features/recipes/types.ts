export type Recipe = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  slug: string;
  tags: string[];
  content: unknown; // TODO
};
