import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenTrackerService {

  constructor() { }

  private track() {
    const width = window.screen.width
  }
}
