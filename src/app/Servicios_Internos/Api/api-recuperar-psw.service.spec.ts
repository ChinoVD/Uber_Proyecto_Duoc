import { TestBed } from '@angular/core/testing';

import { ApiRecuperarPswService } from './api-recuperar-psw.service';

describe('ApiRecuperarPswService', () => {
  let service: ApiRecuperarPswService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRecuperarPswService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
