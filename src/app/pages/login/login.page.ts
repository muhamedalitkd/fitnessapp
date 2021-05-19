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

  public postData = {
    username: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  valiateInputs() {
    let username = this.postData.username.trim();
    let password = this.postData.username.trim();

    return (this.postData.username && this.postData.password && username.length > 0 && password.length > 0);

  }

  loginAction() {
    if (this.valiateInputs()) {
      this.authService.login(this.postData).subscribe((res: any) =>{
        if(res.userData) {
          this.storageService.store(AuthConstants.AUTH, res.userData);
          this.router.navigate(['/home']);
        } else {
          this.toastService.presentToast('Incorrect username or password');
        }
      },
      (error: any) => {
        this.toastService.presentToast("Network connection error");
      }
      )
    } else {
      this.toastService.presentToast("Please give some information");
    }
  }

}
