import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserService} from './auth.postservice';

@Injectable()
export class AuthGuard  implements CanActivate{

  constructor(private authservice: UserService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isauth = this.authservice.getisauth();
    if (!isauth) {
      this.router.navigate(['/login']);
    }
    return isauth;
  }

}

