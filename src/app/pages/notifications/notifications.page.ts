import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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

  ) { }

  ngOnInit() {
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
    this.afs.collection('user').doc(this.userID).set(
      {'videoLink': this.videoLink}, {merge: true}).then(() => {
      console.log("The link is added " + this.userID);
      return null;
    })
  }

}
