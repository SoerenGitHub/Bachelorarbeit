import { AuthRootComponent } from './../../auth/components/auth-root/auth-root.component';
import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthModule } from 'src/app/auth/auth.module';
import { AuthServiceModule } from 'src/app/auth-service/auth-service.module';
import { AngularFireModule } from '@angular/fire';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

describe('AuthGuardService', () => {
  const routes: Routes = [
    { path: '', component: AuthRootComponent}
  ];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule.withRoutes(routes),
      AuthModule,
      AuthServiceModule,
      AngularFireModule.initializeApp(environment.firebase),
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
      AuthGuardService
    ]
  }));
  it('should be created', () => {
    const service: AuthGuardService = TestBed.get(AuthGuardService);
    expect(service).toBeTruthy();
  });
});
