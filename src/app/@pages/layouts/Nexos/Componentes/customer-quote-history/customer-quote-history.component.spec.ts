import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerQuoteHistoryComponent } from './customer-quote-history.component';

describe('CustomerQuoteHistoryComponent', () => {
  let component: CustomerQuoteHistoryComponent;
  let fixture: ComponentFixture<CustomerQuoteHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerQuoteHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerQuoteHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
