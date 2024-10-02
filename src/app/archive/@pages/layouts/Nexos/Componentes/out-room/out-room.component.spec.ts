import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutRoomComponent } from './out-room.component';

describe('OutRoomComponent', () => {
  let component: OutRoomComponent;
  let fixture: ComponentFixture<OutRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
