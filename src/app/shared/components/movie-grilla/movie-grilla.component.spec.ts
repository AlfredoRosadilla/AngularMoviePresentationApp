import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGrillaComponent } from './movie-grilla.component';

describe('MovieGrillaComponent', () => {
  let component: MovieGrillaComponent;
  let fixture: ComponentFixture<MovieGrillaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieGrillaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieGrillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
