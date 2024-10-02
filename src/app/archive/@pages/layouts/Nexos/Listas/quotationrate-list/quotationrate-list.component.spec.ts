import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationrateListComponent } from './quotationrate-list.component';

describe('QuotationrateListComponent', () => {
  let component: QuotationrateListComponent;
  let fixture: ComponentFixture<QuotationrateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotationrateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationrateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
