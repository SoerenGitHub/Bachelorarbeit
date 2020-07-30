import { InformationService } from './../../services/information.service';
import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { IInformation } from '../../interfaces/iinformation';


@Component({
  selector: 'app-userinformation',
  templateUrl: './userinformation.component.html',
  styleUrls: ['./userinformation.component.scss'],
  animations:[
    trigger('visibilityChanged', [
      transition(':enter', [
          style({ opacity: 0, transform: 'translateY(-40px)' }),
          animate(300, style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
          style({ opacity: 1, transform: 'translateY(0)' }),
          animate(600, style({ opacity: 0, transform: 'translateY(-40px)'}))
      ])
    ])
  ]
})
export class UserinformationComponent implements OnInit {

  private information: IInformation;

  constructor(private readonly informationService: InformationService) {}

  get info() {
    return this.information;
  }

  async ngOnInit() {
    this.informationService.informationObservable.subscribe(async info => {
      this.information = info;
    });
  }
}
