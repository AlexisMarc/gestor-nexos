import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmquotationComponent } from './confirmquotation.component';

describe('ConfirmquotationComponent', () => {
  let component: ConfirmquotationComponent;
  let fixture: ComponentFixture<ConfirmquotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmquotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmquotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
