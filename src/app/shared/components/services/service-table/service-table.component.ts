import {
  Component,
  Inject,
  Input,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NgControl,
  Validators,
} from '@angular/forms';
import { TuiDay, TuiDestroyService } from '@taiga-ui/cdk';
import { TUI_ARROW } from '@taiga-ui/kit';
import { filter, map, Observable, tap } from 'rxjs';
import * as moment from 'moment';
import * as _ from 'lodash';

import { Service, ServiceGrouped } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-service-table',
  templateUrl: './service-table.component.html',
  styleUrls: ['./service-table.component.less'],
  providers: [TuiDestroyService],
})
export class ServiceTableComponent implements OnInit, ControlValueAccessor {
  @Input() hideDateColumn = false;

  serviceListData$: Observable<ServiceGrouped[]>;

  form: FormGroup;
  columns: readonly string[] = ['Name', 'Date', 'Weight', 'Price'];
  initial = ['Name', 'Date', 'Weight', 'Price', 'Tax'];

  enabled = this.columns;
  readonly arrow = TUI_ARROW;

  onTouched!: () => void;
  isDisabled: boolean = false;

  constructor(
    @Optional() @Self() private readonly ngControl: NgControl,
    @Self()
    @Inject(TuiDestroyService)
    private readonly destroy$: TuiDestroyService,
    private servicesService: ServicesService,
    private fb: FormBuilder
  ) {
    if (ngControl) ngControl.valueAccessor = this;

    this.form = fb.group({
      tableRowArray: fb.array([this.createTableRow()]),
    });

    this.serviceListData$ = this.servicesService.getAll$().pipe(
      filter((data) => !!data),
      map((services) =>
        services.map((service) => ({
          ...service,
          groupName: service.group.name,
        }))
      ),
      map((services) => this.groupService(services))
    );
  }

  ngOnInit(): void {}

  writeValue(obj: any): void {
    debugger;
    // this.publishEntryStoreService.init(obj);
  }

  registerOnChange(fn: any): void {
    debugger;
    // this.publishEntryStoreService.dataChanged$
    //   .pipe(takeUntil(this.destroyed$))
    //   .subscribe((x) => fn(x));
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  private createTableRow(serviceItem?: Service): FormGroup {
    return this.fb.group({
      name: this.fb.control(serviceItem?.name || null, {
        validators: [Validators.required],
      }),
      date: this.fb.control(
        serviceItem ? this.convertDate(serviceItem?.date) : this.initDate(),
        {
          validators: [Validators.required],
        }
      ),
      count: this.fb.group({
        amount: this.fb.control(serviceItem?.count.amount || null, {
          validators: [Validators.required],
        }),
        isEditable: this.fb.control(serviceItem?.count.isEditable, {
          validators: [Validators.required],
        }),
      }),
      price: this.fb.group({
        amount: this.fb.control(serviceItem?.price.amount || null, {
          validators: [Validators.required],
        }),
        currency: this.fb.control(serviceItem?.price.currency, {
          validators: [Validators.required],
        }),
      }),
      unit: this.fb.group({
        _id: this.fb.control(serviceItem?.unit._id, {
          validators: [Validators.required],
        }),
        fullName: this.fb.control(serviceItem?.unit.fullName, {
          validators: [Validators.required],
        }),
        shortName: this.fb.control(serviceItem?.unit.shortName, {
          validators: [Validators.required],
        }),
      }),
      totalSum: this.fb.group({
        amount: this.fb.control(serviceItem?.totalSum.amount || null, {
          // validators: [Validators.required]
        }),
        currency: this.fb.control(serviceItem?.totalSum.currency || null, {
          validators: [Validators.required],
        }),
      }),
      tax: this.fb.group({
        _id: this.fb.control(serviceItem?.tax._id || null, {
          validators: [Validators.required],
        }),
        amount: this.fb.control(serviceItem?.tax.amount || null, {
          // validators: [Validators.required]
        }),
        desc: this.fb.control(serviceItem?.tax.desc || null),
        isCalculate: this.fb.control(serviceItem?.tax.isCalculate || null, {
          // validators: [Validators.required]
        }),
        label: this.fb.control(serviceItem?.tax.label || null, {
          validators: [Validators.required],
        }),
      }),
      totalTax: this.fb.group({
        amount: this.fb.control(serviceItem?.totalTax.amount || null, {
          // validators: [Validators.required]
        }),
        currency: this.fb.control(serviceItem?.totalTax.currency || null, {
          validators: [Validators.required],
        }),
      }),
      isFreePrice: this.fb.control(serviceItem?.isFreePrice || null),
    });
  }

  selectedService(event: Service, index: number): void {
    const listControl = this.form.get('tableRowArray') as FormArray;
    const control = listControl.at(index);

    // Count
    control.get('count')?.setValue(event.count);

    // Price
    control.get('price')?.setValue(event.price);

    // isFreePrice
    control.get('isFreePrice')?.setValue(event.isFreePrice);

    // Unit
    control.get('unit')?.setValue(event.unit);

    // Tax
    control.get('tax')?.setValue(event.tax);

    // Total
    control
      .get('totalSum')
      ?.get('amount')
      ?.setValue(event.price.amount * event.count.amount);
    control.get('totalSum')?.get('currency')?.setValue(event.price.currency);

    // TotalTax
    control.get('totalTax')?.get('currency')?.setValue(event.price.currency);

    // Calculate
    this.calculate(index);
  }

  initDate(): any {
    let format = 'DD.MM.YYYY';
    if (this.form) {
      let lastIndex = this.tableRowArray.length - 1;
      const date = this.tableRowArray.at(lastIndex).value.date;
      return TuiDay.normalizeParse(moment(date).add(1, 'day').format(format));
    } else {
      return TuiDay.normalizeParse(moment().format(format));
    }
  }

  convertDate(date: any): TuiDay {
    if (date) {
      if (typeof date === 'string') {
        return TuiDay.jsonParse(date.toString());
      } else {
        return date;
      }
    } else {
      return null!;
    }
  }

  calculateSum(event: any, index: number): void {
    const control = this.tableRowArray.at(index);

    control
      .get('totalSum')
      ?.get('amount')
      ?.patchValue(
        (
          event.controls.count.controls.amount.value *
          event.controls.price.controls.amount.value
        ).toFixed(2)
      );

    control
      .get('totalTax')
      ?.get('amount')
      ?.patchValue(
        (
          event.controls.count.controls.amount.value *
          event.controls.price.controls.amount.value *
          event.controls.tax.controls.amount.value
        ).toFixed(2)
      );
  }

  calculate(index: number): void {
    const control = this.tableRowArray.at(index);

    control
      .get('totalSum')
      ?.get('amount')
      ?.patchValue(
        (
          control.get('count')?.value.amount *
          control.get('price')?.value.amount
        ).toFixed(2)
      );

    control
      .get('totalTax')
      ?.get('amount')
      ?.patchValue(
        (
          control.get('count')?.value.amount *
          control.get('price')?.value.amount *
          control.get('tax')?.value.amount
        ).toFixed(2)
      );
  }

  get tableRowArray(): FormArray {
    return this.form.get('tableRowArray') as FormArray;
  }

  getFormArray(index: number): any {
    return this.tableRowArray.at(index).value;
  }

  groupService(services: Service[]): any[] {
    var result = _.chain(services)
      .groupBy('groupName')
      .toPairs()
      .map(function (currentItem) {
        return _.zipObject(['groupName', 'items'], currentItem);
      })
      .value();

    return result;
  }

  onEnabled(state: any): void {}

  deleteRow(index: number): void {
    this.tableRowArray.removeAt(index);
  }

  addNewRow(serviceItem?: Service): void {
    this.tableRowArray.push(this.createTableRow(serviceItem));
  }
}
