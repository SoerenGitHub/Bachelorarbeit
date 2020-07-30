import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from 'src/app/auth-service/services/auth.service';
import { OverviewModule } from './overview/overview.module';
import { PushService } from './push-message/services/push.service';
import { DbService } from './data/services/db.service';
import { AppRoutingModule } from './routing/app-routing.module';
import { MaterialModule } from './material/material.module';
import { ConnectionModule } from './connection/connection.module';
import { DataModule } from './data/data.module';
import { InformationModule } from './information/information.module';
import { PushMessageModule } from './push-message/push-message.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MeetingModule } from './meeting/meeting.module';
import { FriendModule } from './friend/friend.module';
import { AuthModule } from './auth/auth.module';
import { AngularFireModule } from '@angular/fire';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { stat } from 'fs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PushMessageModule,
    MatSnackBarModule,
    InformationModule,
    AngularFireModule.initializeApp(environment.firebase),
    MaterialModule,
    DataModule,
    ConnectionModule,
    AppRoutingModule,
    MeetingModule,
    FriendModule,
    AuthModule,
    OverviewModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly dbService: DbService,
              private readonly swUpdate: SwUpdate,
              private readonly matSnackbar: MatSnackBar,
              private readonly pushService: PushService) {
    console.log('constr!');
    dbService.init();
    if (swUpdate.isEnabled) {
      console.log('SW Supported!');
      pushService.init();
      swUpdate.available.subscribe(() => {
        const snackbar = matSnackbar.open('Neue Version verfügbar.', 'Neu laden');
        snackbar.onAction().subscribe(() => {
          window.location.reload();
        });
      });
    }
  }


}
