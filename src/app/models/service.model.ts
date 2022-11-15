import { Price } from './price.model';
import { Tax } from './tax.model';
import { Unit } from './unit.model';

export class Service {
  _id: string;
  _userId: string;
  date: Date | any;
  desc: string;
  count: Count;
  group: ServiceGroup;
  name: ServiceItem;
  price: Price;
  tax: Tax;
  unit: Unit;
  isFreePrice: boolean;
  totalSum: Price;
  totalTax: Price;
  taxSum: Price;
}
export class ServiceItem {
  _id: string;
  _userId: string;
  date: Date | any;
  desc: string;
  count: Count;
  group: ServiceGroup;
  name: string;
  price: Price;
  tax: Tax;
  unit: Unit;
  isFreePrice: boolean;
  totalSum: Price;
  totalTax: Price;
  taxSum: Price;
}

export class ServiceGroup {
  _id: string;
  _userId: string;
  name: string;
  desc: string;
}

export class Count {
  amount: number;
  isEditable: boolean;
}
