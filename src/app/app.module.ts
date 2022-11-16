import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { NgModule } from '@angular/core';
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
// import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
// import { ContractorAsideLayoutComponent } from "./layouts/contractor-aside-layout/contractor-aside-layout.component";
// import { DefaultLayoutComponent } from "./layouts/default-layout/default-layout.component";
// import { AngularFireModule } from "@angular/fire";
import { LayoutsModule } from "./layouts/layouts.module";
import { environment } from "src/environments/environment";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

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
    LayoutsModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
