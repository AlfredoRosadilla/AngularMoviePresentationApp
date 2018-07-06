import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ShellComponent } from './components/shell/shell.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FooterComponent } from './components/footer/footer.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,

    TranslateModule,
  ],
  declarations: [
    ShellComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    MovieCardComponent,
  ],
  exports: [
    ShellComponent,
    LoaderComponent,
    MovieCardComponent,
  ]
})
export class SharedModule { }
