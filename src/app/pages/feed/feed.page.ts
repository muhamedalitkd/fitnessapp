import { Component, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  @Input('expanded') expanded;
    user: any;
    userID: string;
    name: string;
    email: string
    phone: string
    videoLink: string;
    usersCollections: any;
    postsCollection: any;
    posts$: Observable<any[]>;

  constructor(private dom: DomSanitizer,
    private afs: AngularFirestore,
    private auth: AuthService) {
      this.usersCollections = this.afs.collection('user');
      this.postsCollection = this.afs.collection('posts');
    }

  ngOnInit() {
    // this.auth.user$.subscribe(user => {
    //   this.user = user
    //   console.log(user);
    // })

    this.auth.user$.subscribe(user => {
      this.userID = user.userID;
      this.name = user.userName;
      this.email = user.userEmail;
      this.phone = user.userPhone;
      this.videoLink = user.videoLink;
    })

    this.posts$ = this.getPosts().pipe(
      map((data: Array<{uploadedDate: string, description: string, title: string, userID: string, userName: string, videoLink: string;}>) =>
      data.sort((a, b) => a.uploadedDate <= b.uploadedDate ? -1 : 1).reverse()),
      tap(res => {
        console.log(res);
      })
    )
  }

  getUsers() {
    return this.usersCollections.valueChanges();
  }

  getPosts() {
    return this.postsCollection.valueChanges();
  }

  sanitizer(videoLink) {
    return this.dom.bypassSecurityTrustResourceUrl(videoLink);
  }
}
