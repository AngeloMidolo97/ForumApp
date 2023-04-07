import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, interval, Observable, repeat, startWith, Subscription, switchMap, timeInterval } from 'rxjs';
import { Notification } from './model/notification';
import { NotificationPost } from './model/notification-post';
import { User } from './model/user';
import { UserInterface } from './model/user-interface';
import { Username } from './model/username';
import { AuthService } from './service/auth.service';
import { MessageService } from './service/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Forum';

  loginStatus$!: Observable<boolean>;
  username$!: Observable<string>;

  profile!: UserInterface

  user!: UserInterface
  isAdminB!: boolean;

  chatNotification: Notification[] = [];
  postNotification: NotificationPost[] = [];

  timeInterval!: Subscription

  timeInterval2!: Subscription


  constructor(private authSrv: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private messageSrv: MessageService) { }

  ngOnInit(): void {
    this.getProfile();
    this.getNotifications();
    this.getNotificationsPost();
    this.loginStatus$ = this.authSrv.isLoggedin.asObservable();
    this.username$ = this.authSrv.username.asObservable();


    //POLLING CON RXJS
    this.timeInterval = interval(3000).pipe(
      startWith(0),
      switchMap(() => this.messageSrv.getNotification())
    ).subscribe(data => this.chatNotification = data)

    this.timeInterval2 = interval(3000).pipe(
      startWith(0),
      switchMap(() => this.messageSrv.getNotificationPost())
    ).subscribe(data => this.postNotification = data)


    if (localStorage.getItem('user')) {
      this.authSrv.isLoggedin.next(true);
      this.authSrv.username.next(localStorage.getItem("username")!)
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

  getNotifications() {
    this.messageSrv.getNotification().subscribe(data => {
      console.log(data);
      this.chatNotification = data;
    })
  }

  readMessage(id: number) {
    this.messageSrv.readMessage(id, {}).subscribe(data => {
      console.log(data);
    })
  }

  //NOTIFICATION POST

  getNotificationsPost() {
    this.messageSrv.getNotificationPost().subscribe(data => {
      console.log(data);
      this.postNotification = data;
    })
  }

  readNotificationPost(id: number) {
    this.messageSrv.readNotificationPost(id, {}).subscribe(data => {
      console.log(data);
    })
  }


}
