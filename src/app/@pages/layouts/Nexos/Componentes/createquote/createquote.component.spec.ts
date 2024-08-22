import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatequoteComponent } from './createquote.component';

describe('CreatequoteComponent', () => {
  let component: CreatequoteComponent;
  let fixture: ComponentFixture<CreatequoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatequoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatequoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
