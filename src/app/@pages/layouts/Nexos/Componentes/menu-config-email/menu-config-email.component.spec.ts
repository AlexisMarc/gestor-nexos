import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuConfigEmailComponent } from './menu-config-email.component';

describe('MenuConfigEmailComponent', () => {
  let component: MenuConfigEmailComponent;
  let fixture: ComponentFixture<MenuConfigEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuConfigEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuConfigEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
