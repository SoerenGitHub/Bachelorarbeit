import { FriendModule } from './../../../friend/friend.module';
import { MaterialModule } from './../../../material/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRootComponent } from './overview-root.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MeetingModule } from 'src/app/meeting/meeting.module';
import { AngularFireModule } from '@angular/fire';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

describe('OverviewRootComponent', () => {
  let component: OverviewRootComponent;
  let fixture: ComponentFixture<OverviewRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewRootComponent ],
      imports: [
        MaterialModule,
        MeetingModule,
        FriendModule,
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
