import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberListWhatsappComponent } from './number-list-whatsapp.component';

describe('NumberListWhatsappComponent', () => {
  let component: NumberListWhatsappComponent;
  let fixture: ComponentFixture<NumberListWhatsappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberListWhatsappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberListWhatsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
