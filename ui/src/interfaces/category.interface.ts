export type Category = {
  id: string;
  userId: string;
  name: string;
}

export type CreateCategory = {
  userId: string;
  name: string;
}

export type UpdateCategory = {
  id: string;
  name: string;
}
