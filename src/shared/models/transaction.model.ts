import type { Category } from '@/shared/models/category.model';

export interface Transaction {
  id?: number;
  amount: number;
  label: string;
  date: Date;
  categoryId: number | null;
}

export interface TransactionWithCategory extends Transaction {
  category: Category;
}
