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
  FormBuilder,
  FormControl,
  NgControl,
  Validators,
} from '@angular/forms';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { fn } from 'moment';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { Company } from 'src/app/models/company.model';

@Component({
  selector: 'app-company-panel',
  templateUrl: './company-panel.component.html',
  styleUrls: ['./company-panel.component.less'],
  providers: [TuiDestroyService],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyPanelComponent implements OnInit, ControlValueAccessor {
  private readonly destroySubject = new Subject();

  companyControl: FormControl;

  @Input() isLoaded: boolean = false;
  @Input() canChange: boolean = false;
  // @Output() onChange = new EventEmitter<Company>();

  onTouched!: () => void;
  isDisabled: boolean = false;

  constructor(
    @Optional() @Self() private readonly ngControl: NgControl,
    @Self()
    @Inject(TuiDestroyService)
    private readonly destroy$: TuiDestroyService,
    private fb: FormBuilder
  ) {
    if (ngControl) ngControl.valueAccessor = this;

    this.companyControl = this.fb.control(null, [Validators.required]);
  }

  writeValue(company: Company): void {
    if (company) {
      this.companyControl.setValue(company);
    }
  }

  registerOnChange(fn: any): void {
    this.companyControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((x) => (this.companyControl.valid ? fn(x) : fn(null)));
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  ngOnInit(): void {}

  clearCompanyUnp(): void {
    this.writeValue(null!);
    // this.actionCompanySubject.next(new Company());
  }
}
