import { ToastController } from '@ionic/angular';
import { ToastService } from './../../services/toast.service';
import { AuthConstants } from './../../config/auth-constants';
import { StorageService } from './../../services/storage.service';
import { Router } from '@angular/router';
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

  constructor(
    private auth: AuthService,
    private toastr: ToastController
  ) { }

  ngOnInit() {
  }

  login() {
    if(this.email && this.password) {
      this.auth.signIn(this.email, this.password);
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
