import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCampaignWhatsappComponent } from './list-campaign-whatsapp.component';

describe('ListCampaignWhatsappComponent', () => {
  let component: ListCampaignWhatsappComponent;
  let fixture: ComponentFixture<ListCampaignWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCampaignWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCampaignWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
