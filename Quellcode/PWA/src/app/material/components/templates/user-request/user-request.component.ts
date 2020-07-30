import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-request',
  templateUrl: './user-request.component.html',
  styleUrls: ['./user-request.component.scss']
})
export class UserRequestComponent implements OnInit {

  examplepic = require('../../../assets/SVGs/examplepicture.svg');

  @Input()
  requestedUser: any;

  @Output()
  onApproveFriendRequest: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addAsFriend() {
   this.onApproveFriendRequest.emit(this.requestedUser);
  }

}
