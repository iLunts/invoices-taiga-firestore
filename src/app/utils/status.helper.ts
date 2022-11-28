import { ContractStatus } from '../models/contract.model';
import { Status } from '../models/status.model';

export class StatusHelper {
  public static getStatusClassName(status: Status): string {
    switch (status.color) {
      case '#ff9800': {
        return 'badge-draft';
      }
      case '#4caf50': {
        return 'badge-success';
      }
      case '#f44336': {
        return 'badge-danger';
      }
      case '#e91e63': {
        return 'badge-unavailable';
      }
      case '#2196f3': {
        return 'badge-sent';
      }
      default: {
        return 'badge-default';
      }
    }
  }
}
