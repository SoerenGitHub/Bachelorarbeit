import { Router } from '@angular/router';
import { DBMeetingService } from './../../data/services/dbmeeting.service';
import { InformationService } from './../../information/services/information.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from 'src/app/auth-service/services/auth.service';
import { trigger, transition, query, stagger, keyframes, animate, style } from '@angular/animations';
import { Meeting } from '../interfaces/meeting';

@Component({
  selector: 'app-meeting-root',
  templateUrl: './meeting-root.component.html',
  styleUrls: ['./meeting-root.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', stagger('150ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ])
        )]), {optional: true})
      ])
    ])
  ]
})
export class MeetingRootComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth >= 550) {
      this.router.navigate(['overview']);
    }
  }

  private _showoverlay: boolean;
  private _meetings: Meeting[];
  private _myMeetings: Meeting[];
  isVisible: boolean;

  constructor(private readonly informationService: InformationService,
              private readonly dbMeetingService: DBMeetingService,
              private readonly router: Router) {
  }


  get meetings() {
    return this._meetings;
  }

  get id(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? String(user.uid) : null;
  }

  get myMeetings() {
    return this._myMeetings;
  }

  get showoverlay() {
    return this._showoverlay;
  }

  ngOnInit() {
    this.updateMeetings();
    this._showoverlay = false;
  }

  private async updateMeetings() {
    this.dbMeetingService.user.subscribe(user => {
      this._myMeetings = [];
      if (user) {
        if (user.meetings && user.meetings.length > 0) {
          this._myMeetings.push(...user.meetings);
        }
      }
    });
    this.dbMeetingService.friendsAsUser.subscribe(users => {
      this._meetings = [];
      if (users) {
        users.forEach(user => {
          if (user.meetings && user.meetings.length > 0) {
            this._meetings.push(...user.meetings);
          }
        });
      }
    });
  }

  showOverlay() {
    this.isVisible = true;
  }

  setIsVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }

  createMeeting(meeting: any): void {
    this.dbMeetingService.addMeeting(meeting)
    .then(msg => this.informationService.newInformation({information: msg, error: false}))
    .catch(err => this.informationService.newInformation({information: err, error: true}));
  }

  subscribeToMeeting(meeting: any): void {
    this.dbMeetingService.subscribeToMeeting(meeting)
    .then(msg => this.informationService.newInformation({information: msg, error: false}))
    .catch(err => this.informationService.newInformation({information: err, error: true}));
  }

  deleteMeeting(meeting: any): void {
    this.dbMeetingService.deleteMeeting(meeting.id)
    .then(msg => this.informationService.newInformation({information: msg, error: false}))
    .catch(err => this.informationService.newInformation({information: err, error: true}));
  }


}
