import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ShellComponent } from './components/shell/shell.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FooterComponent } from './components/footer/footer.component';
import { IconInputComponent } from './components/icon-input/icon-input.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieGridComponent } from './components/movie-grid/movie-grid.component';

@NgModule({
  imports: [
    FormsModule,
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
    IconInputComponent,
    MovieCardComponent,
    MovieGridComponent,
  ],
  exports: [
    ShellComponent,
    LoaderComponent,
    MovieCardComponent,
    IconInputComponent,
    MovieGridComponent,
  ]
})
export class SharedModule { }
