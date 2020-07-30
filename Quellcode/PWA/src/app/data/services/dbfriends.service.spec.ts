import { TestBed } from '@angular/core/testing';

import { DBFriendsService } from './dbfriends.service';
import { RouterTestingModule } from '@angular/router/testing';
import { InformationModule } from 'src/app/information/information.module';
import { ConnectionModule } from 'src/app/connection/connection.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { DBAuthService } from './dbauth.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';

describe('DBFriendsService', () => {
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
    const service: DBFriendsService = TestBed.get(DBFriendsService);
    expect(service).toBeTruthy();
  });
});
