import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalOutRoomComponent } from './total-out-room.component';

describe('TotalOutRoomComponent', () => {
  let component: TotalOutRoomComponent;
  let fixture: ComponentFixture<TotalOutRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalOutRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalOutRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
