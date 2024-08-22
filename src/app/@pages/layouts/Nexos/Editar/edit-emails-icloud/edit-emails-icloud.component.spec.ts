import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmailsIcloudComponent } from './edit-emails-icloud.component';

describe('EditEmailsIcloudComponent', () => {
  let component: EditEmailsIcloudComponent;
  let fixture: ComponentFixture<EditEmailsIcloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEmailsIcloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEmailsIcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
