import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideWhatsappComponent } from './side-whatsapp.component';

describe('SideWhatsappComponent', () => {
  let component: SideWhatsappComponent;
  let fixture: ComponentFixture<SideWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
