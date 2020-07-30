import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { TestBed } from '@angular/core/testing';

import { DBMeetingService } from './dbmeeting.service';
import { ConnectionModule } from 'src/app/connection/connection.module';
import { InformationModule } from 'src/app/information/information.module';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { DBAuthService } from './dbauth.service';

describe('DBMeetingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      InformationModule,
      ConnectionModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule
    ],
    providers: [
      DBAuthService,
      AngularFirestore,
      FirebaseApp
    ]
  }));

  it('should be created', () => {
    const service: DBMeetingService = TestBed.get(DBMeetingService);
    expect(service).toBeTruthy();
  });
});
