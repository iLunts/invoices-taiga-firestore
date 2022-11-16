import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  routing = environment.routing;
  returnUrl: string = '';
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      // debugger;
      this.router.navigate([this.routing.admin.dashboard]);
    }
    // else {
    //   // debugger;
    //   // this.authService.signOut();
    //   // this.returnUrl =
    //   // this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    // }
  }

  async send(): Promise<any> {
    if (this.form.invalid) {
      return;
    }

    this.authService
      .signIn(this.f.email.value, this.f.password.value)
      .then((response) => {
        if (response.user) {
          this.authService.setUserData(response.user);
          this.returnUrl == '/'
            ? this.router.navigate([this.routing.admin.dashboard])
            : this.router.navigateByUrl(this.returnUrl);
        }
      });
  }

  loginWithGoogle(): void {
    this.authService.loginWithGooglePopup(this.returnUrl);
  }
}
