import { DataModule } from './../data/data.module';
import { AuthModule } from './../auth/auth.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FriendRootComponent } from './friend-root/friend-root.component';
import { InformationModule } from '../information/information.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [FriendRootComponent],
  imports: [
    CommonModule,
    MaterialModule,
    InformationModule,
    DataModule,
    BrowserAnimationsModule
  ],
  exports: [
    FriendRootComponent
  ]
})
export class FriendModule { }
