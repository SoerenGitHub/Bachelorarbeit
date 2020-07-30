import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  examplepic = require('../../../assets/SVGs/examplepicture.svg');

  @Input()
  user: any;

  @Output()
  onAddAsFriend: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
  }

  addAsFriend() {
    if (this.user) {
      this.onAddAsFriend.emit(this.user);
    }
  }

}
