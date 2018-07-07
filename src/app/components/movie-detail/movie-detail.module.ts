import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@app/shared';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieDetailRoutingModule } from './movie-detail-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,

    SharedModule,

    TranslateModule,
  ],
  declarations: [
    MovieDetailComponent
  ],
  exports: [
    MovieDetailComponent,
    MovieDetailRoutingModule
  ]
})
export class MovieDetailModule { }
