import { TuiDay } from '@taiga-ui/cdk';
import * as moment from 'moment';
import * as _ from 'lodash';

import { Contractor } from './company.model';
import { Profile } from './profile.model';
import { Service } from './service.model';
import { ModelHelper } from '../utils/model.helper';
import { DateRange } from './date-range.model';

export class Invoice {
  _id: string | null;
  _actId: string | null;
  _contractId: string | null;
  _rentalCertificateId: string | null;
  _createdDate: Date;
  _userId: string | null;
  headerImage: HeaderImage | null;
  contractor: Contractor;
  dateRange: DateRange | null;
  description: string | null;
  number: string | null;
  profileCompany: Profile;
  qrCode: string | null;
  services: Service[];
  signature: Signature;
  status: InvoiceStatus | null;
  total: TotalSum;
  type: string | null;
  template: string | null;

  constructor(
    _id?: string,
    _actId?: string,
    _contractId?: string,
    _rentalCertificateId?: string,
    _createdDate?: Date,
    _userId?: string,
    headerImage?: HeaderImage,
    contractor?: Contractor,
    dateRange?: DateRange,
    description?: string,
    number?: string,
    profileCompany?: Profile,
    qrCode?: string,
    services?: Service[],
    signature?: Signature,
    status?: InvoiceStatus,
    total?: TotalSum,
    type?: string,
    template?: string
  ) {
    this._id = _id || null;
    this._userId = _userId || null;
    this._contractId = _contractId || null;
    this._rentalCertificateId = _rentalCertificateId || null;
    this._actId = _actId || null;
    this._createdDate = _createdDate || new Date();
    this.headerImage = headerImage || null;
    this.number = number || null;
    this.contractor = contractor || new Contractor();
    this.profileCompany = profileCompany || new Profile();
    this.services = services || [];
    this.dateRange = dateRange || null;
    this.status = status || null;
    this.description = description || null;
    this.type = type || null;
    this.signature = signature || new Signature();
    this.total = total || new TotalSum();
    this.qrCode = qrCode || null;
    this.template = template || null;
  }

  isValid(invoice: Invoice): boolean {
    let valid =
      invoice?.services?.length > 0 &&
      ModelHelper.isValidObject(invoice?.status!) &&
      ModelHelper.isValidObject(invoice?.contractor.info)
        ? true
        : false;

    return valid;
  }
}

export class InvoiceStatus {
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

  isValid(status: InvoiceStatus): boolean {
    if (status) {
      return status ? _.some(status, _.isEmpty) : false;
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

export class InvoiceListItem {
  service: Service | null;
  quantity: number | null;

  constructor(service?: Service, quantity?: number) {
    this.service = service || null;
    this.quantity = quantity || 1;
  }
}

export class Signature {
  sign: string | null;
  firstName: string | null;
  lastName: string | null;
  initials: string | null;

  constructor(
    sign?: string,
    firstName?: string,
    lastName?: string,
    initials?: string
  ) {
    this.sign = sign || null;
    this.firstName = firstName || null;
    this.lastName = lastName || null;
    this.initials = initials || null;
  }
}

export class HeaderImage {
  url: string | null;
  name: string | null;

  constructor(url?: string, name?: string) {
    this.url = url || null;
    this.name = name || null;
  }
}
