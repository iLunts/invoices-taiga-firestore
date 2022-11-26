import { TuiDay } from '@taiga-ui/cdk';

export class DateRange {
  from: Date | TuiDay | null;
  to: Date | TuiDay | null;

  constructor(from?: Date | TuiDay, to?: Date | TuiDay) {
    this.from = from || null;
    this.to = to || null;
  }
}
