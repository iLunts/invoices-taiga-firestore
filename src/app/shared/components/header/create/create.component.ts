import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class HeaderCreateComponent implements OnInit {
  @Input() title = '';

  constructor() {}

  ngOnInit(): void {}
}
