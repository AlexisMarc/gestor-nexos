import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileVotationComponent } from './edit-profile-votation.component';

describe('EditProfileVotationComponent', () => {
  let component: EditProfileVotationComponent;
  let fixture: ComponentFixture<EditProfileVotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileVotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileVotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
