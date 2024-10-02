import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTypeEmailsComponent } from './edit-type-emails.component';

describe('EditTypeEmailsComponent', () => {
  let component: EditTypeEmailsComponent;
  let fixture: ComponentFixture<EditTypeEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTypeEmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTypeEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
