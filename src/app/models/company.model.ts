import { BankAccount } from './bank.model';
import * as moment from 'moment';

export class Company {
  _id: string | null;
  _createdDate: string;
  _userId: string | null;
  _type: number;

  info: CompanyInfo;
  mailingAddress: CompanyAddress;
  juridicalAddress: CompanyAddress;
  bankAccount: BankAccount;
  responsiblePerson: ResponsiblePerson | null;
  contacts: Contact[];
  ved: CompanyVEDInfo[] = [];

  constructor(
    _id?: string,
    _createdDate?: string,
    _userId?: string,
    _type?: number,
    info?: CompanyInfo,
    mailingAddress?: CompanyAddress,
    juridicalAddress?: CompanyAddress,
    bankAccount?: BankAccount,
    responsiblePerson?: ResponsiblePerson,
    contacts?: Contact[]
  ) {
    this._id = _id || null;
    this._userId = _userId || null;
    this._createdDate = _createdDate || moment().toString() || null!;
    this._type = _type || 1;
    this.info = info || new CompanyInfo();
    this.mailingAddress = mailingAddress || new CompanyAddress();
    this.juridicalAddress = juridicalAddress || new CompanyAddress();
    this.bankAccount = bankAccount || new BankAccount();
    this.responsiblePerson = responsiblePerson || null;
    this.contacts = contacts || [];
  }
}

export class CompanyAddress {
  zipCode: string | null;
  country: string | null;
  countryType: string | null;
  city: string | null;
  cityType: string | null;
  street: string | null;
  streetType: string | null;
  houseNumber: string | null;
  office: string | null;
  officeType: string | null;
  email: string | null;
  phone: string | null;
  fax: string | null;
  vnsfull: string | null;

  constructor(
    zipCode?: string,
    country?: string,
    countryType?: string,
    city?: string,
    cityType?: string,
    street?: string,
    streetType?: string,
    houseNumber?: string,
    office?: string,
    officeType?: string,
    email?: string,
    phone?: string,
    fax?: string,
    vnsfull?: string
  ) {
    this.zipCode = zipCode || null;
    this.country = country || null;
    this.countryType = countryType || null;
    this.city = city || null;
    this.cityType = cityType || null;
    this.street = street || null;
    this.streetType = streetType || null;
    this.houseNumber = houseNumber || null;
    this.office = office || null;
    this.officeType = officeType || null;
    this.email = email || null;
    this.phone = phone || null;
    this.fax = fax || null;
    this.vnsfull = vnsfull || null;
  }
}

export class CompanyInfo {
  fullName?: string | null;
  fullNameBel?: string | null;
  shortName?: string | null;
  shortNameBel?: string | null;
  name?: string | null;
  nameBel?: string | null;
  registrationDate?: string | null;
  unp?: string | null;

  constructor(
    fullName?: string,
    fullNameBel?: string,
    shortName?: string,
    shortNameBel?: string,
    name?: string,
    nameBel?: string,
    registrationDate?: string,
    unp?: string
  ) {
    this.fullName = fullName || null;
    this.fullNameBel = fullNameBel || null;
    this.shortName = shortName || null;
    this.shortNameBel = shortNameBel || null;
    this.name = name || null;
    this.nameBel = nameBel || null;
    this.registrationDate = registrationDate || null;
    this.unp = unp || null;
  }
}

export class Contact {
  fullName?: string;
  basis?: string;
  phone?: string;
  email?: string;
  viber?: string;
  telegram?: string;

  constructor(fullName?: string, basis?: string) {
    this.fullName = fullName || null!;
    this.basis = basis || null!;
  }
}

export class ResponsiblePerson {
  fullName?: string;
  basis?: string;
  type?: string;

  constructor(fullName?: string, basis?: string, type?: string) {
    this.fullName = fullName || null!;
    this.basis = basis || null!;
    this.type = type || null!;
  }
}

export class CompanyVEDInfo {
  ngrn?: string;
  dfrom?: string;
  cact?: string;
  nsi00114?: {
    vkvdn: string;
    vnvdnp: string;
    nsi00114: string;
  };

  constructor(
    ngrn?: string,
    dfrom?: string,
    cact?: string,
    nsi00114?: { vkvdn: string; vnvdnp: string; nsi00114: string }
  ) {
    this.ngrn = ngrn || null!;
    this.dfrom = dfrom || null!;
    this.cact = cact || null!;
    this.nsi00114 = nsi00114;
  }
}

export class Contractor {
  _id: string;
  _createdDate: string;
  _userId: string;
  _type: number;

  info: ContractorInfo;
  mailingAddress: ContractorAddress;
  juridicalAddress: ContractorAddress;
  bankAccount: BankAccount;
  responsiblePerson: ResponsiblePerson;
  contacts: Contact[] = [];
  ved: VEDInfo[] = [];

  constructor(
    _id?: string,
    _createdDate?: string,
    _userId?: string,
    _type?: number,
    info?: ContractorInfo,
    mailingAddress?: ContractorAddress,
    juridicalAddress?: ContractorAddress,
    bankAccount?: BankAccount,
    responsiblePerson?: ResponsiblePerson,
    contacts?: Contact[]
  ) {
    this._id = _id || null!;
    this._userId = _userId || null!;
    this._createdDate = _createdDate || moment().toString() || null!;
    this._type = _type || 1;
    this.info = info || new ContractorInfo();
    this.mailingAddress = mailingAddress || new ContractorAddress();
    this.juridicalAddress = juridicalAddress || new ContractorAddress();
    this.bankAccount = bankAccount || new BankAccount();
    this.responsiblePerson = responsiblePerson || null!;
    this.contacts = contacts || [];
  }
}

export class ContractorAddress {
  zipCode: string | null;
  country: string | null;
  countryType: string | null;
  city: string | null;
  cityType: string | null;
  street: string | null;
  streetType: string | null;
  houseNumber: string | null;
  office: string | null;
  officeType: string | null;
  email: string | null;
  phone: string | null;
  fax: string | null;
  vnsfull: string | null;

  constructor(
    zipCode?: string,
    country?: string,
    countryType?: string,
    city?: string,
    cityType?: string,
    street?: string,
    streetType?: string,
    houseNumber?: string,
    office?: string,
    officeType?: string,
    email?: string,
    phone?: string,
    fax?: string,
    vnsfull?: string
  ) {
    this.zipCode = zipCode || null;
    this.country = country || null;
    this.countryType = countryType || null;
    this.city = city || null;
    this.cityType = cityType || null;
    this.street = street || null;
    this.streetType = streetType || null;
    this.houseNumber = houseNumber || null;
    this.office = office || null;
    this.officeType = officeType || null;
    this.email = email || null;
    this.phone = phone || null;
    this.fax = fax || null;
    this.vnsfull = vnsfull || null;
  }
}

export class ContractorInfo {
  fullName?: string | null;
  fullNameBel?: string | null;
  shortName?: string | null;
  shortNameBel?: string | null;
  name?: string | null;
  nameBel?: string | null;
  registrationDate?: string | null;
  unp?: string | null;

  constructor(
    fullName?: string,
    fullNameBel?: string,
    shortName?: string,
    shortNameBel?: string,
    name?: string,
    nameBel?: string,
    registrationDate?: string,
    unp?: string
  ) {
    this.fullName = fullName || null;
    this.fullNameBel = fullNameBel || null;
    this.shortName = shortName || null;
    this.shortNameBel = shortNameBel || null;
    this.name = name || null;
    this.nameBel = nameBel || null;
    this.registrationDate = registrationDate || null;
    this.unp = unp || null;
  }
}

export class CompanyPerson {
  responsiblePerson?: string;
  basis?: string;

  constructor(responsiblePerson?: string, basis?: string) {
    this.responsiblePerson = responsiblePerson || null!;
    this.basis = basis || null!;
  }
}

export class VEDInfo {
  ngrn?: string | null;
  dfrom?: string | null;
  cact?: string | null;
  nsi00114?: {
    vkvdn: string;
    vnvdnp: string;
    nsi00114: string;
  };

  constructor(
    ngrn?: string,
    dfrom?: string,
    cact?: string,
    nsi00114?: { vkvdn: string; vnvdnp: string; nsi00114: string }
  ) {
    this.ngrn = ngrn || null;
    this.dfrom = dfrom || null;
    this.cact = cact || null;
    this.nsi00114 = nsi00114;
  }
}
