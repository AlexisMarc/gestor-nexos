import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTextEmailComponent } from './create-text-email.component';

describe('CreateTextEmailComponent', () => {
  let component: CreateTextEmailComponent;
  let fixture: ComponentFixture<CreateTextEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTextEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTextEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
