import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output()
  onLogout: EventEmitter<void> = new EventEmitter();

  logo = require('../../../assets/SVGs/logo.svg');
  title = [
    'Fehler',
    'Termine deiner Freunde',
    'Deine Freunde',
    'Deine Freunde und Termine'
  ]

  constructor(private router: Router) { }

  ngOnInit() {

  }

  markerposition() {
    switch (this.router.url) {
      case '/meetings':
        return 1;
        break;
      case '/friends':
        return 2;
        break;
      case '/overview':
        return 3;
        break;
      default:
        return 0;
        break;
    }
  }

  logout() {
    this.onLogout.emit();
  }
}
