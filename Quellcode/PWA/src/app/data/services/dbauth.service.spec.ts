import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { TestBed } from '@angular/core/testing';

import { DBAuthService } from './dbauth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { InformationModule } from 'src/app/information/information.module';
import { ConnectionModule } from 'src/app/connection/connection.module';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { environment } from 'src/environments/environment';

describe('DBAuthService', () => {
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
    const service: DBAuthService = TestBed.get(DBAuthService);
    expect(service).toBeTruthy();
  });
});
