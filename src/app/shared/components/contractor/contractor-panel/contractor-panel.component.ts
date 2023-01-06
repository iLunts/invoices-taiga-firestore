import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Company, Contractor } from 'src/app/models/company.model';
import { ContractorService } from 'src/app/services/contractor.service';

@Component({
  selector: 'app-contractor-panel',
  templateUrl: './contractor-panel.component.html',
  styleUrls: ['./contractor-panel.component.less'],
})
export class ContractorPanelComponent implements OnInit {
  @Input() set contractor(contractor: Contractor) {
    this._contractor = contractor;
    if (contractor?._id) {
      this.form.get('contractor')?.setValue(contractor);
    }
  }
  get contractor(): Contractor {
    return this._contractor;
  }
  private _contractor!: Contractor;

  @Output() selected = new EventEmitter<Contractor>();

  contractors$: Observable<Company[]>;

  form: FormGroup;

  constructor(private contractorService: ContractorService) {
    this.form = new FormGroup({
      contractor: new FormControl(null, [Validators.required]),
    });

    this.contractors$ = this.contractorService.contractors$;
  }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.contractors$ = this.contractorService.getAll$();
  }
}
