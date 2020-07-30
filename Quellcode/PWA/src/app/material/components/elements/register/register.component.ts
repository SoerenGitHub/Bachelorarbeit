import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import {
  trigger,
  style,
  animate,
  transition
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translate(30px, 0)' }),
        animate('250ms', style({ opacity: 1, transform: 'translate(0px, 0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translate(-30px, 0)' }),
        animate('250ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {

  @Input()
  onSubmit: EventEmitter<FormGroup> = new EventEmitter();

  authform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    repassword: new FormControl(''),
    forename: new FormControl(''),
    name: new FormControl(''),
  });


  constructor(private readonly router: Router) {
  }

  ngOnInit() {
  }

  authUser() {
    console.log('email: ', this.authform.controls.email.value);
    this.onSubmit.emit(this.authform);
  }

}
