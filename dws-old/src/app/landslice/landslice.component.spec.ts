import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandsliceComponent } from './landslice.component';

describe('LandsliceComponent', () => {
  let component: LandsliceComponent;
  let fixture: ComponentFixture<LandsliceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandsliceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandsliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
