import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@app/shared';
import { UserProfileComponent } from './user-profile.component';
import { UserProfileRoutingModule } from './user-profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,

    SharedModule,

    TranslateModule,
  ],
  declarations: [
    UserProfileComponent
  ],
  exports: [
    UserProfileComponent,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
