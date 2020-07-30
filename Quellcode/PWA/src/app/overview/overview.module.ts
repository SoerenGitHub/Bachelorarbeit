import { MeetingModule } from './../meeting/meeting.module';
import { FriendModule } from './../friend/friend.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewRootComponent } from './components/overview-root/overview-root.component';



@NgModule({
  declarations: [OverviewRootComponent],
  imports: [
    CommonModule,
    FriendModule,
    MeetingModule
  ],
  exports: [
    OverviewRootComponent
  ]
})
export class OverviewModule { }
