import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAssamblyMeetingWhatsappComponent } from './register-assambly-meeting-whatsapp.component';

describe('RegisterAssamblyMeetingWhatsappComponent', () => {
  let component: RegisterAssamblyMeetingWhatsappComponent;
  let fixture: ComponentFixture<RegisterAssamblyMeetingWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAssamblyMeetingWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAssamblyMeetingWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
