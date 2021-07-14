import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  userID: string;
  name: string;
  email: string;
  phone: string;


  constructor(
    public modalCtrl: ModalController,
    private auth: AuthService,
    private afs: AngularFirestore,
    private loadginCtrl: LoadingController,
    private toastr: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.userID = user.userID;
      this.name = user.userName;
      this.email = user.userEmail;
      this.phone = user.userPhone;
    })
  }

  closeModal() {
    this.modalCtrl.dismiss();
}

  async update() {
    const loading = await this.loadginCtrl.create({
      message: 'Updating...',
      spinner: 'crescent',
      showBackdrop: true
    })

    loading.present();
    this.afs.collection('user').doc(this.userID).set({
      'userName': this.name,
      'userPhone': this.phone,
      'editAt': Date.now()
    },{merge: true})
    .then(() => {
      loading.dismiss();
      this.toast('Update success', 'success');
      // this.router.navigate(['/profile']);
    })
    .catch(error => {
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
