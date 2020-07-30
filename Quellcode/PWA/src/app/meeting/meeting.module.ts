import { DataModule } from './../data/data.module';
import { AuthServiceModule } from './../auth-service/auth-service.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MeetingRootComponent } from './meeting-root/meeting-root.component';



@NgModule({
  declarations: [MeetingRootComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DataModule
  ],
  exports: [
    MeetingRootComponent
  ]
})
export class MeetingModule { }
