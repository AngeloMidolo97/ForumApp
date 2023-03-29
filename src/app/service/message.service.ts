import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../model/message';
import { Notification } from '../model/notification';
import { NotificationPost } from '../model/notification-post';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getSentMessage(id: number) {
    return this.http.get<Message[]>("http://localhost:8081/chat/sent?rec_id=" + id);
  }

  getReceivedMessage(id: number) {
    return this.http.get<Message[]>("http://localhost:8081/chat/received?sender_id=" + id);
  }

  postSendMessage(id: number, message: {}) {
    return this.http.post<Message>("http://localhost:8081/chat/" + id, message);
  }

  getAllMessages(id: number) {
    return this.http.get<Message[]>("http://localhost:8081/chat/all?rec_id=" + id);
  }

  getNotification() {
    return this.http.get<Notification[]>("http://localhost:8081/notifications/unread");
  }

  readMessage(id: number, {}) {
    return this.http.put<Notification[]>("http://localhost:8081/notifications/" + id, {});
  }

  //NOTIFICATION POST

  getNotificationPost() {
    return this.http.get<NotificationPost[]>("http://localhost:8081/notification_post/unread");
  }

  readNotificationPost(id: number, {}) {
    return this.http.put<NotificationPost[]>("http://localhost:8081/notification_post/" + id, {});
  }
}
