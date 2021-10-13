export type IRecipe = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  slug: string;
  content: unknown;
  tags: string[];
};

export type IPreparation = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  slug: string;
  content: unknown;
};
