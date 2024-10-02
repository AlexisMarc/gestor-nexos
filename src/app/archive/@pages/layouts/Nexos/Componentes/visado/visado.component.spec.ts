import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisadoComponent } from './visado.component';

describe('VisadoComponent', () => {
  let component: VisadoComponent;
  let fixture: ComponentFixture<VisadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
