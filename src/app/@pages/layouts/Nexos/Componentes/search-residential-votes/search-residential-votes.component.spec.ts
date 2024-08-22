import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResidentialVotesComponent } from './search-residential-votes.component';

describe('SearchResidentialVotesComponent', () => {
  let component: SearchResidentialVotesComponent;
  let fixture: ComponentFixture<SearchResidentialVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResidentialVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResidentialVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
