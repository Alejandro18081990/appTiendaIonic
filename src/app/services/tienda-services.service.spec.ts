import { TestBed } from '@angular/core/testing';

import { TiendaServicesService } from './tienda-services.service';

describe('TiendaServicesService', () => {
  let service: TiendaServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiendaServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
