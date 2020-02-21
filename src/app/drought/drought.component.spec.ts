import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DroughtComponent } from './drought.component';

describe('DroughtComponent', () => {
  let component: DroughtComponent;
  let fixture: ComponentFixture<DroughtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DroughtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DroughtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
