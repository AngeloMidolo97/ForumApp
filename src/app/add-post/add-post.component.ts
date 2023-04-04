import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  path!: string;

  url!: string;

  constructor(private authSrv: AuthService,
    private router: Router, private af: AngularFireStorage) { }

  ngOnInit(): void {

  }



  upload($event: any) {
    this.path = $event.target.files[0]
  }
  uploadImage() {
    console.log(this.path);
    this.af.upload("/file" + this.path, this.path).then(d => {
      d.ref.getDownloadURL().then(data => {
        this.url = data;
        console.log(this.url);
      })
    })
  }

  onSubmit(f: NgForm) {
    console.log(this.path);
    if (this.path) {
      this.af.upload("/file" + this.path, this.path).then(d => {
        d.ref.getDownloadURL().then(data => {
          this.url = data;
          console.log(this.url)

          const title = f.value.title;
          const descrizione = f.value.descrizione;
          const categoria = f.value.categoria
          const img = this.url;
          this.authSrv.createPost({
            title: title,
            descrizione: descrizione,
            categoria: categoria,
            imgUrl: img
          }).subscribe(data => console.log(data));
          this.router.navigate(['/home'])
        })
      }

      )
    } else {
      this.af.upload("/file" + this.path, this.path).then(d => {
        d.ref.getDownloadURL().then(data => {
          this.url = data;
          console.log(this.url)

          const title = f.value.title;
          const descrizione = f.value.descrizione;
          const categoria = f.value.categoria
          const img = this.url;
          this.authSrv.createPost({
            title: title,
            descrizione: descrizione,
            categoria: categoria
          }).subscribe(data => console.log(data));
          this.router.navigate(['/home'])
        })
      }

      )
    }
  }
}
