import { DbService } from './db.service';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { InformationService } from 'src/app/information/services/information.service';
import { HostConnectiontService } from 'src/app/connection/services/host-connection.service';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DBAuthService extends DbService {

  constructor(protected readonly firebaseApp: FirebaseApp,
              protected readonly informationService: InformationService,
              protected readonly hostConnectiontService: HostConnectiontService) {
    super(firebaseApp, informationService, hostConnectiontService);
  }

  public async logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      super.unsubscribeSnapshots();
      this.firebaseApp.firestore().terminate()
      .catch(() => {
        return reject('Ausloggen fehlgeschlagen');
      })
      .finally(() => {
        this.firebaseApp.firestore().clearPersistence()
        .then(() => {
          return resolve();
        })
        .catch(() => {
          return reject('Presistente Daten konten nicht bereinigt werden.');
        });
      });
    });
  }

  async createUser(user: User): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (user && user.publicInfo) {
        this.document(`/users/${user.publicInfo.id}`).set(user)
        .then(() => {
          return resolve();
        })
        .catch(() => {
          return reject('User konnte nicht erstellt werden.');
        });
      } else {
        return reject('User konnte nicht erstellt werden.');
      }
     });
  }
}
