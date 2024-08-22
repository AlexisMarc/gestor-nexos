import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchclientComponent } from './searchclient.component';

describe('SearchclientComponent', () => {
  let component: SearchclientComponent;
  let fixture: ComponentFixture<SearchclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
