import { TestBed } from '@angular/core/testing';

import { XmlExporterServiceService } from './xml-exporter-service.service';

describe('XmlExporterServiceService', () => {
  let service: XmlExporterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmlExporterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
