import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DragAndDropComponent } from './drag-and-drop.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

describe('DragAndDropComponent', () => {
  let component: DragAndDropComponent;
  let fixture: ComponentFixture<DragAndDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DragAndDropComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
