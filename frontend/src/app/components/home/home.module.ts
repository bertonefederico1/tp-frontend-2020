import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { MobileMenuComponent } from '../menu/mobile-menu/mobile-menu.component';
import { NavMenuComponent } from '../menu/nav-menu/nav-menu.component';


@NgModule({
  declarations: [
    HomeComponent,
    MobileMenuComponent,
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
