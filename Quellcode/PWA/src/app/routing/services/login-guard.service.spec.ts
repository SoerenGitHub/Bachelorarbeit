import { AuthService } from 'src/app/auth-service/services/auth.service';
import { AuthServiceModule } from './../../auth-service/auth-service.module';
import { TestBed } from '@angular/core/testing';

import { LoginGuardService } from './login-guard.service';
import { MeetingRootComponent } from 'src/app/meeting/meeting-root/meeting-root.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { MeetingModule } from 'src/app/meeting/meeting.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';

describe('LoginGuardService', () => {
  const routes: Routes = [
    { path: 'meetings', component: MeetingRootComponent}
  ];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule.withRoutes(routes),
      MeetingModule,
      AuthServiceModule,
      AngularFireModule.initializeApp(environment.firebase),
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
      LoginGuardService,
      SwUpdate
    ]
  }));

  it('should be created', () => {
    const service: LoginGuardService = TestBed.get(LoginGuardService);
    expect(service).toBeTruthy();
  });
});
