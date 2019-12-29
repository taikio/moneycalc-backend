import { TestBed } from '@angular/core/testing';

import { ServiceOrderService } from './service-order.service';

describe('ServiceOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceOrderService = TestBed.get(ServiceOrderService);
    expect(service).toBeTruthy();
  });
});
