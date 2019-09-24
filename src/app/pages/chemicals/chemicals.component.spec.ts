import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChemicalsComponent } from './chemicals.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChemicalsComponent', () => {
  let component: ChemicalsComponent;
  let fixture: ComponentFixture<ChemicalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChemicalsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemicalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
