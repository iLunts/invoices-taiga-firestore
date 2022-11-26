import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import { Service } from '../models/service.model';
import * as moment from 'moment';
import * as _ from 'lodash';
import { DateRange } from '../models/date-range.model';

export class DateHelper {
  public static initTuiDay(incrementDay?: number): TuiDay {
    return TuiDay.normalizeParse(
      moment()
        .add(incrementDay || 0, 'day')
        .format('DD-MM-YYYY')
    );
  }

  public static initTuiDayRange(incrementDay?: number): TuiDayRange {
    const from = TuiDay.normalizeParse(moment().format('DD-MM-YYYY'));
    const to = TuiDay.normalizeParse(
      moment()
        .add(incrementDay || 1, 'day')
        .format('DD-MM-YYYY')
    );

    return new TuiDayRange(from, to);
  }

  public static getMinDayFromServices(services: Service[]): Date {
    return new Date(
      // TODO: need change any[]
      Math.min.apply(null, this.getDatesArrayFromServices(services) as any[])
    );
  }

  public static getMaxDayFromServices(services: Service[]): Date {
    return new Date(
      // TODO: need change any[]
      Math.max.apply(null, this.getDatesArrayFromServices(services) as any[])
    );
  }

  public static getRangeDaysFromServices(services: Service[]): Date[] {
    const arrDates = [];
    arrDates.push(this.getMinDayFromServices(services));
    arrDates.push(this.getMaxDayFromServices(services));
    return arrDates;
  }

  public static getDatesArrayFromServices(services: Service[]): Date[] {
    if (services?.length) {
      const arrDates: any[] = [];
      services.forEach((service: Service) => {
        arrDates.push(
          moment(
            [service.date.year, service.date.month, service.date.day],
            'YYYY-MM-DD'
          ).toDate()
        );
      });
      return arrDates;
    } else {
      return [];
    }
  }

  public static getFirstDay(days: Date[]): TuiDay {
    const sorted = days.sort((objA, objB) => objB.getTime() - objA.getTime());
    return TuiDay.fromLocalNativeDate(sorted[sorted.length - 1]);
  }

  public static getLastDay(days: Date[]): TuiDay {
    const sorted = days.sort((objA, objB) => objA.getTime() - objB.getTime());
    return TuiDay.fromLocalNativeDate(sorted[sorted.length - 1]);
  }

  public static convertTuiDayToDate(date: TuiDay | any): any {
    if (!date) {
      return null;
    }

    return moment([date.year, date.month, date.day]).format();
  }

  public static convertDateToTuiDay(date: Date | any): TuiDay {
    if (!date) {
      return null!;
    }

    return new TuiDay(
      moment(date).year(),
      moment(date).month(),
      moment(date).date()
    );
  }

  public static convertServicesTuiDayToDate(services: Service[]): Service[] {
    if (!services) {
      return [];
    }

    services.forEach((element) => {
      element.date = moment([
        element.date.year,
        element.date.month,
        element.date.day,
      ]).format();
    });

    return services;
  }

  public static convertDateRangeTuiDayToDate(
    dateRange: DateRange | any
  ): DateRange {
    if (!dateRange) {
      return null!;
    }

    dateRange.from = moment([
      dateRange.from.year,
      dateRange.from.month,
      dateRange.from.day,
    ]).format();

    dateRange.to = moment([
      dateRange.to.year,
      dateRange.to.month,
      dateRange.to.day,
    ]).format();

    return dateRange;
  }

  public static convertDateRangeToTuiDayRange(
    dateRange: DateRange
  ): TuiDayRange {
    return new TuiDayRange(
      this.convertDateToTuiDay(dateRange.from),
      this.convertDateToTuiDay(dateRange.to)
    );
  }
}
