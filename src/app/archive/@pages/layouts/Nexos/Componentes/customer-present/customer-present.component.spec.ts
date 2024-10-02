import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPresentComponent } from './customer-present.component';

describe('CustomerPresentComponent', () => {
  let component: CustomerPresentComponent;
  let fixture: ComponentFixture<CustomerPresentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPresentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
