import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnionMasiveComponent } from './union-masive.component';

describe('UnionMasiveComponent', () => {
  let component: UnionMasiveComponent;
  let fixture: ComponentFixture<UnionMasiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnionMasiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnionMasiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
