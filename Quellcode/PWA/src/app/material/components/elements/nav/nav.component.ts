import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  marker = require('../../../assets/SVGs/menu_marker.svg');

  constructor(private readonly router: Router) {

  }

  markerposition() {
    switch (this.router.url) {
      case '/meetings':
        return 0;
        break;
      case '/friends':
        return 1;
        break;
      default:
        return -1;
        break;
    }
  }

  meetingsClick() {
    this.router.navigate(['meetings']);
  }

  friendsClick() {
    this.router.navigate(['friends']);
  }

  ngOnInit() {

  }

}
