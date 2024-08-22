import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsIcloudComponent } from './emails-icloud.component';

describe('EmailsIcloudComponent', () => {
  let component: EmailsIcloudComponent;
  let fixture: ComponentFixture<EmailsIcloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailsIcloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsIcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
