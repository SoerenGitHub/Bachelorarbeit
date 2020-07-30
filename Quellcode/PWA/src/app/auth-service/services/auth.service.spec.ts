import { SwUpdate, ServiceWorkerModule } from '@angular/service-worker';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { ConnectionModule } from 'src/app/connection/connection.module';
import { DataModule } from 'src/app/data/data.module';
import { PushMessageModule } from 'src/app/push-message/push-message.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { MeetingRootComponent } from 'src/app/meeting/meeting-root/meeting-root.component';
import { AuthRootComponent } from 'src/app/auth/components/auth-root/auth-root.component';
import { MeetingModule } from 'src/app/meeting/meeting.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { Routes } from '@angular/router';

describe('AuthService', () => {


  const routes: Routes = [
    { path: 'meetings', component: MeetingRootComponent},
    { path: '', component: AuthRootComponent},
  ];

  let service: AuthService;
  let mockUser;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule.withRoutes(routes),
      CommonModule,
      AngularFirestoreModule,
      AngularFireAuthModule,
      ConnectionModule,
      DataModule,
      PushMessageModule,
      AngularFireModule.initializeApp(environment.firebase),
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
      MeetingModule,
      AuthModule
    ],
    providers: [
      AuthService,
      SwUpdate
    ]
  }));

  beforeEach(() => {
    mockUser = {
      email: 'testemail@test.com',
      password: 'testpassword',
      repassword: 'testpassword',
      forename: 'testforename',
      name: 'testname'
    };

    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
