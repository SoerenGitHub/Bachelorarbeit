import { TestBed } from '@angular/core/testing';

import { InformationService } from './information.service';

describe('InformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InformationService
    ]
  }));

  it('should be created', () => {
    const service: InformationService = TestBed.get(InformationService);
    expect(service).toBeTruthy();
  });
});
