import { IMeetingInfo } from './imeeting-info';
import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-addmeeting',
  templateUrl: './addmeeting.component.html',
  styleUrls: ['./addmeeting.component.scss'],
})
export class AddmeetingComponent implements OnInit {

  @Input()
  isVisible: boolean = false;

  @Output()
  isVisibleCallback: Subject<boolean> = new Subject<boolean>();

  @Output()
  onCreate: EventEmitter<IMeetingInfo> = new EventEmitter();

  meetingform = new FormGroup({
    activity: new FormControl(''),
    location: new FormControl(''),
    date: new FormControl(''),
    time: new FormControl('')
  });


  constructor(public datepipe: DatePipe) {
  }

  ngOnInit() {
  }

  get online() {
    return navigator.onLine;
  }

  create() {
    const meeting = {
      activity: this.meetingform.value.activity,
      location: this.meetingform.value.location,
      datetime: (this.datepipe.transform(Date.parse(this.meetingform.value.date), 'dd.MM.yyyy, ') + this.meetingform.value.time),
      deadline: new Date(Date.parse(this.meetingform.value.date))
    } as IMeetingInfo;
    this.onCreate.emit(meeting);
    this.close();
  }

  close() {
    this.meetingform.reset();
    this.isVisibleCallback.next(false);
  }
}
