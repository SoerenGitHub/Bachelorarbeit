import { AuthService } from './../../auth-service/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService  implements CanActivate {

  constructor(private readonly authService: AuthService,
              private readonly router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService || this.authService && !this.authService.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['meetings']);
      return false;
    }
  }
}
