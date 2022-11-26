import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import { NgModule } from '@angular/core';
import { TuiRootModule, TUI_SANITIZER } from '@taiga-ui/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutsModule } from './layouts/layouts.module';
import { TaigaSharedModule } from './shared/taiga-shared.module';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutsModule,
    TaigaSharedModule,
    TuiRootModule,
    // TuiDialogModule,
    // TuiAlertModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [
    AngularFirestore,
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebaseConfig,
    },
    { provide: TUI_SANITIZER, useClass: NgDompurifySanitizer },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
