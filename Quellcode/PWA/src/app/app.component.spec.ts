import { DataModule } from './data/data.module';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { PushMessageModule } from './push-message/push-message.module';
import { MatSnackBarModule } from '@angular/material';
import { InformationModule } from './information/information.module';
import { AngularFireModule } from '@angular/fire';
import { MaterialModule } from './material/material.module';
import { ConnectionModule } from './connection/connection.module';
import { AppRoutingModule } from './routing/app-routing.module';
import { MeetingModule } from './meeting/meeting.module';
import { FriendModule } from './friend/friend.module';
import { AuthModule } from './auth/auth.module';
import { OverviewModule } from './overview/overview.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { Routes } from '@angular/router';
import { AuthGuardService } from './routing/services/auth-guard.service';
import { SmartphoneGuardService } from './routing/services/smartphone-guard.service';
import { ComputerGuardService } from './routing/services/computer-guard.service';
import { LoginGuardService } from './routing/services/login-guard.service';
import { AuthRootComponent } from './auth/components/auth-root/auth-root.component';
import { MeetingRootComponent } from './meeting/meeting-root/meeting-root.component';
import { FriendRootComponent } from './friend/friend-root/friend-root.component';
import { OverviewRootComponent } from './overview/components/overview-root/overview-root.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule,
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
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PWA'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('PWA');
  });
});
