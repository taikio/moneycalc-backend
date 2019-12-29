import { TestBed } from '@angular/core/testing';

import { HttpHelperService } from './http-helper.service';

describe('HttpHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpHelperService = TestBed.get(HttpHelperService);
    expect(service).toBeTruthy();
  });
});
