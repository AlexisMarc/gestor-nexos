import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVoteByResidentialComponent } from './list-vote-by-residential.component';

describe('ListVoteByResidentialComponent', () => {
  let component: ListVoteByResidentialComponent;
  let fixture: ComponentFixture<ListVoteByResidentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVoteByResidentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVoteByResidentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
