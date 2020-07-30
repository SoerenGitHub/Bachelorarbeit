import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  keyframes
} from '@angular/animations';
import { Subject } from 'rxjs';
import { IUserInfo } from './iuser-info';

@Component({
  selector: 'app-addfriend',
  templateUrl: './addfriend.component.html',
  styleUrls: ['./addfriend.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', stagger('150ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ])
        )]), {optional: true}),
        query(':leave', stagger('150ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ])
        )]), {optional: true})
      ])
    ])
  ]
})
export class AddfriendComponent implements OnInit {

  @Input()
  isVisible: boolean = false;

  @Input()
  userInfos: IUserInfo[] = [];

  @Output()
  isVisibleCallback: Subject<boolean> = new Subject<boolean>();

  @Output()
  onSearch: EventEmitter<FormGroup> = new EventEmitter();

  @Output()
  onAddNewFriend: EventEmitter<any> = new EventEmitter();

  searchform = new FormGroup({
    name: new FormControl(''),
    forename: new FormControl('')
  });

  constructor() {

  }

  ngOnInit(): void {
  }

  searchUser(): void {
    this.onSearch.emit(this.searchform);
  }

  close() {
    this.searchform.reset();
    this.userInfos = null;
    this.isVisibleCallback.next(false);
  }

  addAsFriend(user: any): void {
    this.onAddNewFriend.emit(user);
  }
}
