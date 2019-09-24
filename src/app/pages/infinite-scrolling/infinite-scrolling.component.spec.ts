import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollingComponent } from './infinite-scrolling.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('InfiniteScrollingComponent', () => {
  let component: InfiniteScrollingComponent;
  let fixture: ComponentFixture<InfiniteScrollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteScrollingComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
