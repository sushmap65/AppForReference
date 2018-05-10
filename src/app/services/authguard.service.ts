import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  // you would usually put this in it's own service and not access it directly!
  // this is just for the sake of the demo.
  public isLoggedIn: boolean = false;

  constructor(
    private router: Router
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }

}
