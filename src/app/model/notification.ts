import { Message } from "./message"
import { UserInterface } from "./user-interface"

export interface Notification {
    id: number,
    title: string,
    message: Message,
    read: boolean,
    recipient: UserInterface
}
