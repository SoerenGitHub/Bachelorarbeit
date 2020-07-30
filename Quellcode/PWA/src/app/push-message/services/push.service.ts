import { SwPush, SwUpdate } from '@angular/service-worker';
import { HostConnectiontService } from './../../connection/services/host-connection.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FirebaseApp } from '@angular/fire';
import { DBPushNotificationService } from 'src/app/data/services/dbpush-notification.service';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  private readonly messaging = this.firebaseApp.messaging();
  private currentMessage = new BehaviorSubject(null);


  constructor(private readonly dbPushNotificationService: DBPushNotificationService,
              private readonly hostConnectiontService: HostConnectiontService,
              private readonly firebaseAuth: AngularFireAuth,
              private readonly firebaseApp: FirebaseApp,
              private readonly swPush: SwPush,
              private readonly swUpdate: SwUpdate) {

   }

  logout(): Promise<void> {
    console.log('push.logout');
    return new Promise<void>((resolve, reject) => {

      if (this.swUpdate.isEnabled) {
        navigator.serviceWorker.getRegistration()
        .then(swr => {
          this.firebaseApp.messaging().getToken()
          .then(token => {
            Promise.all([
              this.swPush.unsubscribe(),
              this.dbPushNotificationService.deletePushSubscription(),
              this.firebaseApp.messaging().deleteToken(token)
            ])
            .then(() => {
              return resolve();
           })
           .catch(() => {
             return reject('Push-Token konnte nicht entfernt werden.');
           });
          });
        })
        .catch(() => {
          return resolve();
        });
      } else {
        resolve();
      }
    });
    return;
  }


  private getPermission() {
    this.messaging.requestPermission()
    .then(() => {
      this.firebaseAuth.onAuthStateChanged(user => {
        if (user && user.uid) {
          if (this.hostConnectiontService.connection) {
            this.messaging.getToken()
            .then(token => {
              this.dbPushNotificationService.setPushSubscription(token);
            })
            .catch(err => console.error('TOKENERROR: ', err));
          }
        }
      });
    })
    .catch(err => console.error(err));
  }

  private receiveMessage() {
    this.swPush.messages.subscribe(msg => console.log('push message', msg));
    this.swPush.notificationClicks.subscribe(click => {
      window.open('http://localhost:3000/friends', '_blank');
    });
  }

  public async init() {
    console.log('push.init');
    navigator.serviceWorker.ready
    .then((swr) => {
      if (swr) {
        console.log('activate SW');
        this.firebaseApp.messaging().useServiceWorker(swr);
      } else {
        console.log('no SW');
      }
    })
    .catch(() => console.log('no SW-reg'));
  }

  async registration() {
    if (this.swUpdate.isEnabled) {
      this.getPermission();
      this.receiveMessage();
    }
  }

  get message() {
    return this.currentMessage;
  }
}
