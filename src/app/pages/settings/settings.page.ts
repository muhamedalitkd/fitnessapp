import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

   logout() {
     this.auth.signOut();
   }

   viewProfile() {
    this.router.navigate(['/profile']);
   }
  // logoutAction() {
  //   this.authService.logout();
  // }
}
