import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuotationrateComponent } from './create-quotationrate.component';

describe('CreateQuotationrateComponent', () => {
  let component: CreateQuotationrateComponent;
  let fixture: ComponentFixture<CreateQuotationrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuotationrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuotationrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
