import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DefaultRoutingModule } from './default-routing.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent, HomeComponent],
  imports: [CommonModule, DefaultRoutingModule]
})
export class DefaultModule {}
