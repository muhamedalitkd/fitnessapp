import { Component, OnInit, QueryList, ViewChild } from '@angular/core';
import data from './feed.json';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
    user: any;
    userID: string;
    name: string;
    email: string
    phone: string
    videoLink: string;
    usersCollections: any;
    posts$: Observable<any[]>;

  constructor(private dom: DomSanitizer,
    private afs: AngularFirestore,
    private auth: AuthService) {
      this.usersCollections = this.afs.collection('user');
    }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user
      console.log(user);
    })

    this.auth.user$.subscribe(user => {
      this.userID = user.userID;
      this.name = user.userName;
      this.email = user.userEmail;
      this.phone = user.userPhone;
      this.videoLink = user.videoLink;
    })

    this.posts$ = this.getUsers().pipe(
      tap(res => {
        console.log(res);
      })
    )
  }

  getUsers() {
    return this.usersCollections.valueChanges();
  }

  sanitizer(videoLink) {
    return this.dom.bypassSecurityTrustResourceUrl(videoLink);
  }
}
