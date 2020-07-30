import { InformationService } from './../../information/services/information.service';
import { HostConnectiontService } from './../../connection/services/host-connection.service';
import { Injectable, enableProdMode } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { FirebaseApp } from '@angular/fire';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  protected readonly snapshots = [];
  protected readonly currentUser: Subject<User> = new Subject<User>();

  constructor(protected readonly firebaseApp: FirebaseApp,
              protected readonly informationService: InformationService,
              protected readonly hostConnectiontService: HostConnectiontService) {
   }

   public init(): void {
     this.enablePersistence();
     this.handleConnection();
   }

   private enablePersistence(): void {
    this.firebaseApp.firestore().enablePersistence()
    .catch(err => {
      if (err.code === 'failed-precondition') {
        this.informationService.newInformation({
          information: 'Bitte Schließen Sie alle Tabs, bis auf einen, um den Offlinesupport zu gewährleisten!',
          error: true
        });
      } else if (err.code === 'unimplemented') {
        this.informationService.newInformation({
          information: 'Ihr Browser unterstützt keinen Offlinesupport',
          error: true
        });
      }
    });
  }

  private async handleConnection(): Promise<void> {
    if (!this.hostConnectiontService.connection) {
      this.firebaseApp.firestore().disableNetwork();
    } else {
      this.firebaseApp.firestore().enableNetwork();
    }
    this.hostConnectiontService.connectionObservable.subscribe(connected => {
      if (!connected) {
        this.firebaseApp.firestore().disableNetwork();
      } else {
        this.firebaseApp.firestore().enableNetwork();
      }
    });
    return;
  }

  public get user(): Subject<User> {
    return this.currentUser;
  }

  protected get id(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? String(user.uid) : null;
  }

  protected collection(path: string): firestore.CollectionReference<firestore.DocumentData> {
    return this.firebaseApp.firestore().collection(path);
  }

  protected document(path: string): firestore.DocumentReference<firestore.DocumentData> {
    return this.firebaseApp.firestore().doc(path);
  }

  public unsubscribeSnapshots(): void {
    if (this.snapshots && this.snapshots.length > 0) {
      this.snapshots.forEach(snapshot => {
        snapshot();
      });
    }
  }
}
