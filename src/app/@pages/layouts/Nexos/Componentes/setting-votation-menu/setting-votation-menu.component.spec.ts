import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingVotationMenuComponent } from './setting-votation-menu.component';

describe('SettingVotationMenuComponent', () => {
  let component: SettingVotationMenuComponent;
  let fixture: ComponentFixture<SettingVotationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingVotationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingVotationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
