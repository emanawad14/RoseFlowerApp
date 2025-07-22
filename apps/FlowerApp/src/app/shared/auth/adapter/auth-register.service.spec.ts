import { TestBed } from '@angular/core/testing';

import { AuthRegisterAdapter } from './auth-register.service';

describe('AuthRegisterService', () => {
  let service: AuthRegisterAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRegisterAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
