import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfileVotationComponent } from './list-profile-votation.component';

describe('ListProfileVotationComponent', () => {
  let component: ListProfileVotationComponent;
  let fixture: ComponentFixture<ListProfileVotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProfileVotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProfileVotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
