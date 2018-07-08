import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@app/shared';
import { FavoritesComponent } from './favorites.component';
import { FavoritesRoutingModule } from './favorites-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,

    SharedModule,

    TranslateModule,
  ],
  declarations: [
    FavoritesComponent
  ],
  exports: [
    FavoritesComponent,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
