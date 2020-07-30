import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [
    trigger('overlayAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1}),
        animate('250ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class OverlayComponent implements OnInit {

  @Input()
  isVisible: boolean;

  constructor() { }

  ngOnInit() {
    this.isVisible = false;
  }
}
