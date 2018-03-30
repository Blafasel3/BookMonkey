import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanNavigateToAdminGuard implements CanActivate {

  accessGranted = false;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (!this.accessGranted) {
      this.accessGranted = window.confirm('With great power comes great responsibility.');
    }
    return this.accessGranted;
  }
}
