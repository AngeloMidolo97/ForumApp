import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Observable } from 'rxjs';
import { User } from './model/user';
import { UserInterface } from './model/user-interface';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'JWT-LOGIN';

  loginStatus$!: Observable<boolean>;
  username$!: Observable<string>;

  profile!: UserInterface

  user!: UserInterface
  isAdminB!: boolean;

  constructor(private authSrv: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProfile();
    this.loginStatus$ = this.authSrv.isLoggedin.asObservable();
    this.username$ = this.authSrv.username.asObservable();

    if (localStorage.getItem('user')) {
      this.authSrv.isLoggedin.next(true);
    }
  }

  getProfile() {
    this.authSrv.getProfile().subscribe(data => {
      this.user = data;
    })
  }

  logout() {
    this.authSrv.logOut();
    localStorage.removeItem('user')
  }

  isLogged() {
    return localStorage.getItem('user');
  }

  isAdmin() {
    this.user?.roleList.forEach(i => {
      if (i.name == "ROLE_ADMIN") {
        return this.isAdminB = true;
      } else {
        return null;
      }
    })
    return this.isAdminB
  }


}
