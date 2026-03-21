import { TestBed } from '@angular/core/testing';

import { JsonExporterServiceService } from './json-exporter-service.service';

describe('JsonExporterServiceService', () => {
  let service: JsonExporterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonExporterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
