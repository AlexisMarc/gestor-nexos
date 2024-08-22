import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatequestioncontrolComponent } from './createquestioncontrol.component';

describe('CreatequestioncontrolComponent', () => {
  let component: CreatequestioncontrolComponent;
  let fixture: ComponentFixture<CreatequestioncontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatequestioncontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatequestioncontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
