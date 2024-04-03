import type { Category } from '@/shared/models/category.model';

export interface DistributionItem {
  amount: number;
  percentage: number;
  category: Category;
}

export interface Distribution {
  totalAmount: number;
  distributionItems: DistributionItem[];
}

export interface DistributionPeriod {
  beginningDate: Date;
  endingDate: Date;
}
