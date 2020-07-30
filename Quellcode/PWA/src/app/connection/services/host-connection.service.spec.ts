import { TestBed } from '@angular/core/testing';

import { HostConnectiontService } from './host-connection.service';
import { InformationModule } from 'src/app/information/information.module';

describe('HostConnectiontService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      InformationModule
    ]
  }));

  it('should be created', () => {
    const service: HostConnectiontService = TestBed.get(HostConnectiontService);
    expect(service).toBeTruthy();
  });
});
