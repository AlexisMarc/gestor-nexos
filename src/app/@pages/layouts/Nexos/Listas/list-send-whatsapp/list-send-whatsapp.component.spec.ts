import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSendWhatsappComponent } from './list-send-whatsapp.component';

describe('ListSendWhatsappComponent', () => {
  let component: ListSendWhatsappComponent;
  let fixture: ComponentFixture<ListSendWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSendWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSendWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
