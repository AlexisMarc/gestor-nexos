import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextEmailListComponent } from './text-email-list.component';

describe('TextEmailListComponent', () => {
  let component: TextEmailListComponent;
  let fixture: ComponentFixture<TextEmailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextEmailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextEmailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
