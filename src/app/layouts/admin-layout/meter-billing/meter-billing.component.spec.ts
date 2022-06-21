import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterBillingComponent } from './meter-billing.component';

describe('MeterBillingComponent', () => {
  let component: MeterBillingComponent;
  let fixture: ComponentFixture<MeterBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterBillingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
