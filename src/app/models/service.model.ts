import { Price } from './price.model';
import { Tax } from './tax.model';
import { Unit } from './unit.model';

export class Service {
  _id!: string;
  _userId!: string;
  date!: Date | any;
  desc!: string;
  count!: Count;
  group!: ServiceGroup;
  name!: ServiceItem;
  price!: Price;
  tax!: Tax;
  unit!: Unit;
  isFreePrice!: boolean;
  totalSum!: Price;
  totalTax!: Price;
  taxSum!: Price;
}
export interface ServiceItem {
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

export interface ServiceGroup {
  _id: string;
  _userId: string;
  name: string;
  desc: string;
}

export interface Count {
  amount: number;
  isEditable: boolean;
}
