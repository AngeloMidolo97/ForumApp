import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Message } from '../model/message';
import { UserInterface } from '../model/user-interface';
import { AuthService } from '../service/auth.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  sentMessage: Message[] = [];
  receivedMessage: Message[] = [];

  messages: Message[] = [];

  id!: number

  loggedUser!: UserInterface;

  receiverUser!: UserInterface

  sender!: boolean;

  constructor(private authSrv: AuthService, private messageSrv: MessageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getAllMessages();
    this.getLoggedUser();
    this.getUserById();
  }

  getSentMessage() {
    this.messageSrv.getSentMessage(this.id).subscribe(data => {
      this.sentMessage = data;
      console.log(data);

    })
  }

  getReceivedMessage() {
    this.messageSrv.getReceivedMessage(this.id).subscribe(data => {
      this.receivedMessage = data;
      console.log(data);

    })
  }

  getAllMessages() {
    this.messageSrv.getAllMessages(this.id).subscribe(data => {
      this.messages = data;
      console.log(data);
    })
  }

  onSubmit(f: NgForm) {
    const message = f.value.message
    this.messageSrv.postSendMessage(this.id, {message: message}).subscribe(data => {
      console.log(data);
      this.getAllMessages();
    })
  }

  getLoggedUser() {
    this.authSrv.getProfile().subscribe(data => {
      console.log(data);
      this.loggedUser = data;
    })
  }

  getUserById() {
    this.authSrv.getUserById(this.id).subscribe(data => {
      this.receiverUser = data;
    })
  }

}
