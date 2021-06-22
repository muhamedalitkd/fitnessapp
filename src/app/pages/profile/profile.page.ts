import { ProfileEditPage } from './../profile-edit/profile-edit.page';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;


  constructor(
    public modalCtrl: ModalController,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user
      console.log(user);
    })
  }

  closeModal() {
    this.modalCtrl.dismiss();
}

  async editProfile() {
    const modal = await this.modalCtrl.create({
      component: ProfileEditPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
