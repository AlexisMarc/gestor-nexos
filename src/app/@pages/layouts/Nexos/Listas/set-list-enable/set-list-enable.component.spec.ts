import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetListEnableComponent } from './set-list-enable.component';

describe('SetListEnableComponent', () => {
  let component: SetListEnableComponent;
  let fixture: ComponentFixture<SetListEnableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetListEnableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetListEnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
