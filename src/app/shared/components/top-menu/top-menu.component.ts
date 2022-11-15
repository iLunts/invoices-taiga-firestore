import { Component, OnInit } from '@angular/core';
// import { User } from 'src/app/models/user.model';
// import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.less']
})
export class TopMenuComponent implements OnInit {
  // isLoggedIn: boolean;
  // user: User;
  // isOpenSidebar = false;

  constructor(
    // private authService: AuthService
    ) {
    // this.isLoggedIn = this.authService.isLoggedIn;
    // this.user = this.authService.getUser();
  }

  ngOnInit(): void {}

  // toggle(state: boolean) {
  //   this.isOpenSidebar = state;
  // }
}
