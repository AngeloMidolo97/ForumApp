import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { Post } from '../model/post';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  /* image!: File; */



  constructor(private authSrv: AuthService,
    private router: Router) { }

  ngOnInit(): void {

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

  /* onFileSelected(event: any) {
    if(event.target.files) {
      this.image = event.target.files;
    }
  } */

}
