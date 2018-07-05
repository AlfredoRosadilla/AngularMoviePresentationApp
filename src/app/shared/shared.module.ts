import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [
    ShellComponent,
    LoaderComponent,
    HeaderComponent,
  ],
  exports: [
    ShellComponent,
    LoaderComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
