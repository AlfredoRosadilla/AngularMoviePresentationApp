import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@app/shared';
import { ServicesModule, AlertService } from '@app/services';

describe('ErrorHandlerService', () => {
  let alertService: AlertService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterTestingModule,

        SharedModule,
        ServicesModule,

        BrowserAnimationsModule,

        TranslateModule.forRoot(),
      ],
      providers: []
    });
  }));

  beforeEach(inject([AlertService], (_alertService: AlertService) => {
    alertService = _alertService;
  }));

  it('should be created', () => {
    expect(alertService).toBeTruthy();
  });
});
