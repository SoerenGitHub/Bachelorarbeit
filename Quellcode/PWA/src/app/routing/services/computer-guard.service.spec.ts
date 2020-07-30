import { TestBed } from '@angular/core/testing';

import { ComputerGuardService } from './computer-guard.service';
import { MeetingRootComponent } from 'src/app/meeting/meeting-root/meeting-root.component';
import { MeetingModule } from 'src/app/meeting/meeting.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';

describe('ComputerGuardService', () => {
  const routes: Routes = [
    { path: 'meetings', component: MeetingRootComponent}
  ];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule.withRoutes(routes),
      MeetingModule
    ],
    providers: [
      ComputerGuardService
    ]
  }));
  it('should be created', () => {
    const service: ComputerGuardService = TestBed.get(ComputerGuardService);
    expect(service).toBeTruthy();
  });
});
