import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) { }

  user!: User

  errorMessage!: string

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    const username = f.value.username;
    const password = f.value.password;

    this.authSrv.login({ username: username, password: password }).subscribe(data => {
      console.log(data);
      this.user = data;
      this.authSrv.createUser(data.expirationDate, data.roles, data.token, data.type, data.username);
      localStorage.setItem('user', JSON.stringify(this.authSrv.user))

      localStorage.setItem('username', this.authSrv.user.username)

      this.authSrv.username.next(localStorage.getItem('username')!);

      this.router.navigate(["/forum"])
    },
    err => {
      this.errorMessage = err.message;
      console.log(this.errorMessage);
    });
  }

}
