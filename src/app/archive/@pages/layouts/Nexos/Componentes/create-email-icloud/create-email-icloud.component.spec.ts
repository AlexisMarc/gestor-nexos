import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmailIcloudComponent } from './create-email-icloud.component';

describe('CreateEmailIcloudComponent', () => {
  let component: CreateEmailIcloudComponent;
  let fixture: ComponentFixture<CreateEmailIcloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEmailIcloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEmailIcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
