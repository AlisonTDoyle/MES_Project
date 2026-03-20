import { TestBed } from '@angular/core/testing';

import { ApiHandlerServiceService } from './api-handler-service.service';

describe('ApiHandlerServiceService', () => {
  let service: ApiHandlerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiHandlerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
