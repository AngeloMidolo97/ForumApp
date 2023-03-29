import { UserInterface } from "./user-interface"

export interface Message {
    id: number
    date: Date
    message: string
    sender: UserInterface
    recipient: UserInterface
}
