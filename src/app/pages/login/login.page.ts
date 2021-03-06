import { ForgotPasswordPage } from './../forgot-password/forgot-password.page';
import { ModalController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  userName: string;
  isAdmin: false;

  constructor(
    public modalCtrl: ModalController,
    private auth: AuthService,
    private toastr: ToastController
  ) { }

  ngOnInit() {
  }

  async forgotPassword() {
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  login() {
    if(this.userName && this.password) {
      this.auth.signIn(this.userName, this.password);
    } else {
      this.toast('Enter your email and password', 'warning');
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
