import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  examplepic = require('../../../assets/SVGs/examplepicture.svg');

  @Input()
  friend: any;

  @Output()
  onDeleteFriend: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
  }

  deleteFriend() {
    this.onDeleteFriend.emit(this.friend);
  }
}
