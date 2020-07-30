import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DBFriendsService } from './../../data/services/dbfriends.service';
import { InformationService } from './../../information/services/information.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-friend-root',
  templateUrl: './friend-root.component.html',
  styleUrls: ['./friend-root.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', stagger('150ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ])
        )]), {optional: true})
      ])
    ])
  ]
})
export class FriendRootComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth >= 550) {
      this.router.navigate(['overview']);
    }
  }

  friends: any[];
  friendRequests: any[];
  findUser: any[];
  isVisible: boolean;

  constructor(private readonly informationService: InformationService,
              private readonly dbfriendsService: DBFriendsService,
              private readonly router: Router) { }

  ngOnInit() {
    this.friends = [];
    this.friendRequests = [];
    this.updateFriendRequests();
    this.updateFriends();
  }

  private updateFriends(): void {
    this.dbfriendsService.friendsAsUser.subscribe(update => {
      this.friends = update;
    });
  }

  private updateFriendRequests(): void {
    this.dbfriendsService.requestedFriendsAsUser.subscribe(update => {
      this.friendRequests = update;
    });
  }

  showOverlay(): void {
    this.isVisible = true;
  }

  setIsVisible(isVisible: boolean): void {
    this.isVisible = isVisible;
  }

  search(userdata: FormGroup): void {
    this.dbfriendsService.findNewFriends(userdata.value.name, userdata.value.forename)
    .then(findUser => {
      this.findUser = findUser;
      this.informationService.newInformation({information: 'Suche war erfolgreich!', error: false});
    })
    .catch(err =>  this.informationService.newInformation({information: err, error: true}));
  }

  addNewFriend(newFriend: any): void {
    this.dbfriendsService.sendFriendRequest(newFriend.id)
    .then(msg => this.informationService.newInformation({information: msg, error: false}))
    .catch(err => this.informationService.newInformation({information: err, error: true}));
  }

  approveFriendRequest(newFriend: any): void {
    this.dbfriendsService.approveFriendRequest(newFriend.publicInfo.id)
    .then(msg => this.informationService.newInformation({information: msg, error: false}))
    .catch(err => this.informationService.newInformation({information: err, error: true}));
  }

  deleteFriend(friend: any): void {
    this.dbfriendsService.deleteFriend(friend.publicInfo.id)
    .then(msg => this.informationService.newInformation({information: msg, error: false}))
    .catch(err => this.informationService.newInformation({information: err, error: true}));
  }

}
