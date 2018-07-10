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

  describe('basic tests', () => {
    it('should be created', () => {
      expect(alertService).toBeTruthy();
    });

    it('should have alert property', () => {
      expect(alertService.alert).toBeTruthy();
    });
  });

  describe('Methods', () => {
    describe('showAlert', () => {
      it('should exist a method called showAlert', () => {
        expect(alertService.showAlert).toBeDefined();
      });

      it('should return a promise', () => {
        expect(alertService.showAlert() instanceof Promise).toBeTruthy();
      })

      it('should call closeAlert method', async(() => {
        spyOn(alertService, 'closeAlert').and.returnValue(new Promise(
          (resolve: any) => { resolve() }
        ));

        alertService.showAlert('error', {
          lifeTime: 1
        }).then(() => {
          expect(alertService.closeAlert).toHaveBeenCalled();
        });
      }));

      it('should change alert type', async(() => {
        alertService.alert.type = 'error';
        alertService.alert.fixed = false;

        alertService.showAlert('information', { lifeTime: 10 });
        setTimeout(() => { expect(alertService.alert.type).toEqual('information') }, 1);
      }));

      it('should not change the current alert if the last one is fixed', async(() => {
        alertService.alert.type = 'information';
        alertService.alert.fixed = true;

        alertService.showAlert('error', { lifeTime: 10 });
        setTimeout(() => { expect(alertService.alert.type).toEqual('information') }, 1);
      }));
    });

    describe('closeAlert', () => {
      it('should exist a method called closeAlert', () => {
        expect(alertService.closeAlert).toBeDefined();
      });

      it('should return a promise', () => {
        expect(alertService.closeAlert() instanceof Promise).toBeTruthy();
      });
    })
  })
});
