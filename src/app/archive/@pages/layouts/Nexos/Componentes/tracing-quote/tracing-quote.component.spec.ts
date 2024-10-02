import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracingQuoteComponent } from './tracing-quote.component';

describe('TracingQuoteComponent', () => {
  let component: TracingQuoteComponent;
  let fixture: ComponentFixture<TracingQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracingQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracingQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
