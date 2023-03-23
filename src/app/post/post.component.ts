import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppComponent } from '../app.component';
import { Post } from '../model/post';
import { Risposta } from '../model/risposta';
import { UserInterface } from '../model/user-interface';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  id!: number
  post!: Post
  loggedUser!: UserInterface;
  risposta: Risposta[] = [];
  likes: UserInterface[] = [];

  top3: Post[] = [];
  categorie: string[] = ["HARDWARE", "CODING", "VIDEOGAME", "SOFTWARE", "SMARTPHONE", "CRYPTO"];


  constructor(private authSrv: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getPost(this.id);
    this.getRisposta(this.id);
    this.loggedUser = JSON.parse(localStorage.getItem('user')!)
    this.getTop3();
  }


  getRisposta(id: number) {
    this.authSrv.getRispostaPostById(id).subscribe(ris => {
      console.log(ris);
      this.risposta = ris;
    })
  }

  getPost(id: number) {
    this.authSrv.getPostById(id).subscribe(data => {
      console.log(data);
      this.post = data;
      this.likes = data.likes
    })
  }

  getPost2(id: number) {
    this.router.navigate(['/post/', id])
    this.getPost(id);
    this.getRisposta(id);
  }

  onSubmit(f: NgForm) {
    const risp = f.value.risposta;
    const title = f.value.title;
    this.authSrv.rispostaPost({title: title, risposta: risp}, this.id).subscribe(data => {
      this.risposta = data;
      this.getRisposta(this.id);
    })
  }

  like() {
    this.authSrv.like(this.id, {}).subscribe(data => {
      console.log(data);
      this.getPost(this.id);
    })
  }

  deletePost() {
    this.authSrv.deletePost(this.id).subscribe(data => {
      console.log(data);
      console.log("post eliminito");
      /* this.router.navigate(['/forum']) */
    })
  }

  checkLogged() {
    if(this.loggedUser.username == this.post.user.username) {
      return true;
    } else {
      return false;
    }
  }

  getTop3() {
    this.authSrv.getTop3().subscribe(data => {
      this.top3 = data;
    })
  }

}
