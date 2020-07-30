import { DBFriendsService } from './dbfriends.service';
import { User } from './../interfaces/user';
import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { FirebaseApp } from '@angular/fire';
import { InformationService } from 'src/app/information/services/information.service';
import { HostConnectiontService } from 'src/app/connection/services/host-connection.service';
import { MeetingInfo } from '../interfaces/meeting-info';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DBMeetingService extends DbService {

  constructor(protected readonly firebaseApp: FirebaseApp,
              protected readonly informationService: InformationService,
              protected readonly hostConnectiontService: HostConnectiontService,
              private readonly dbFriendsService: DBFriendsService) {
    super(firebaseApp, informationService, hostConnectiontService);
  }

  get friendsAsUser() {
    this.initData();
    return this.dbFriendsService.friendsAsUser;
  }

  private async initData() {
    const id = this.id;
    if (id) {
      this.initOwnMeetings(id);
    }
  }

  async addMeeting(meetinginfo: MeetingInfo): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!meetinginfo.activity || !meetinginfo.datetime ||
          !meetinginfo.deadline || !meetinginfo.location) {
        return reject('Das Treffen konnte nicht erstellt werden! Bitte füllen Sie alle Felder aus.');
      }
     const id = this.id;
     if (id) {
      const data = {
        info: {
          datetime: meetinginfo.datetime,
          location: meetinginfo.location,
          activity: meetinginfo.activity,
          deadline: firestore.Timestamp.fromDate(meetinginfo.deadline)
        }
      };
      this.collection(`/users/${id}/meetings`)
      .add(data)
      .then(() => {
        return resolve('Das Treffen wurde erstellt!');
      })
      .catch(err => {
        return reject('Das Treffen konnte nicht erstellt werden!');
      });
     } else {
      return reject('Keine Authorisation!');
    }
    });
  }

  async deleteMeeting(meetingId: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const id = this.id;
      if (id && meetingId) {
        this.document(`/users/${id}/meetings/${meetingId}`).delete()
        .then(() => {
          return resolve('Treffen wurde erfolgreich entfernt!');
        })
        .catch(err => {
          return reject('Treffen konnte nicht entfernt werden!');
        });
      } else {
        return reject('Keine Authorisation!');
      }
    });
  }

  async subscribeToMeeting(meeting: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const id = this.id;
      if (meeting && meeting.id && meeting.userId) {
        this.document(`/users/${meeting.userId}/meetings/${meeting.id}/subscriber/${id}`).set({id})
        ;
      } else {
        return reject('Keine Authorisation!');
      }
    });
  }

  private async initOwnMeetings(id: string) {
    const meSnapshot = this.document(`/users/${id}`).onSnapshot(meSnap => {
      const meUser = meSnap.data();
      if (meUser) {
        const myMeetingsSnapshot = meSnap.ref.collection('meetings').onSnapshot(myMeetingDocs => {
          const myMeetings = myMeetingDocs.docs.map(myMeetingDoc => {
            const meeting = myMeetingDoc.data();
            meeting.id = myMeetingDoc.id;
            meeting.userId = meUser.publicInfo.id;
            const subscriberSnapshot = myMeetingDoc.ref.collection('subscriber').onSnapshot(subscriberSnap => {
              const subscrieber = subscriberSnap.docs.map(sub => sub.data().id);
              meeting.subscriber = subscrieber;
            }, err => {
              this.informationService.newInformation({
                information: 'Laden der eigenen Treffen - Subscriber -fehlgeschlagen!',
                error: true
              });
            });
            this.snapshots.push(subscriberSnapshot);
            return meeting;
          });
          if (myMeetings) {
            meUser.meetings = myMeetings;
          }
          this.currentUser.next(meUser as User);
        }, err => {
          this.informationService.newInformation({
            information: 'Laden der eigenen Treffen fehlgeschlagen!',
            error: true
          });
        });
        this.snapshots.push(myMeetingsSnapshot);
      }
    } , err => {
      this.informationService.newInformation({
        information: 'Laden des eigenen Dokumentes fehlgeschlagen!',
        error: true
      });
    });
    this.snapshots.push(meSnapshot);
  }
}
