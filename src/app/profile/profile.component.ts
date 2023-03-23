import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../model/post';
import { UserInterface } from '../model/user-interface';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  id!: number
  myPosts: Post[] = [];
  profile!: UserInterface;
  username!: string

  loggedUser!: UserInterface;

  constructor(private authSrv: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getMyPost();
    this.getProfile();
    this.loggedUser = JSON.parse(localStorage.getItem('user')!)
  }

  getMyPost() {
    this.authSrv.getMyPost(this.id).subscribe(data => {
      this.myPosts = data;
    })
  }

  getProfile() {
    this.authSrv.getUserById(this.id).subscribe(data => {
      this.profile = data;
    })
  }

  onSubmit(f: NgForm) {
    const title = f.value.title;
    const descrizione = f.value.descrizione;
    const imgUrl = f.value.imgUrl
    const categoria = f.value.categoria

    if (f.valid) {
      this.authSrv.createPost({ title: title, descrizione: descrizione, imgUrl: imgUrl, categoria: categoria }).subscribe(data => console.log(f.value));
      this.router.navigate(["/forum"]);
    }
  }

  checkLogged() {
    if(this.loggedUser.username == this.profile.username) {
      return true;
    } else {
      return false;
    }
  }

}
