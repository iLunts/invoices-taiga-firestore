import { Profile } from './profile.model';
import { Contractor } from './contractor.model';
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
  status: ContractStatus;
  template: string;

  constructor(
    _id?: string,
    _createdDate?: string,
    _userId?: string,
    _invoiceId?: string,
    template?: string,
    contractor?: Contractor,
    profile?: Profile,
    status?: ContractStatus,
    date?: string,
    number?: number
  ) {
    this._id = _id || null!;
    this._userId = _userId || null!;
    this._invoiceId = _invoiceId || null!;
    this._createdDate = _createdDate || moment().toString() || null!;
    this.template = template || null!;
    this.contractor = contractor || null!;
    this.profile = profile || null!;
    this.status = status || null!;
    this.date = date || null!;
    this.number = number || null!;
  }
}

export interface ContractStatus {
  _id: string;
  name: string;
  color: string;
  order: number;
}
