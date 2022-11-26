export interface Price {
  amount: number;
  currency: Currency;
}

export interface Currency {
  _id: string;
  code: string;
  num: number;
  fullName: string;
  shortName: string;
}
