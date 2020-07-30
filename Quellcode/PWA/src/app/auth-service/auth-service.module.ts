import { DataModule } from './../data/data.module';
import { ConnectionModule } from './../connection/connection.module';
import { AuthService } from './services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PushMessageModule } from '../push-message/push-message.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    ConnectionModule,
    DataModule,
    PushMessageModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthServiceModule {
}
