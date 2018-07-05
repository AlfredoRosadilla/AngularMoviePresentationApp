import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from '@app/shared';
import { ServicesModule } from '@app/services';
import { ComponentsModule } from '@app/components/components.module';

@NgModule({
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,

    ServicesModule,
    SharedModule,
    ComponentsModule,

    AppRoutingModule,
    BrowserAnimationsModule,

    TranslateModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
