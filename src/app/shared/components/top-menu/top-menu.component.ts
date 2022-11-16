import { Component, Inject, OnInit } from '@angular/core';
import { TUI_IS_MOBILE_RES } from '@taiga-ui/core';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.less'],
})
export class TopMenuComponent implements OnInit {
  isLoggedIn!: boolean;
  user: User;
  isOpenSidebar = false;
  routing = environment.routing;

  constructor(
    @Inject(TUI_IS_MOBILE_RES) readonly isMobileRes$: Observable<boolean>,
    private authService: AuthService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.user = this.authService.getUser()!;
  }

  ngOnInit(): void {}

  toggle(state: boolean) {
    this.isOpenSidebar = state;
  }

  get getUserName(): string {
    return this.user.displayName || this.user.email || '';
  }
}
