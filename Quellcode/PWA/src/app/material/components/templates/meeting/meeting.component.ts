import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {
  examplepic = require('../../../assets/SVGs/person_white.svg');
  subscriberIcon = require('../../../assets/SVGs/person_dark.svg');

  @Input()
  meeting: any;

  @Input()
  userId: string;

  @Output()
  onSubscribe: EventEmitter<any> = new EventEmitter();


  @Output()
  onDelete: EventEmitter<any> = new EventEmitter();


  constructor() {
  }

  ngOnInit() {
  }

  get subscribed() {
    if (this.meeting && this.meeting.subscriber) {
      return this.meeting.subscriber.includes(this.userId);
    } else {
      return false;
    }
  }

  get isOwner() {
    if (this.userId) {
      return this.userId === this.meeting.userId;
    } else {
      return false;
    }

  }

  get location() {
    if (this.meeting) {
      return this.meeting.info.location;
    } else {
      return 'undefined';
    }
  }

  get activity() {
    if (this.meeting) {
      return this.meeting.info.activity;
    } else {
      return 'undefined';
    }
  }

  get fullname() {
    if (this.meeting) {
      return this.meeting.fullname;
    } else {
      return 'undefined';
    }
  }

  get datetime() {
    if (this.meeting) {
      return this.meeting.info.datetime;
    } else {
      return 'undefined';
    }
  }

  get subscriber() {
    if (this.meeting && this.meeting.subscriber) {
      return this.meeting.subscriber.length;
    } else {
      return 0;
    }
  }

  subscribe() {
    this.onSubscribe.emit(this.meeting);
  }

  deleteMeeting() {
    this.onDelete.emit(this.meeting);
  }


}
