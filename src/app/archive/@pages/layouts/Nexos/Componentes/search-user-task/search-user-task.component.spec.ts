import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUserTaskComponent } from './search-user-task.component';

describe('SearchUserTaskComponent', () => {
  let component: SearchUserTaskComponent;
  let fixture: ComponentFixture<SearchUserTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUserTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUserTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
