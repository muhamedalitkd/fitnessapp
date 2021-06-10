import { Router } from '@angular/router';
import { ToastController, LoadingController, ModalController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  email: string;


  constructor(
    public modalCtrl: ModalController,
    private afauth: AngularFireAuth,
    private toastr: ToastController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
}

  async resetPassword() {
    if (this.email) {
      const loading = await this.loadingCtrl.create({
        message: 'Sending the link...',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();

      this.afauth.sendPasswordResetEmail(this.email)
      .then(() => {
        loading.dismiss();
        this.toast('Please, check your email', 'success');
        this.router.navigate[('/login')];
      })
        .catch((error) => {
          loading.dismiss();
          this.toast(error.message, 'danger');
        })
    } else {
      this.toast('Please, enter your email address', 'danger');
    }
  }

  async toast(message, status) {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 2000
    });

    toast.present();
  }
}
