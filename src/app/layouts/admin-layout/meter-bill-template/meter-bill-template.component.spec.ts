import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterBillTemplateComponent } from './meter-bill-template.component';

describe('MeterBillTemplateComponent', () => {
  let component: MeterBillTemplateComponent;
  let fixture: ComponentFixture<MeterBillTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterBillTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterBillTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
