import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormToConfigurePhonesComponent } from './form-to-configure-phones.component';

describe('FormToConfigurePhonesComponent', () => {
  let component: FormToConfigurePhonesComponent;
  let fixture: ComponentFixture<FormToConfigurePhonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormToConfigurePhonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormToConfigurePhonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
