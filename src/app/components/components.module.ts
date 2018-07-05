import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [
    CommonModule,

    HomeModule,
    LoginModule,
  ],
  declarations: [],
  exports: [
    HomeModule,
    LoginModule,
  ]
})
export class ComponentsModule { }
