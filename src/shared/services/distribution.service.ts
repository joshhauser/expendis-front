import { RestClient } from '@/rest-client';
import type { Distribution } from '@/shared/models/distribution-item.model';

const url: string = '/distribution';

export class DistributionService {
  static restClient: RestClient = RestClient.getInstance();

  static getExpensesDistribution(startingDate?: Date, endingDate?: Date) {
    let query: string = url + '/expenses';

    if (startingDate != undefined && endingDate != undefined) {
      query +=
        '?beginningDate=' +
        startingDate.toISOString().split('T')[0] +
        '&endingDate=' +
        endingDate.toISOString().split('T')[0];
    }

    return this.restClient.clientInstance.get<Distribution>(query);
  }
}
