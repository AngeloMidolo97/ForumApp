import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../model/user-interface';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users: UserInterface[] = [];

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authSrv.getAllUsersD().subscribe(data => {
      this.users = data;
    })
  }

  banUser(id: number) {
    this.authSrv.banUser({} ,id).subscribe(data => {
      console.log(data);
      this.getUser();
    })
  }

}
