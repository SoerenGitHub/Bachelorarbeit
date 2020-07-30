import { TestBed } from '@angular/core/testing';

import { ScreenTrackerService } from './screen-tracker.service';

describe('ScreenTrackerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScreenTrackerService = TestBed.get(ScreenTrackerService);
    expect(service).toBeTruthy();
  });
});
