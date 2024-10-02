import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCampaignWhatsappComponent } from './create-campaign-whatsapp.component';

describe('CreateCampaignWhatsappComponent', () => {
  let component: CreateCampaignWhatsappComponent;
  let fixture: ComponentFixture<CreateCampaignWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCampaignWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCampaignWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
