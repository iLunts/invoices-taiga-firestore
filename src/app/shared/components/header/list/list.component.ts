import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class HeaderListComponent implements OnInit {
  @Input() title!: string;
  @Input() description!: string;

  constructor() {}

  ngOnInit(): void {}
}
