import * as _ from 'lodash';

import { Contractor } from './company.model';
import { ModelHelper } from '../utils/model.helper';
import { Profile } from './profile.model';
import { Service } from './service.model';
import { TuiDayRange } from '@taiga-ui/cdk';
import { DateRange } from './date-range.model';

export class RentalCertificate {
  _id: string;
  _actId: string;
  _contractId: string;
  _invoiceId: string;
  _createdDate: Date;
  _userId: string;
  contractor: Contractor;
  dateRange: DateRange;
  description: string;
  number: string;
  profileCompany: Profile;
  qrCode: string;
  services: Service[];
  signature: Signature;
  status: RentalCertificateStatus;
  total: TotalSum;
  type: string;
  template: string;

  constructor(
    _id?: string,
    _actId?: string,
    _contractId?: string,
    _invoiceId?: string,
    _createdDate?: Date,
    _userId?: string,
    contractor?: Contractor,
    dateRange?: DateRange,
    description?: string,
    number?: string,
    profileCompany?: Profile,
    qrCode?: string,
    services?: Service[],
    signature?: Signature,
    status?: RentalCertificateStatus,
    total?: TotalSum,
    type?: string,
    template?: string
  ) {
    this._id = _id || null!;
    this._userId = _userId || null!;
    this._contractId = _contractId || null!;
    this._invoiceId = _invoiceId || null!;
    this._actId = _actId || null!;
    this._createdDate = _createdDate || new Date();
    this.number = number || null!;
    this.contractor = contractor || new Contractor();
    this.profileCompany = profileCompany || new Profile();
    this.services = services || [];
    this.dateRange = dateRange || null!;
    this.status = status || null!;
    this.description = description || null!;
    this.type = type || null!;
    this.signature = signature || new Signature();
    this.total = total || new TotalSum();
    this.qrCode = qrCode || null!;
    this.template = template || null!;
  }

  isValid(rentalCertificate: RentalCertificate): boolean {
    let valid =
      rentalCertificate?.services?.length > 0 &&
      ModelHelper.isValidObject(rentalCertificate?.status) &&
      ModelHelper.isValidObject(rentalCertificate?.contractor.info)
        ? true
        : false;

    return valid;
  }
}

export class RentalCertificateStatus {
  _id: string;
  name: string;
  color: string;
  order: number;

  constructor(_id: string, name: string, color: string, order: number) {
    this._id = _id;
    this.name = name;
    this.color = color;
    this.order = order;
  }

  isValid(rentalCertificateStatus: RentalCertificateStatus): boolean {
    if (rentalCertificateStatus) {
      return rentalCertificateStatus
        ? _.some(rentalCertificateStatus, _.isEmpty)
        : false;
    } else {
      return false;
    }
  }
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

export class TotalSum {
  totalSum: Price;
  taxSum: Price;

  constructor(totalSum?: Price, taxSum?: Price) {
    this.totalSum = totalSum || new Price();
    this.taxSum = taxSum || new Price();
  }
}

export class RentalCertificateListItem {
  service: Service;
  quantity: number;

  constructor(service?: Service, quantity?: number) {
    this.service = service || null!;
    this.quantity = quantity || 1;
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
