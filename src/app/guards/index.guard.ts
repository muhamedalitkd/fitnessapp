import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstants } from '../config/auth-constants';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IndexGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      resolve(true);
      this.storageService.get(AuthConstants.AUTH).then(res => {
        if (res) {
          this.router.navigate(['/home']);
          resolve(false);
        } else {
          resolve(true);

        }
      }).catch(err => {
        resolve(false);
      })
    });
  }
}
