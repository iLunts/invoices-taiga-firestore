import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empty-panel',
  templateUrl: './empty-panel.component.html',
  styleUrls: ['./empty-panel.component.less'],
})
export class EmptyPanelComponent implements OnInit {
  @Input() title = 'Данные отсутствуют!';
  @Input() buttonText = 'Добавить';
  @Input() link: string = '';

  routing = environment.routing;

  constructor() {}

  ngOnInit(): void {}
}
