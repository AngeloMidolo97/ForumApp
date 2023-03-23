import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ChatComponent } from './chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ForumComponent } from './forum/forum.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: LandingComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "forum",
    component: ForumComponent
  },
  {
    path: "forum/:categoria",
    component: ForumComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: "addPost",
    component: AddPostComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: "profile/:id",
    component: ProfileComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: "post/:id",
    component: PostComponent
  },
  {
    path: "editProfile/:id",
    component: EditProfileComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: "chat",
    component: ChatComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [
      AuthGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
