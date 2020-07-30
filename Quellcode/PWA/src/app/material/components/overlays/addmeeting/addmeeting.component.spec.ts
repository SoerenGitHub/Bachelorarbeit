import { DatePipe } from '@angular/common';
import { TimepickerComponent } from './../../elements/timepicker/timepicker.component';
import { DatepickerComponent } from './../../elements/datepicker/datepicker.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule
} from '@angular/material';
import { AddmeetingComponent } from './addmeeting.component';
import { TextboxComponent } from '../../elements/textbox/textbox.component';
import { OverlayComponent } from '../overlay/overlay.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IMeetingInfo } from './imeeting-info';

describe('AddmeetingComponent', () => {
  let component: AddmeetingComponent;
  let fixture: ComponentFixture<AddmeetingComponent>;

  let locationInput;
  let activityInput;
  let dateInput;
  let timeInput;
  let submitButton;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DatepickerComponent,
        TimepickerComponent,
        TextboxComponent,
        AddmeetingComponent,
        OverlayComponent
      ],
      imports: [
        ReactiveFormsModule,
        NgxMaterialTimepickerModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        DatePipe
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmeetingComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    fixture.detectChanges();

    spyOn(component.onCreate, 'emit');
    spyOn(component.isVisibleCallback, 'next');

    fixture.detectChanges();

    //show overlay
    component.isVisible = true;
    fixture.detectChanges();

    //get elements
    activityInput = fixture.debugElement.nativeElement.querySelector('#activity');
    locationInput = fixture.debugElement.nativeElement.querySelector('#location');
    dateInput = fixture.debugElement.nativeElement.querySelector('#date');
    timeInput = fixture.debugElement.nativeElement.querySelector('#time');
    submitButton = fixture.debugElement.nativeElement.querySelector('#continue');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be visible after close', () => {
    //hide overlay
    component.close();

    //detect changes
    fixture.detectChanges();

    //Expectation
    expect(component.isVisibleCallback.next).toHaveBeenCalledWith(false);
  });

  it('should show overlay-components', () => {

    //Expectation
    expect(locationInput).toBeDefined();
    expect(activityInput).toBeDefined();
    expect(dateInput).toBeDefined();
    expect(timeInput).toBeDefined();
    expect(submitButton).toBeDefined();
  });

  it('should emit on submit-button click', () => {

    //click submit-button
    submitButton.click();

    //Expectation
    expect(component.onCreate.emit).toHaveBeenCalled();
  });

  it('should output the values on submit', () => {

    //set Form-Values
    component.meetingform.controls.activity.setValue('testactivity');
    component.meetingform.controls.location.setValue('testlocation');
    component.meetingform.controls.date.setValue('01.01.2020');
    component.meetingform.controls.time.setValue('12:00');

    //detect changes
    fixture.detectChanges();

    //click submit-button
    submitButton.click();

    //detect changes
    fixture.detectChanges();

    //Expectation
    const meeting = {
      activity: 'testactivity',
      location: 'testlocation',
      datetime: '01.01.2020, 12:00',
      deadline: new Date(Date.parse('01.01.2020'))
    } as IMeetingInfo;

    expect(component.onCreate.emit).toHaveBeenCalledWith(meeting);
  });


  it('should update Input on Event', () => {

    //set Form-Values
    locationInput.value = 'testlocation';
    locationInput.dispatchEvent(new Event('input'));

    activityInput.value = 'testactivity';
    activityInput.dispatchEvent(new Event('input'));

    dateInput.value = 'testdate';
    dateInput.dispatchEvent(new Event('input'));

    timeInput.value = 'testtime';
    timeInput.dispatchEvent(new Event('input'));

    //detect changes
    fixture.detectChanges();

    //Expectation
    expect(locationInput.value).toEqual('testlocation');
    expect(activityInput.value).toEqual('testactivity');
    expect(dateInput.value).toEqual('testdate');
    expect(timeInput.value).toEqual('testtime');

  });
});
