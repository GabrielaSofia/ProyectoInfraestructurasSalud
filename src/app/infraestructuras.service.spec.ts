import { TestBed } from '@angular/core/testing';

import { InfraestructurasService } from './infraestructuras.service';

describe('InfraestructurasService', () => {
  let service: InfraestructurasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfraestructurasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
