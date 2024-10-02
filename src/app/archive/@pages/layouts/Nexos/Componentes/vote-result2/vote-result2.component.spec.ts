import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteResult2Component } from './vote-result2.component';

describe('VoteResult2Component', () => {
  let component: VoteResult2Component;
  let fixture: ComponentFixture<VoteResult2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteResult2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteResult2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
