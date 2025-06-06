import type { Transaction, TransactionWithCategory } from '@/shared/models/transaction.model';

export class Utils {
  static months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  static formatDate(date: Date): string {
    const day: string = ('0' + date.getDate()).slice(-2);
    const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
    const year: number = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  static mapTransactionsByDate(transactions: Transaction[] | TransactionWithCategory[]) {
    const mappedTransactions: {
      [key: string]: any;
    } = {};

    for (const transaction of transactions) {
      const formattedTransactionDate: string = this.formatDate(transaction.date);
      if (formattedTransactionDate in mappedTransactions) {
        mappedTransactions[formattedTransactionDate].push(transaction);
      } else {
        mappedTransactions[formattedTransactionDate] = [transaction];
      }
    }

    return mappedTransactions;
  }

  static sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static isStringEmpty(str: string | undefined) {
    return str == undefined || /^\s*$/.test(str);
  }
}
