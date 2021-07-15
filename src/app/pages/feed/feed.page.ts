import { ToastController } from '@ionic/angular';
import { PostService } from './../../services/post.service';
import { Component, Input, OnInit, QueryList, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Posts } from 'src/app/interfaces/posts';
import firebase from 'firebase';
import { Post } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  @Input('expanded') expanded;
    // user: any;
    // userID: string;
    // name: string;
    // email: string
    // phone: string
    // videoLink: string;
    usersCollections: any;
    postsCollection: any;
    // posts$: Observable<Posts[]>;

    //for delete function
    public posts: Observable<Post[]>

  constructor(private dom: DomSanitizer,
    private afs: AngularFirestore,
    private auth: AuthService,
    private postService: PostService,
    ) {
      this.usersCollections = this.afs.collection('user');
    }

  ngOnInit() {
    this.posts = this.postService.getPosts().pipe(
      map((data: Array<{uploadedDate: string, description: string, title: string, userID: string, userName: string, videoLink: string, expanded: boolean;}>) =>
      data.sort((a, b) => a.uploadedDate <= b.uploadedDate ? -1 : 1).reverse()),
      tap(res => {
        console.log(res);
      })
    );

    // this.auth.user$.subscribe(user => {
    //   this.userID = user.userID;
    //   this.name = user.userName;
    //   this.email = user.userEmail;
    //   this.phone = user.userPhone;
    //   this.videoLink = user.videoLink;
    // })
  }

  getUsers() {
    return this.usersCollections.valueChanges();
  }

  getPosts() {
    return this.postsCollection.valueChanges({ idField: 'postID' });
  }

  sanitizer(videoLink) {
    return this.dom.bypassSecurityTrustResourceUrl(videoLink);
  }
}
