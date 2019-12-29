import { TestBed } from '@angular/core/testing';

import { AgGridHelperService } from './ag-grid-helper.service';

describe('AgGridHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgGridHelperService = TestBed.get(AgGridHelperService);
    expect(service).toBeTruthy();
  });
});
