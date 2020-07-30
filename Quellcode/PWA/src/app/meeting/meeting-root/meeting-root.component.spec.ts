import { RouterTestingModule } from '@angular/router/testing';
import { InformationModule } from './../../information/information.module';
import { MaterialModule } from './../../material/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingRootComponent } from './meeting-root.component';
import { AngularFireModule } from '@angular/fire';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

describe('MeetingRootComponent', () => {
  let component: MeetingRootComponent;
  let fixture: ComponentFixture<MeetingRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingRootComponent ],
      imports: [
        MaterialModule,
        RouterTestingModule,
        InformationModule,
        AngularFireModule.initializeApp(environment.firebase),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
