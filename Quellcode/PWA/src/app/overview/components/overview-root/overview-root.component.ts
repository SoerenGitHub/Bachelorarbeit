import { Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-overview-root',
  templateUrl: './overview-root.component.html',
  styleUrls: ['./overview-root.component.scss']
})
export class OverviewRootComponent implements OnInit {

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 550) {
      this.router.navigate(['meetings']);
    }
  }

  constructor(private readonly router: Router) { }

  ngOnInit() {
  }

}
