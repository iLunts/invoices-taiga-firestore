export class Price {
  amount: number;
  currency: Currency;
}

export class Currency {
  _id: string;
  code: string;
  num: number;
  fullName: string;
  shortName: string;
}
