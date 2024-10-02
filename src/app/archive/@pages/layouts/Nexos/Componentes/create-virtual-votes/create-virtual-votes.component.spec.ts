import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVirtualVotesComponent } from './create-virtual-votes.component';

describe('CreateVirtualVotesComponent', () => {
  let component: CreateVirtualVotesComponent;
  let fixture: ComponentFixture<CreateVirtualVotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVirtualVotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVirtualVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
