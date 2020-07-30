import { DbService } from './services/db.service';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { ConnectionModule } from './../connection/connection.module';
import { DBAuthService } from './services/dbauth.service';
import { NgModule, enableProdMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformationModule } from '../information/information.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InformationModule,
    ConnectionModule,
    AngularFirestoreModule
  ],
  providers: [
    DBAuthService,
    AngularFirestore
  ]
})
export class DataModule {
}
