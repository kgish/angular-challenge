import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorsComponent } from './operators.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OperatorsComponent', () => {
  let component: OperatorsComponent;
  let fixture: ComponentFixture<OperatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
