export type Transaction = {
  id: string;
  categoryId: string;
  type: "income" | "expense";
  amount: number;
  description?: string;
  category: string;
}

export type CreateTransaction = {
  categoryId: string;
  type: "income" | "expense";
  amount: number;
  description?: string;
}

export type UpdateTransaction = {
  id: string;
  categoryId: string;
  type: "income" | "expense";
  amount: number;
  description?: string;
}
