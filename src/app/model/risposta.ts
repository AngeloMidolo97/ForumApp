import { Post } from "./post"
import { User } from "./user"
import { UserInterface } from "./user-interface"

export interface Risposta {
    id: number
    title: string
    risposta: string
    dataPubb: Date
    likes: number
    post: Post
    user: UserInterface
}
