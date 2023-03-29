import { AfterContentInit, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Page, Post } from '../model/post';
import { UserInterface } from '../model/user-interface';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  posts: Post[] = [];
  top3: Post[] = [];
  search!: string
  categorie: string[] = ["HARDWARE", "CODING", "VIDEOGAME", "SOFTWARE", "SMARTPHONE", "CRYPTO"];
  categoria!: string;
  usersList!: UserInterface[];
  lastUser!: UserInterface[];
  pageData!: Page;

  pageSwitch: boolean = true;


  constructor(private authSrv: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPosts(0);
    this.getTop3();
    this.getAllUser();
    this.getLastUser();
    this.categoria = this.route.snapshot.params['categoria'];
  }

  getPosts(page: number) {
    this.authSrv.getData(page).subscribe(data => {
      this.posts = data.content
      console.log(this.posts);
      this.pageData = data;
      console.log(data);
      this.pageSwitch = true;
    })
  }

  getPostsByTitle(page: number) {
    this.authSrv.getPostByTitle(page).subscribe(data => {
      this.posts = data.content
      console.log(this.posts);
      this.pageData = data;
      console.log(data);
      this.pageSwitch = true;
    })
  }

  getPostsByCategoria(page: number) {
    this.authSrv.getPostByCategoria(page).subscribe(data => {
      this.posts = data.content
      console.log(this.posts);
      this.pageData = data;
      console.log(data);
      this.pageSwitch = true;
    })
  }

  onSubmit(f: NgForm) {
    this.search = f.value.search
    this.authSrv.SearchBar(this.search).subscribe(data => {
      this.posts = data;
    })
  }

  getTop3() {
    this.authSrv.getTop3().subscribe(data => {
      this.top3 = data;
    })
  }

  getPostCategory(item: string) {
    this.authSrv.getByCategoria(item).subscribe(data => {
      this.posts = data;
      this.pageSwitch = false;
    })
  }

  getAllUser() {
    this.authSrv.getAllUsers().subscribe(data => {
      this.usersList = data;
    })
  }

  getLastUser(){
    this.authSrv.getLastUser().subscribe(data => {
      this.lastUser = data;
      console.log("last user " + this.lastUser);
    })
  }

  isLogged() {
    return localStorage.getItem('user');
  }
}
