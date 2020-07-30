import { OverviewRootComponent } from './../overview/components/overview-root/overview-root.component';
import { ComputerGuardService } from './services/computer-guard.service';
import { SmartphoneGuardService } from './services/smartphone-guard.service';
import { AuthServiceModule } from './../auth-service/auth-service.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRootComponent } from '../auth/components/auth-root/auth-root.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginGuardService } from './services/login-guard.service';
import { MeetingRootComponent } from '../meeting/meeting-root/meeting-root.component';
import { FriendRootComponent } from '../friend/friend-root/friend-root.component';

/*const routes: Routes = [
  { path: 'meetings',
  loadChildren: () => import('../meeting/meeting.module').then(m => m.MeetingModule),
  canActivate: [AuthGuardService, SmartphoneGuardService]},
  { path: 'friends',
  loadChildren: () => import('../friend/friend.module').then(m => m.FriendModule),
  canActivate: [AuthGuardService, SmartphoneGuardService]},
  { path: 'overview',
  loadChildren: () => import('../overview/overview.module').then(m => m.OverviewModule),
  canActivate: [AuthGuardService, ComputerGuardService]},
  { path: '', component: AuthRootComponent, canActivate: [LoginGuardService]},
  { path: '**', redirectTo: ''}
];*/

const routes: Routes = [
  { path: 'meetings', component: MeetingRootComponent, canActivate: [AuthGuardService, SmartphoneGuardService]},
  { path: 'friends', component: FriendRootComponent, canActivate: [AuthGuardService, SmartphoneGuardService]},
  { path: 'overview', component: OverviewRootComponent, canActivate: [AuthGuardService, ComputerGuardService]},
  { path: '', component: AuthRootComponent, canActivate: [LoginGuardService]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    AuthServiceModule
  ],
  exports: [RouterModule],
  providers: [
    AuthGuardService,
    LoginGuardService,
    SmartphoneGuardService,
    ComputerGuardService
  ]
})
export class AppRoutingModule { }
