import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatmeteoComponent } from './satmeteo.component';

describe('SatmeteoComponent', () => {
  let component: SatmeteoComponent;
  let fixture: ComponentFixture<SatmeteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatmeteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatmeteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
