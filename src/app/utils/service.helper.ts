import * as moment from 'moment';
import * as _ from 'lodash';

import { Service } from '../models/service.model';

export class ServiceHelper {
  public static unionDuplicateServices(services: Service[]): any {
    const servicesSummary: Service[] = [];

    services.forEach((element) => {
      let foundItem = servicesSummary.find(
        (item) => item.name._id == element.name._id
      );

      if (!foundItem) {
        element.date = moment().format();
        servicesSummary.push(element);
      } else {
        foundItem.date = moment().format();
        foundItem.count.amount += element.count.amount;
        foundItem.totalSum.amount =
          Number(foundItem.totalSum.amount) + Number(element.totalSum.amount);
        foundItem.totalTax.amount =
          Number(foundItem.totalTax.amount) + Number(element.totalTax.amount);
      }
    });

    return servicesSummary;
  }
}
