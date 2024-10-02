import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuotationrateComponent } from './edit-quotationrate.component';

describe('EditQuotationrateComponent', () => {
  let component: EditQuotationrateComponent;
  let fixture: ComponentFixture<EditQuotationrateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuotationrateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuotationrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
