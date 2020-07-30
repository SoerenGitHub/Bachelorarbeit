import { InformationService } from './../../information/services/information.service';
import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostConnectiontService {
  private hostConnectionObserver: Subject<boolean>;
  private hostConnection: boolean;

  constructor(private readonly connectionService: ConnectionService,
              private readonly informationService: InformationService) {
    this.hostConnectionObserver = new Subject<boolean>();
    this.hostConnection = navigator.onLine;
    this.hostConnectionObserver.next(navigator.onLine);
    this.observeInternetConnection();
    this.userConnectionInformation();
  }

  get connectionObservable(): Observable<boolean> {
    return this.hostConnectionObserver;
  }

  get connection() {
    return this.hostConnection;
  }

  private observeInternetConnection(): void {
    this.connectionService.monitor().subscribe(isConnected => {
      if (!isConnected) {
        this.hostConnection = false;
        this.hostConnectionObserver.next(false);
      } else {
        this.hostConnection = true;
        this.hostConnectionObserver.next(true);
      }
    });
  }

  private userConnectionInformation() {
    this.hostConnectionObserver.subscribe(res => {
      if (res === false) {
        this.informationService.newInformation({information: 'Verbindung wurde unterbrochen!', error: true});
      } else {
        this.informationService.newInformation({information: 'Verbindung ist wieder hergestellt!', error: false});
      }
    });
  }

  public noConnection(): void {
    if (this.hostConnection) {
      this.hostConnection = false;
      this.hostConnectionObserver.next(false);
    }
  }

  public connectionOK(): void {
    if (!this.hostConnection) {
      this.hostConnection = true;
      this.hostConnectionObserver.next(true);
    }
  }
}
