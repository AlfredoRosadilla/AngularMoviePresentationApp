import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { I18nService } from './i18n/i18n.service';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { AuthenticationService } from './authentication/authentication.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    I18nService,
    AuthenticationGuard,
    AuthenticationService
  ]
})
export class ServicesModule { }
