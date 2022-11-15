export class Tax {
  _id: string;
  amount: number;
  isCalculate: boolean;
  label: string;
  desc: string;

  constructor(
    _id?: string,
    amount?: number,
    isCalculate?: boolean,
    label?: string,
    desc?: string
  ) {
    this._id = _id || null;
    this.amount = amount || null;
    this.isCalculate = isCalculate || null;
    this.label = label || null;
    this.desc = desc || null;
  }
}
