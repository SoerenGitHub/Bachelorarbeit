import { IInformation } from '../interfaces/iinformation';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class InformationService {

  private static information: Subject<IInformation>;

  constructor() {
    if (!InformationService.information) {
      InformationService.information = new Subject<IInformation>();
    }
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  get informationObservable(): Observable<IInformation> {
    return InformationService.information;
  }

  async newInformation(info: IInformation) {
    InformationService.information.next(info);
    await this.delay(5000);
    InformationService.information.next(null);
  }
}
