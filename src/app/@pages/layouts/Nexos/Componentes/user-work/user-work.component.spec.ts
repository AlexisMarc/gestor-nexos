import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWorkComponent } from './user-work.component';

describe('UserWorkComponent', () => {
  let component: UserWorkComponent;
  let fixture: ComponentFixture<UserWorkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWorkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
