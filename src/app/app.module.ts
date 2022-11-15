import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { NgModule } from '@angular/core';
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { ContractorAsideLayoutComponent } from "./layouts/contractor-aside-layout/contractor-aside-layout.component";
import { DefaultLayoutComponent } from "./layouts/default-layout/default-layout.component";
import { LayoutsModule } from "./layouts/layouts.module";

@NgModule({
  declarations: [
    AppComponent,
    // AdminLayoutComponent,
    // AuthLayoutComponent,
    // ContractorAsideLayoutComponent,
    // DefaultLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    LayoutsModule
],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
