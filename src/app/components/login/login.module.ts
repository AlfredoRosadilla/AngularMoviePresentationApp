import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@app/shared';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    LoginRoutingModule,
    ReactiveFormsModule,

    SharedModule,

    TranslateModule,
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent,
    LoginRoutingModule
  ]
})
export class LoginModule { }
