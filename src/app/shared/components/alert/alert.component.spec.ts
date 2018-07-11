import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Router, ActivatedRoute} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from '@app/shared';
import { ServicesModule } from '@app/services';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserModule,
        HttpClientModule,

        ServicesModule,
        SharedModule,

        BrowserAnimationsModule,

        TranslateModule.forRoot(),
      ],
      declarations: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    component.classes = '';
    component.type = 'error';
    component.text = 'error text';
    component.solution = 'error solution';
  });

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

    it('should have a property icon', () => {
      expect(component.icon).toBeDefined();
    });
  });

  describe('Methods', () => {
    describe('ngOnInit', () => {
      it('should exist a method called ngOnInit', () => {
        fixture.detectChanges();

        expect(component.ngOnInit).toBeDefined();
      });

      it('should call changeType method', () => {
        spyOn(component, 'changeType');

        fixture.detectChanges();

        expect(component.changeType).toHaveBeenCalled();
      });
    });

    describe('changeType', () => {
      it('should exist a method called changeType', () => {
        fixture.detectChanges();

        expect(component.changeType).toBeDefined();
      });

      it('should change icon type', () => {
        fixture.detectChanges();

        expect(component.icon).toEqual('warning');

        component.changeType('success');
        expect(component.icon).toEqual('check');

        component.changeType('information');
        expect(component.icon).toEqual('info');
      });

      it('shouldn\'t change icon type', () => {
        fixture.detectChanges();

        component.changeType('something');
        expect(component.icon).toEqual('warning');
      });
    });

    describe('getTranslateBase', () => {
      it('should exist a method called getTranslateBase', () => {
        fixture.detectChanges();

        expect(component.getTranslateBase).toBeDefined();
      });

      it('should transform strings', () => {
        const translations = {
          'Pepe': 'pepe',
          'alert0Fixed': 'alert0fixed',
          'SOMETHING SOMETHING ELSE': 'something-something-else'
        };

        fixture.detectChanges();

        Object.keys(translations).forEach((str: string) => {
          expect(component.getTranslateBase(str)).toEqual(translations[str]);
        })
      });
    });

    describe('close', () => {
      it('should exist a method called close', () => {
        fixture.detectChanges();

        expect(component.close).toBeDefined();
      });

      it('should call closeAlert Output', () => {
        spyOn(component.closeAlert, 'emit');

        fixture.detectChanges();

        component.close();

        expect(component.closeAlert.emit).toHaveBeenCalled();
      });
    });
  });

  describe('DOM test', () => {
    it('should has an element with input classes', (done: any) => {
      const classes = 'something somethingelse somethingelseelse';

      component.classes = classes;

      fixture.whenStable().then(() => {
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector(`.${classes.replace(new RegExp(' ', 'g'), '.')}`)).toBeDefined();
        done();
      })
    })
  })
});
