import { TestBed } from '@angular/core/testing';

import { PushService } from './push.service';
import { DataModule } from 'src/app/data/data.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ConnectionModule } from 'src/app/connection/connection.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { SwPush, SwUpdate, ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

describe('PushService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      DataModule,
      AngularFireAuthModule,
      AngularFireAuthModule,
      ConnectionModule,
      AngularFireModule.initializeApp(environment.firebase),
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: [
      AngularFirestore,
      PushService,
      SwPush,
      SwUpdate
    ]
  }));

  it('should be created', () => {
    const service: PushService = TestBed.get(PushService);
    expect(service).toBeTruthy();
  });
});
