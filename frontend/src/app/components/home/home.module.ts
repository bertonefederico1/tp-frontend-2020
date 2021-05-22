import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { MobileMenuComponent } from '../menu/mobile-menu/mobile-menu.component';
import { NavMenuComponent } from '../menu/nav-menu/nav-menu.component';
import { ClientComponent } from '../clients/client/client.component';


@NgModule({
  declarations: [
    HomeComponent,
    MobileMenuComponent,
    NavMenuComponent,
    ClientComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
