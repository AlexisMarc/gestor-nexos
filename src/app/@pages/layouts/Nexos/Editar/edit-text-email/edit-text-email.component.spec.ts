import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTextEmailComponent } from './edit-text-email.component';

describe('EditTextEmailComponent', () => {
  let component: EditTextEmailComponent;
  let fixture: ComponentFixture<EditTextEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTextEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTextEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
