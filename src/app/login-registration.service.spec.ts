import { TestBed, inject } from '@angular/core/testing';

import { LoginRegistrationService } from './login-registration.service';

describe('LoginRegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginRegistrationService]
    });
  });

  it('should be created', inject([LoginRegistrationService], (service: LoginRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
