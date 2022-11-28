import { TuiDay } from '@taiga-ui/cdk';
import * as moment from 'moment';

import { Contract } from './contract.model';
import { Contractor } from './company.model';
import { Profile } from './profile.model';
import { Service } from './service.model';

export class Act {
  _id: string;
  _userId: string;
  _contractId: string;
  _createdDate: Date;
  _invoiceId: string;
  _rentalCertificateId: string;
  number: string;
  date: Date | TuiDay;
  createDate: string;
  expiredDate: string;
  contractId: string;

  contractor: Contractor;
  contract: Contract;
  profileCompany: Profile;

  services: Service[];
  status: ActStatus;
  signature: Signature;
  total: TotalSum;

  constructor(
    _id?: string,
    _userId?: string,
    _contractId?: string,
    _invoiceId?: string,
    _rentalCertificateId?: string,
    _createdDate?: Date,
    contractor?: Contractor,
    contract?: Contract,
    services?: Service[],
    date?: Date | TuiDay,
    number?: string,
    createDate?: string,
    expiredDate?: string,
    status?: ActStatus,
    contractId?: string,
    signature?: Signature,
    total?: TotalSum,
    profileCompany?: Profile
  ) {
    this._id = _id || null!;
    this._userId = _userId || null!;
    this._contractId = _contractId || null!;
    this._invoiceId = _invoiceId || null!;
    this._rentalCertificateId = _rentalCertificateId || null!;
    this._createdDate = _createdDate || new Date();
    this.number = number || null!;
    this.date = date || null!;
    this.contractor = contractor || null!;
    this.contract = contract || null!;
    this.services = services || [];
    this.createDate = createDate || moment().toString();
    this.expiredDate = expiredDate || moment().add(7, 'days').toString();
    this.status = status || null!;
    this.contractId = contractId || null!;
    this.signature = signature || new Signature();
    this.total = total || new TotalSum();
    this.profileCompany = profileCompany || null!;
  }

  isValid(act: Act): boolean {
    let valid = false;

    valid =
      act?.services?.length && act?.status && act?.contractor && act?.contract
        ? true
        : false;

    return valid;
  }
}

// export class OrderList {
//   date: Date;
//   service: Service;
//   order: number;

//   constructor(date?: Date, service?: Service, order?: number) {
//     this.date = date || new Date();
//     this.service = service || null!;
//     this.order = order || null!;
//   }
// }

export interface ActStatus {
  _id: string;
  name: string;
  color: string;
  order: number;
}

export class Price {
  amount: number;
  currency: number;
  code: string;

  constructor(amount?: number, currency?: number, code?: string) {
    this.amount = amount || 0;
    this.currency = amount || 913;
    this.code = code || 'BYN';
  }
}

// export class ActListItem {
//   service: Service;
//   quantity: number;

//   constructor(service?: Service, quantity?: number) {
//     this.service = service || null!;
//     this.quantity = quantity || 1;
//   }
// }

export class TotalSum {
  totalSum: Price;
  taxSum: Price;

  constructor(totalSum?: Price, taxSum?: Price) {
    this.totalSum = totalSum || new Price();
    this.taxSum = taxSum || new Price();
  }
}

export class Signature {
  sign: string;
  firstName: string;
  lastName: string;
  initials: string;

  constructor(
    sign?: string,
    firstName?: string,
    lastName?: string,
    initials?: string
  ) {
    this.sign = sign || null!;
    this.firstName = firstName || null!;
    this.lastName = lastName || null!;
    this.initials = initials || null!;
  }
}
