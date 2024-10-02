import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddunitscontrolComponent } from './addunitscontrol.component';

describe('AddunitscontrolComponent', () => {
  let component: AddunitscontrolComponent;
  let fixture: ComponentFixture<AddunitscontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddunitscontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddunitscontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
