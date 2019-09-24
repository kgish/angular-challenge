import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    schemas: [NO_ERRORS_SCHEMA]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
