import { RestClient } from '@/rest-client';
import type { Transaction } from '@/shared/models/transaction.model';

const url: string = '/transactions';

export class TransactionService {
  static restClient: RestClient = RestClient.getInstance();

  static getById(id: number) {
    return this.restClient.clientInstance.get<Transaction>(url + '/' + id);
  }

  static getAll() {
    return this.restClient.clientInstance.get<Transaction[]>(url);
  }

  static create(transaction: Transaction) {
    return this.restClient.clientInstance.post<Transaction, Transaction>(
      url,
      transaction
    );
  }

  static delete(id: number) {
    return this.restClient.clientInstance.delete(url + '/' + id);
  }
}
