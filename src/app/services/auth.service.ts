import { AuthConstants } from './../config/auth-constants';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router) { }

    login(postDate: any): Observable<any> {
      return this.httpService.post('login', postDate);
    }

    signUp(postDate: any): Observable<any> {
      return this.httpService.post('signup', postDate);
    }

    logout() {
      // this.storageService.clear();
      this.storageService.removeItem(AuthConstants.AUTH).then(res => {
        this.router.navigate(['']);
      })
    }
}
