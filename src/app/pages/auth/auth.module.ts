import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiLinkModule, TuiNotificationModule } from '@taiga-ui/core';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TuiButtonModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiLinkModule,
    TuiNotificationModule
  ]
})
export class AuthModule {}
