import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { Posts } from 'src/app/interfaces/posts';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  userID: string;
  name: string;
  email: string;
  phone: string;
  videoLink: string;
  user: any;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private loadginCtrl: LoadingController,
    private toastr: ToastController,
  ) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.auth.user$.subscribe(user => {
      this.userID = user.userID;
      this.name = user.userName;
      this.email = user.userEmail;
      this.phone = user.userPhone;
    })
    this.auth.user$.subscribe(user => {
      this.user = user
      console.log(user);
    })
  }

  async upload() {
    const loading = await this.loadginCtrl.create({
      message: 'Uploading...',
      spinner: 'crescent',
      showBackdrop: true
    })

    loading.present();
    this.afs.collection('user').doc(this.userID).set(
      {'videoLink': this.videoLink}, {merge: true}).then(() => {
      console.log("The link is added " + this.userID);
      return null;
    }).then(() => {
      loading.dismiss();
      this.toast('Upload success', 'success');
    }).catch(error => {
      loading.dismiss();
      this.toast(error.message, 'danger');
    })
  };

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
