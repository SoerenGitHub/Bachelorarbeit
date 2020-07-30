import { InformationService } from './information/services/information.service';
import { AuthService } from './auth-service/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PWA';

  private logoutClicked: boolean = false;

  constructor(private readonly authService: AuthService,
              private readonly informationService: InformationService){}

  logout(): void {
    if (!this.logoutClicked) {
      this.logoutClicked = true;
      this.authService.logout()
      .then(msg => {
        this.informationService.newInformation({information: msg, error: false});
        this.logoutClicked = false;
      })
      .catch(err => {
        this.informationService.newInformation({information: err, error: true});
        this.logoutClicked = false;
      });
    } else {
      this.informationService.newInformation({information: 'Sie werden ausgeloggt! Bitte warten.', error: true});
    }

  }
}

