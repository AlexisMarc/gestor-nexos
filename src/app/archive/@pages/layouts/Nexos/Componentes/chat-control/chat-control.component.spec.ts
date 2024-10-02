import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatControlComponent } from './chat-control.component';

describe('ChatControlComponent', () => {
  let component: ChatControlComponent;
  let fixture: ComponentFixture<ChatControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
