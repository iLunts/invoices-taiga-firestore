import { Contractor } from './contractor.model';
import { Profile } from './profile.model';
import { Status } from './status.model';
import * as moment from 'moment';

export class Contract {
  _id: string;
  _createdDate: string;
  _userId: string;
  _invoiceId: string;

  contractor: Contractor;
  date: string;
  number: number;
  profile: Profile;
  status: Status;
  template: string;

  constructor(
    _id?: string,
    _createdDate?: string,
    _userId?: string,
    _invoiceId?: string,
    template?: string,
    contractor?: Contractor,
    profile?: Profile,
    status?: Status,
    date?: string,
    number?: number
  ) {
    this._id = _id!;
    this._userId = _userId!;
    this._invoiceId = _invoiceId!;
    this._createdDate = _createdDate || moment().toString();
    this.template = template!;
    this.contractor = contractor!;
    this.profile = profile!;
    this.status = status!;
    this.date = date!;
    this.number = number!;
  }
}

export interface ContractStatus {
  _id: string;
  name: string;
  color: string;
  order: number;
}
