import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSendCampaignWhatsappComponent } from './list-send-campaign-whatsapp.component';

describe('ListSendCampaignWhatsappComponent', () => {
  let component: ListSendCampaignWhatsappComponent;
  let fixture: ComponentFixture<ListSendCampaignWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSendCampaignWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSendCampaignWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
