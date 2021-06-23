import { ProfilePage } from './../profile/profile.page';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  birthDate: any;
  userID: string;

  constructor(
    public modalCtrl: ModalController,
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.userID = user.userID;
    })
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

  submit() {
    this.afs.collection('user').doc(this.userID).set({
      'birthDate': this.birthDate
    }, {merge : true})
  }
}
