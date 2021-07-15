import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import firebase from 'firebase';
import { Post, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  post: Post = {
    id: '',
    description: '',
    title: '',
    uploadedDate: '',
    userID: '',
    userName: '',
    videoLink: '',
    expanded: false
  }
  public isAdmin = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private toastCtrl: ToastController,
    private router: Router,
    private dom: DomSanitizer,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.postService.getPost(id).subscribe(post => {
        this.post = post;
      })
    }

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .doc(`/user/${user.uid}`)
          .get()
          .then(userProfileSnapshot => {
            this.isAdmin = userProfileSnapshot.data().isAdmin;
          })
      }
    })
  }

  closeModal() {
    this.router.navigateByUrl('/home/feed');
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => {
      toast.present();
    })
  }

  deletePost() {
    this.postService.deletePost(this.post.id).then(() => {
      this.router.navigateByUrl('/home/feed');
      this.showToast('Post Deleted');
    }, err => {
      this.showToast('Could not delete your post');
    });
  }

  sanitizer(videoLink) {
    return this.dom.bypassSecurityTrustResourceUrl(videoLink);
  }
}
