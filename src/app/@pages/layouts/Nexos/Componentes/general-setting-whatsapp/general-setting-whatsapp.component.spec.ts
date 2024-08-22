import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralSettingWhatsappComponent } from './general-setting-whatsapp.component';

describe('GeneralSettingWhatsappComponent', () => {
  let component: GeneralSettingWhatsappComponent;
  let fixture: ComponentFixture<GeneralSettingWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralSettingWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralSettingWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
