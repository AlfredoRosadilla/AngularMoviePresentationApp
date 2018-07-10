import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { environment } from '@env/environment';
import { ServicesModule, Logger } from '@app/services';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        ServicesModule
      ],
      declarations: [AppComponent],
      providers: []
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call enableProductionMode Logger method', async(() => {
      spyOn(Logger, 'enableProductionMode');
      environment.production = true;

      component.ngOnInit();

      expect(Logger.enableProductionMode).toHaveBeenCalled();
    }));
  });
});
