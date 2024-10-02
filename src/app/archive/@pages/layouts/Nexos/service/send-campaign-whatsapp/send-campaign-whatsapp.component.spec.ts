import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCampaignWhatsappComponent } from './send-campaign-whatsapp.component';

describe('SendCampaignWhatsappComponent', () => {
  let component: SendCampaignWhatsappComponent;
  let fixture: ComponentFixture<SendCampaignWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendCampaignWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCampaignWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
