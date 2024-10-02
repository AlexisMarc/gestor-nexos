import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotiingAndPreregistrationComponent } from './votiing-and-preregistration.component';

describe('VotiingAndPreregistrationComponent', () => {
  let component: VotiingAndPreregistrationComponent;
  let fixture: ComponentFixture<VotiingAndPreregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotiingAndPreregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotiingAndPreregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
