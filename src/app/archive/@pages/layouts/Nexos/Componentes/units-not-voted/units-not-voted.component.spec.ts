import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsNotVotedComponent } from './units-not-voted.component';

describe('UnitsNotVotedComponent', () => {
  let component: UnitsNotVotedComponent;
  let fixture: ComponentFixture<UnitsNotVotedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitsNotVotedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsNotVotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
