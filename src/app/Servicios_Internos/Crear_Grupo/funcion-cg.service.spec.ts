import { TestBed } from '@angular/core/testing';

import { FuncionCGService } from './funcion-cg.service';

describe('FuncionCGService', () => {
  let service: FuncionCGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncionCGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
