import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointControlComponent } from './point-control.component';

describe('PointControlComponent', () => {
  let component: PointControlComponent;
  let fixture: ComponentFixture<PointControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
