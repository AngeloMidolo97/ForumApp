import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatMessageDto } from '../model/chat-message-dto';
import { WebSocketService } from '../service/web-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(public webSocketSrv: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketSrv.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketSrv.closeWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    const chatMessageDto = new ChatMessageDto(sendForm.value.user, sendForm.value.message);
    this.webSocketSrv.sendMessage(chatMessageDto);
    sendForm.controls['message'].reset();
  }

}
