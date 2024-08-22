import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResidentialComponent } from './edit-residential.component';

describe('EditResidentialComponent', () => {
  let component: EditResidentialComponent;
  let fixture: ComponentFixture<EditResidentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditResidentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResidentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
