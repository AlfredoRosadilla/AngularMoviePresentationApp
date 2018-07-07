import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { SearchModule } from './search/search.module';

@NgModule({
  imports: [
    CommonModule,

    HomeModule,
    LoginModule,
    SearchModule,
  ],
  declarations: [],
  exports: [
    HomeModule,
    LoginModule,
    SearchModule,
  ]
})
export class ComponentsModule { }
