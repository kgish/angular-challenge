import { TestBed } from '@angular/core/testing';

import { OperatorService } from './operator.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('OperatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    schemas: [NO_ERRORS_SCHEMA]
  }));

  it('should be created', () => {
    const service: OperatorService = TestBed.get(OperatorService);
    expect(service).toBeTruthy();
  });
});
