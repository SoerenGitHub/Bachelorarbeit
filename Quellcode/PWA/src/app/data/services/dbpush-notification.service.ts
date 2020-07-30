import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { InformationService } from 'src/app/information/services/information.service';
import { HostConnectiontService } from 'src/app/connection/services/host-connection.service';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class DBPushNotificationService extends DbService {

  constructor(protected readonly firebaseApp: FirebaseApp,
              protected readonly informationService: InformationService,
              protected readonly hostConnectiontService: HostConnectiontService) {
    super(firebaseApp, informationService, hostConnectiontService);
  }

  async setPushSubscription(subscription: string): Promise<any> {
    if (this.hostConnectiontService.connection && subscription && subscription.length > 0) {
      const setPushSubscription = this.firebaseApp.functions().httpsCallable('setPushEndpoint');
      return setPushSubscription(subscription);
    }
  }

  async deletePushSubscription(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.hostConnectiontService.connection) {
        const id = this.id;
        if (id) {
          this.document(`/pushEndpoint/${id}`).delete()
          .finally(() => {
            return resolve();
          });
        }
      }
    });
  }


}
