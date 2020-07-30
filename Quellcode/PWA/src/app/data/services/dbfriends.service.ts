import { DbService } from './db.service';
import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { InformationService } from 'src/app/information/services/information.service';
import { HostConnectiontService } from 'src/app/connection/services/host-connection.service';
import { Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { Meeting } from '../interfaces/meeting';

@Injectable({
  providedIn: 'root'
})
export class DBFriendsService extends DbService {
  private friends: Subject<User[]> = new Subject<User[]>();
  private requestedFriends: Subject<User[]> = new Subject<User[]>();

  constructor(protected readonly firebaseApp: FirebaseApp,
              protected readonly informationService: InformationService,
              protected readonly hostConnectiontService: HostConnectiontService) {
    super(firebaseApp, informationService, hostConnectiontService);
  }

  get friendsAsUser() {
    this.initData();
    return this.friends;
  }

  get requestedFriendsAsUser() {
    return this.requestedFriends;
  }

  public async findNewFriends(name: string, forename: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      if (!this.hostConnectiontService.connection) {
        return reject('Sie können Freunde nur mit einer Verbindung finden!');
      }
      if (!name || !forename) {
        return reject('Suche fehlgeschlagen! Bitte geben Sie den Vor- und Nachnamen an.');
      }
      this.collection('users')
      .where('publicInfo.forename', '==', forename)
      .where('publicInfo.name', '==', name).get()
      .then(res => {
        const data = res.docs.map(doc => doc.get('publicInfo')).filter(pI => pI.id !== this.id);
        if (data && data.length > 0) {
          return resolve(data);
        } else {
          return reject('Niemanden gefunden!');
        }
      })
      .catch(err => {
        return reject('Niemanden gefunden!');
      });
    });
  }


  public async sendFriendRequest(friendId: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!this.hostConnectiontService.connection) {
        return reject('Sie können Freunde nur mit einer Verbindung hinzufügen!');
      }
      const id = this.id;
      if (id) {
        const data = {
          id
        };
        this.collection(`/users/${friendId}/friendRequests`)
        .doc(id)
        .set(data)
        .then(() => {
          return resolve('Freundschaftsanfrage gesendet!');
        })
        .catch(err => {
          return reject('Freundschaftsanfrage existiert bereits!');
        });
      } else {
        return reject('Keine Authorisation!');
      }
    });
  }

  public async approveFriendRequest(friendId: string): Promise<string> {
    console.log(friendId);
    return new Promise<string>((resolve, reject) => {
      if (!this.hostConnectiontService.connection) {
        return reject('Sie können Freundschaftsanfragen nur mit einer Verbindung bestätigen!');
      }
      const id = this.id;
      if (id && friendId) {

        const batch = this.firebaseApp.firestore().batch();

        const ownerFriendListDoc = this.document(`/users/${id}/friends/${friendId}`);
        const ownerFriendRequestsListDoc = this.document(`/users/${id}/friendRequests/${friendId}`);
        const commingFriendFriendListDoc = this.document(`/users/${friendId}/friends/${id}`);

        batch.set(ownerFriendListDoc, {
          id: friendId
        });
        batch.set(commingFriendFriendListDoc, {id});
        batch.delete(ownerFriendRequestsListDoc);

        batch.commit()
        .then(msg => {
          return resolve('Freundschaftsanfrage erfolgreich bestätigt!');
        })
        .catch(err => {
          return reject('Freundschaftsanfrage konnte nicht bestätigt werden!');
        });
      } else {
        return reject('Keine Authorisation!');
      }
    });
  }

  public async deleteFriend(friendId: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (!this.hostConnectiontService.connection) {
        return reject('Sie können Freunde nur mit einer Verbindung entfernen!');
      }
      const id = this.id;
      if (id && friendId) {
        super.unsubscribeSnapshots();

        const batch = this.firebaseApp.firestore().batch();

        const ownerFriendListDoc = this.document(`/users/${id}/friends/${friendId}`);
        const exFriendFriendListDoc = this.document(`/users/${friendId}/friends/${id}`);

        batch.delete(ownerFriendListDoc);
        batch.delete(exFriendFriendListDoc);

        batch.commit()
        .then(() => {
          this.initData();
          return resolve('Freund erfolgreich entfernt!');
        })
        .catch(() => {
          return reject('Freund konnte nicht entfernt werden!');
        });
      } else {
        return reject('Keine Authorisation!');
      }
    });
  }

  private async initData(): Promise<void>{
    const id = this.id;
    if (id) {
      this.initFriendRequests(id);
      this.initFriendData(id);
    }
  }

  private async initFriendRequests(id: string): Promise<void> {
    const requestFriends = this.collection(`/users/${id}/friendRequests`)
    .onSnapshot({ includeMetadataChanges: true }, requestFriendsSnap => {
      const requestIds = requestFriendsSnap.docs.map(doc => doc.data().id);
      if (requestIds && requestIds.length > 0) {
        const usersRequestedSnapshot = this.collection('users').where('publicInfo.id', 'in', requestIds)
        .onSnapshot(usersRequestedSnap => {
          const usersRequestedData = usersRequestedSnap.docs.map(doc => doc.data());
          if (usersRequestedData) {
            this.requestedFriends.next(usersRequestedData as User[]);
          }
        }, err => {
          this.informationService.newInformation({
            information: 'Laden der Freundesanfragen - User - fehlgeschlagen!',
            error: true
          });
        });
        this.snapshots.push(usersRequestedSnapshot);
      } else {
        this.requestedFriends.next(null);
      }
    }, err => {
      this.informationService.newInformation({
        information: 'Laden der Freundesanfragen fehlgeschlagen!',
        error: true
      });
    });
    this.snapshots.push(requestFriends);
  }

  private async initFriendData(id: string): Promise<void> {
    const friendsSnapshot = this.collection(`/users/${id}/friends`)
    .onSnapshot({ includeMetadataChanges: true }, snap => {
        const data = snap.docs.map(friendDoc => friendDoc.data().id);
        if (data && data.length > 0) {
          const usersSnapshot = this.collection('users').where('publicInfo.id', 'in', data)
          .onSnapshot(userSnaps => {
            const users = userSnaps.docs.map(userDoc => {
              const user = userDoc.data() as User;
              if (user) {
                const meetingsSnapshot = userDoc.ref.collection('meetings').onSnapshot(meetingsSnap => {
                  const meetings = meetingsSnap.docs.map(doc => {
                    const meeting = doc.data() as Meeting;
                    meeting.id = doc.id;
                    meeting.userId = user.publicInfo.id;
                    meeting.fullname = user.publicInfo.forename + ' ' + user.publicInfo.name;
                    const subscriberSnapshot = doc.ref.collection('subscriber').onSnapshot(subscriberSnap => {
                      const subscrieber = subscriberSnap.docs.map(sub => sub.data().id);
                      meeting.subscriber = subscrieber;
                    }, err => {
                      this.informationService.newInformation({
                        information: 'Laden der Freundes Treffen - Subscriber - fehlgeschlagen!',
                        error: true
                      });
                    });
                    this.snapshots.push(subscriberSnapshot);
                    return meeting;
                  });
                  user.meetings = meetings;
                  this.friends.next(users);
                }, err => {
                  this.informationService.newInformation({
                    information: 'Laden von den Treffen der Freunde fehlgeschlagen!',
                    error: true
                  });
                });
                this.snapshots.push(meetingsSnapshot);
                return user;
              }
            });
          }, err => {
            this.informationService.newInformation({
              information: 'Laden der Freunde fehlgeschlagen!',
              error: true
            });
          });
          this.snapshots.push(usersSnapshot);
        } else {
          this.friends.next(null);
        }
      }, err => {
        this.informationService.newInformation({
          information: 'Laden der Freundesliste fehlgeschlagen!',
          error: true
        });
      });
    this.snapshots.push(friendsSnapshot);
  }

}
