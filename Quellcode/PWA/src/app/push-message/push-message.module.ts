import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DataModule } from './../data/data.module';
import { PushService } from './services/push.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionModule } from '../connection/connection.module';
import { SwPush, SwUpdate } from '@angular/service-worker';



@NgModule({
  imports: [
    CommonModule,
    DataModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ConnectionModule
  ],
  providers: [
    AngularFirestore,
    PushService,
    SwPush,
    SwUpdate
  ]
})
export class PushMessageModule { }
