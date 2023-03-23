import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../model/post';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  posts: Post[] = [];
  search!: string
  categoria!: string;

  constructor(private authSrv: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoria = this.route.snapshot.params['categoria'];
    this.getPost();
  }

  getPost() {
    this.authSrv.getByCategoria(this.categoria).subscribe(data => {
      this.posts = data;
    })
  }

  onSubmit(f: NgForm) {
    this.search = f.value.search
    this.authSrv.SearchBar(this.search).subscribe(data => {
      this.posts = data;
    })
  }

}
