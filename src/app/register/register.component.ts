import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    const fullname = f.value.fullname;
    const username = f.value.username;
    const password = f.value.password;
    const email = f.value.email;
    if(f.valid){
      this.authSrv.signUp({fullname: fullname, username: username, password: password, email: email}).subscribe(data => console.log(f.value));
      this.router.navigate(["/login"]);
    }
  }

}
