import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { Menu, MenuType } from 'src/app/models/menu';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.less'],
})
export class LeftMenuComponent implements OnInit {
  user!: User;
  menu: Menu[] = [
    {
      name: 'Домашняя',
      url: environment.routing.admin.dashboard,
      icon: 'tuiIconDesktopLarge',
      type: 'menu',
    },
    {
      name: 'Контрагенты',
      url: environment.routing.admin.contractor.list,
      icon: 'tuiIconCompanyLarge',
      type: 'menu',
    },
    // {
    //   name: 'Услуги',
    //   url: environment.routing.admin.contractor.list,
    //   icon: 'tuiIconFileLarge',
    //   type: 'menu',22
    //   disabled: true
    // },
    // {
    //   name: 'Профиль',
    //   url: environment.routing.admin.contractor.list,
    //   icon: 'tuiIconFileLarge',
    //   type: 'menu',
    //   disabled: true
    // },
    {
      name: '',
      url: '',
      icon: '',
      type: 'divider',
    },
    {
      name: 'Договора',
      url: environment.routing.admin.contract.list,
      icon: 'tuiIconEditLarge',
      type: 'menu',
    },
    {
      name: 'Счета',
      url: environment.routing.admin.invoice.list,
      icon: 'tuiIconCalendarLarge',
      type: 'menu',
    },
    {
      name: 'Акты',
      url: environment.routing.admin.act.list,
      icon: 'tuiIconExternalLarge',
      type: 'menu',
      disabled: false,
    },
    {
      name: 'Справки аренды',
      url: environment.routing.admin.rentalCertificate.list,
      icon: 'tuiIconFileLarge',
      type: 'menu',
      disabled: false,
    },
    {
      name: '',
      url: '',
      icon: '',
      type: 'divider',
    },
    {
      name: 'Настройки',
      url: environment.routing.admin.settings.company,
      icon: 'tuiIconSettingsLarge',
      type: 'menu',
    },
  ];
  MENU_TYPE!: MenuType;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser()!;
  }

  get getUserDisplayName(): string {
    return this.authService.getUserDisplayName()!;
  }

  logout() {
    this.authService.logout();
  }
}
