import { ProfilePage } from './../profile/profile.page';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    public modalCtrl: ModalController,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

   logout() {
     this.auth.signOut();
   }

   async viewProfile() {
    const modal = await this.modalCtrl.create({
      component: ProfilePage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
