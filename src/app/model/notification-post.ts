import { Post } from "./post";
import { Risposta } from "./risposta";
import { UserInterface } from "./user-interface";

export interface NotificationPost {
    id: number,
    title: string,
    post: Post,
    read: boolean,
    recipient: UserInterface
}
