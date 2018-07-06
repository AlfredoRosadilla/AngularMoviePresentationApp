import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ShellComponent } from './shell/shell.component';
import { HeaderComponent } from './header/header.component';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';

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
  ],
  exports: [
    ShellComponent,
    LoaderComponent,
    HeaderComponent,
  ]
})
export class SharedModule { }
