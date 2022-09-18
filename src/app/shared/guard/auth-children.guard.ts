import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthChildrenGuard implements CanActivateChild {
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }
  canActivateChild(route: ActivatedRouteSnapshot,
                      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean
                                                    | UrlTree> | boolean | UrlTree {
    if(!this.authService.isLoggedIn) {
      this.router.navigate(['auth'])
    }
    return true;
  }

}
