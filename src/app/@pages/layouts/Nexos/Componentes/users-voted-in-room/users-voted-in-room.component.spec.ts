import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersVotedInRoomComponent } from './users-voted-in-room.component';

describe('UsersVotedInRoomComponent', () => {
  let component: UsersVotedInRoomComponent;
  let fixture: ComponentFixture<UsersVotedInRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersVotedInRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersVotedInRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
