import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatProfileVotationComponent } from './creat-profile-votation.component';

describe('CreatProfileVotationComponent', () => {
  let component: CreatProfileVotationComponent;
  let fixture: ComponentFixture<CreatProfileVotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatProfileVotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatProfileVotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
