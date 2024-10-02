import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnionMasiveListComponent } from './union-masive-list.component';

describe('UnionMasiveListComponent', () => {
  let component: UnionMasiveListComponent;
  let fixture: ComponentFixture<UnionMasiveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnionMasiveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnionMasiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
