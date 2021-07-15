import { AuthGuard } from './../guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexPage } from './index.page';

const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    children: [
      {
        path: '',
        loadChildren: () => import('../pages/welcome/welcome.module').then(m => m.WelcomePageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'signup',
        loadChildren: () => import('../pages/signup/signup.module').then(m => m.SignupPageModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('../pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
        ,canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then( m => m.ProfilePageModule)
        ,canActivate: [AuthGuard]
      },
      {
        path: 'profile-edit',
        loadChildren: () => import('../pages/profile-edit/profile-edit.module').then( m => m.ProfileEditPageModule)
        ,canActivate: [AuthGuard]
      },
      {
        path: 'post/:id',
        loadChildren: () => import('../pages/post/post.module').then( m => m.PostPageModule)
        ,canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/home/feed',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule { }
