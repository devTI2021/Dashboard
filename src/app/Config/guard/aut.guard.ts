import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService} from '../../Service/Session/session.service'
@Injectable({
  providedIn: 'root'
})
export class AutGuard implements CanActivate {

  constructor( private session: SessionService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log(this.session.isUserLoggedIn() );
    if (this.session.isUserLoggedIn()) {
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
