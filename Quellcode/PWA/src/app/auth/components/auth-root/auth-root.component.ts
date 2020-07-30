import { AuthService } from './../../../auth-service/services/auth.service';
import { InformationService } from './../../../information/services/information.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-root',
  templateUrl: './auth-root.component.html',
  styleUrls: ['./auth-root.component.scss']
})
export class AuthRootComponent implements OnInit {

  logo = require('../../assets/SVGs/logo.svg');

  constructor(private readonly informationService: InformationService,
              private readonly authService: AuthService) { }

  ngOnInit() {
  }

  login(loginData: FormGroup) {
    this.authService.login(loginData.value.email, loginData.value.password)
    .then(msg => this.informationService.newInformation({information: msg, error: false}))
    .catch(err => this.informationService.newInformation({information: err, error: true}));
  }

  register(registerData: FormGroup) {
    this.authService.register (
      registerData.value.email,
      registerData.value.password,
      registerData.value.repassword,
      registerData.value.forename,
      registerData.value.name
    )
    .then(msg => this.informationService.newInformation({information: msg, error: false}))
    .catch(err => this.informationService.newInformation({information: err, error: true}));
  }

}
