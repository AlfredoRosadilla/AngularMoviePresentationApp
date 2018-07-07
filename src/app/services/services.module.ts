import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteReuseStrategy } from '@angular/router';

import { I18nService } from './i18n/i18n.service';
import { RouteReusableStrategy } from './route/route-reusable-strategy';
import { AuthenticationGuard } from './authentication/authentication.guard';
import { AuthenticationService } from './authentication/authentication.service';

import { BusinessModule } from './business/business.module';

@NgModule({
  imports: [
    CommonModule,
    BusinessModule
  ],
  declarations: [],
  providers: [
    I18nService,
    AuthenticationGuard,
    AuthenticationService,
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    }
  ]
})
export class ServicesModule { }
