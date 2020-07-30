import { PushService } from './../../push-message/services/push.service';
import { DBAuthService } from './../../data/services/dbauth.service';
import { HostConnectiontService } from './../../connection/services/host-connection.service';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({providedIn : 'root'})
export class AuthService {

  private loginStateChanged: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly router: Router,
              private readonly dbauthService: DBAuthService,
              private readonly angularFireAuth: AngularFireAuth,
              private readonly hostConnectiontService: HostConnectiontService,
              private readonly pushService: PushService) {
    this.observeLoginState();
  }

  private async observeLoginState() {
    this.angularFireAuth.onAuthStateChanged(user => {
      if (user && user.uid) {
        console.log('login');
        localStorage.setItem('user', JSON.stringify(user));
        this.loginStateChanged.next(true);
      } else {
        console.log('logout');
        localStorage.setItem('user', null);
        this.loginStateChanged.next(false);
      }
    });
  }

  async login(email: string, password: string): Promise<string> {
    return new Promise<string> ((resolve, reject) => {
      if (!this.hostConnectiontService.connection) {
        return reject('Login fehlgeschlagen! Es konnte Keine Verbindung hergestellt werden.');
      }
      if (!email || !password) {
        return reject('Login fehlgeschlagen! Bitte geben Sie die E-Mail und das Passwort ein.');
      }
      this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.router.navigate(['meetings']);
        this.pushService.registration();
        return resolve('Sie haben sich erfolgreich eingeloggt!');
      })
      .catch(() => {
        return reject('Login fehlgeschlagen!');
      });
    });
  }


  async register(email: string, password: string, repassword: string, forename: string, name: string): Promise<string> {
    return new Promise<string> ((resolve, reject) => {
      if (!this.hostConnectiontService.connection) {
        return reject('Login fehlgeschlagen! Es konnte Keine Verbindung hergestellt werden.');
      }
      if (!email || !password || !forename || !name) {
        return reject('Login fehlgeschlagen! Alle Felder müssen ausgefüllt werden');
      }
      if (password.length < 6) {
        return reject('Registrierung fehlgeschlagen! Das Passwort muss mindestens sechs Zeichen haben.');
      }
      if (password !== repassword) {
        return reject('Registrierung fehlgeschlagen! Die Passwörter müssen übereinstimmen.');
      }
      this.angularFireAuth.createUserWithEmailAndPassword(email, password)
      .then(credential => {
        this.dbauthService.createUser({publicInfo: {id: credential.user.uid, name, forename}})
        .then(() => {
          this.router.navigate(['meetings']);
          this.pushService.registration();
          return resolve('Registrierung war erfolgreich!');
        })
        .catch(err => {
          credential.user.delete();
          return reject(err);
        });
      })
      .catch(err => {
        return reject('Registrierung fehlgeschlagen!');
      });
    });
  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? true : false;
  }

  get loginStateObservable() {
    return this.loginStateChanged;
  }

  async logout(): Promise<string> {
    return new Promise<string> ((resolve, reject) => {
      if (!this.hostConnectiontService.connection) {
        return reject('Logout fehlgeschlagen! Sie haben keine Verbindung.');
      }
      this.pushService.logout()
      .then(() => this.dbauthService.logout())
      .then(() => this.angularFireAuth.signOut())
      .then(() => {
        this.router.navigate(['']);
        return resolve('Erfolgreich ausgeloggt!');
      })
      .catch(err => {
        return reject('Ausgeloggen fehlgeschlagen!');
      });
    });
  }

}

