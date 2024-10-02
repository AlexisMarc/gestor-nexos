import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchActiveSetsComponent } from './search-active-sets.component';

describe('SearchActiveSetsComponent', () => {
  let component: SearchActiveSetsComponent;
  let fixture: ComponentFixture<SearchActiveSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchActiveSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchActiveSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
