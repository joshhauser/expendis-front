import { RestClient } from '@/rest-client';
import type { Category } from '@/shared/models/category.model';

const url: string = '/categories';

export class CategoryService {
  private static restClient: RestClient = RestClient.getInstance();

  static getById(id: number) {
    return this.restClient.clientInstance.get<Category>(url + '/' + id);
  }

  static getAll() {
    return this.restClient.clientInstance.get<Category[]>(url);
  }

  static create(category: Category) {
    return this.restClient.clientInstance.post<Category, Category>(url, category);
  }

  static patch(id: number, category: Category) {
    return this.restClient.clientInstance.patch<Partial<Category>, Category>(
      url + '/' + id,
      category
    );
  }

  static delete(id: number) {
    return this.restClient.clientInstance.delete(url + '/' + id);
  }
}
