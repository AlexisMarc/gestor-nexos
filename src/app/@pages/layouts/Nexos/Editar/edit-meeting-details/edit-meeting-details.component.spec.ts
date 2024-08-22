import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeetingDetailsComponent } from './edit-meeting-details.component';

describe('EditMeetingDetailsComponent', () => {
  let component: EditMeetingDetailsComponent;
  let fixture: ComponentFixture<EditMeetingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMeetingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMeetingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
