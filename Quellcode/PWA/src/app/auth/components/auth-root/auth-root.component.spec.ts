import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRootComponent } from './auth-root.component';
import { MaterialModule } from 'src/app/material/material.module';
import { InformationModule } from 'src/app/information/information.module';
import { AuthServiceModule } from 'src/app/auth-service/auth-service.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../../auth.module';
import { MeetingModule } from 'src/app/meeting/meeting.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ConnectionModule } from 'src/app/connection/connection.module';
import { PushMessageModule } from 'src/app/push-message/push-message.module';
import { AngularFireModule } from '@angular/fire';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth-service/services/auth.service';

describe('AuthRootComponent', () => {
  let component: AuthRootComponent;
  let fixture: ComponentFixture<AuthRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthRootComponent ],
      imports: [
        MaterialModule,
        InformationModule,
        AuthServiceModule,
        ReactiveFormsModule,
        RouterTestingModule,
        AngularFirestoreModule,
        AngularFirestoreModule,
        AngularFireModule.initializeApp(environment.firebase),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        MeetingModule,
      ],
      providers: [
        AuthService,
        SwUpdate
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
