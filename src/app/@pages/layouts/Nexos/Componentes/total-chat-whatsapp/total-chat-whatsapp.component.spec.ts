import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalChatWhatsappComponent } from './total-chat-whatsapp.component';

describe('TotalChatWhatsappComponent', () => {
  let component: TotalChatWhatsappComponent;
  let fixture: ComponentFixture<TotalChatWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalChatWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalChatWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
