import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InRoomComponent } from './in-room.component';

describe('InRoomComponent', () => {
  let component: InRoomComponent;
  let fixture: ComponentFixture<InRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
