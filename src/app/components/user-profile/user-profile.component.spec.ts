import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { environment } from '@env/environment';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@app/shared';
import { ComponentsModule } from '@app/components/components.module';
import { ServicesModule, I18nService, ThemeService, AlertService } from '@app/services';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let injector: Injector;
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,

        ServicesModule,
        SharedModule,
        ComponentsModule,

        BrowserAnimationsModule,

        TranslateModule.forRoot(),
      ],
      declarations: [],
      providers: []
    })
    .compileComponents();
  }));

  beforeEach(inject([Injector], (_injector: Injector) => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    injector = _injector;
  }));

  describe('Base tests', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should have a defined component', () => {
        expect(component).toBeDefined();
    });
  });

  describe('Properties tests', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should have a property oldPassword', () => {
      expect(component.oldPassword).toBeDefined();
    });

    it('should have a property newPassword', () => {
      expect(component.newPassword).toBeDefined();
    });

    it('should have a property themeSelected', () => {
      expect(component.themeSelected).toBeDefined();
    });
  });

  describe('Methods', () => {
    describe('setLanguage', () => {
      let i18nService: I18nService;

      beforeEach(() => {
        i18nService = injector.get(I18nService);
        i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
        fixture.detectChanges();
      });

      it('should exist a method called setLanguage', () => {
        expect(component.setLanguage).toBeDefined();
      });

      it('should call i18n language property', () => {
        const spy = spyOnProperty(i18nService, 'language', 'set');

        component.setLanguage();

        expect(spy).toHaveBeenCalled();
      });
    });

    describe('setTheme', () => {
      let themeService: ThemeService;

      beforeEach(() => {
        themeService = injector.get(ThemeService);
        spyOn(themeService, 'setTheme');
        fixture.detectChanges();
      });

      it('should exist a method called setTheme', () => {
        expect(component.setTheme).toBeDefined();
      });

      it('should call themeService setTheme method', () => {
        const theme = component.themeList[0];

        component.setTheme(theme);

        expect(themeService.setTheme).toHaveBeenCalled();
      });
    });

    describe('changePassword', () => {
      let alertService: AlertService;

      beforeEach(() => {
        alertService = injector.get(AlertService);
        alertService.showAlert = jasmine.createSpy('showAlert');
        fixture.detectChanges();
      });

      it('should exist a method called changePassword', () => {
        expect(component.changePassword).toBeDefined();
      });

      it('should call themeService changePassword method', () => {
        component.changePassword();

        expect(alertService.showAlert).toHaveBeenCalled();
      });
    });
  });
});
