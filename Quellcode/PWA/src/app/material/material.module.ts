import { OverlayComponent } from './components/overlays/overlay/overlay.component';
import { AddmeetingComponent } from './components/overlays/addmeeting/addmeeting.component';
import { AddfriendComponent } from './components/overlays/addfriend/addfriend.component';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule
} from '@angular/material';
import { TextboxComponent } from './components/elements/textbox/textbox.component';
import { RegisterComponent } from './components/elements/register/register.component';
import { LoginComponent } from './components/elements/login/login.component';
import { DatepickerComponent } from './components/elements/datepicker/datepicker.component';
import { AddButtonComponent } from './components/elements/add-button/add-button.component';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NavComponent } from './components/elements/nav/nav.component';
import { HeaderComponent } from './components/elements/header/header.component';
import { TimepickerComponent } from './components/elements/timepicker/timepicker.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AuthCardComponent } from './components/elements/authcard/authcard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeetingComponent } from './components/templates/meeting/meeting.component';
import { UserComponent } from './components/templates/user/user.component';
import { UserRequestComponent } from './components/templates/user-request/user-request.component';
import { NewUserComponent } from './components/templates/new-user/new-user.component';



@NgModule({
  declarations: [
    NavComponent,
    HeaderComponent,
    AddButtonComponent,
    DatepickerComponent,
    TimepickerComponent,
    LoginComponent,
    RegisterComponent,
    TextboxComponent,
    AuthCardComponent,
    MeetingComponent,
    UserComponent,
    UserRequestComponent,
    NewUserComponent,
    AddfriendComponent,
    AddmeetingComponent,
    OverlayComponent
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent,
    UserComponent,
    NewUserComponent,
    AddfriendComponent,
    AddmeetingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaterialTimepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  exports: [
    NavComponent,
    HeaderComponent,
    AddButtonComponent,
    DatepickerComponent,
    TimepickerComponent,
    LoginComponent,
    RegisterComponent,
    TextboxComponent,
    AuthCardComponent,
    MeetingComponent,
    UserComponent,
    UserRequestComponent,
    NewUserComponent,
    AddfriendComponent,
    AddmeetingComponent
  ],
  providers: [
    DatePipe
  ]
})
export class MaterialModule {}
