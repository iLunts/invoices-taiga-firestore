import { BankAccount } from './bank.model';
import * as moment from 'moment';

export class Contractor {
  _id: string;
  _createdDate: string;
  _userId: string;
  _type: number;

  info: ContractorInfo;
  mailingAddress: ContractorAddress;
  juridicalAddress: ContractorAddress;
  bankAccount!: BankAccount;
  responsiblePerson: ResponsiblePerson;
  contacts: Contact[];
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
    this.responsiblePerson = responsiblePerson || null!;
    this.contacts = contacts || [];
  }
}

export class ContractorAddress {
  zipCode: string;
  country: string;
  countryType: string;
  city: string;
  cityType: string;
  street: string;
  streetType: string;
  houseNumber: string;
  office: string;
  officeType: string;
  email: string;
  phone: string;
  fax: string;
  vnsfull: string;

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
    this.zipCode = zipCode || null!;
    this.country = country || null!;
    this.countryType = countryType || null!;
    this.city = city || null!;
    this.cityType = cityType || null!;
    this.street = street || null!;
    this.streetType = streetType || null!;
    this.houseNumber = houseNumber || null!;
    this.office = office || null!;
    this.officeType = officeType || null!;
    this.email = email || null!;
    this.phone = phone || null!;
    this.fax = fax || null!;
    this.vnsfull = vnsfull || null!;
  }

  // getAddressFromEGR(data: any) {
  //   let obj = new ContractorAddress();
  //   return obj;
  // }
}

export class ContractorInfo {
  fullName?: string;
  fullNameBel?: string;
  shortName?: string;
  shortNameBel?: string;
  name?: string;
  nameBel?: string;
  registrationDate?: string;
  unp?: string;

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
    this.fullName = fullName || null!;
    this.fullNameBel = fullNameBel || null!;
    this.shortName = shortName || null!;
    this.shortNameBel = shortNameBel || null!;
    this.name = name || null!;
    this.nameBel = nameBel || null!;
    this.registrationDate = registrationDate || null!;
    this.unp = unp || null!;
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

  constructor(fullName?: string, basis?: string) {
    this.fullName = fullName || null!;
    this.basis = basis || null!;
  }
}

export class VEDInfo {
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
