import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTypeEmailsComponent } from './create-type-emails.component';

describe('CreateTypeEmailsComponent', () => {
  let component: CreateTypeEmailsComponent;
  let fixture: ComponentFixture<CreateTypeEmailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTypeEmailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTypeEmailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
