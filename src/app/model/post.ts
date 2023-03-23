import { Risposta } from "./risposta";
import { UserInterface } from "./user-interface";

export interface Post {
    id: number;
    title: string;
    descrizione: string;
    miPiace: number;
    user: UserInterface;
    imgUrl: string;
    dataPubb: Date;
    categoria: string;
    risposte: Risposta[]
    likes: UserInterface[]
}

export interface Page {
    content:          Post[];
    totalPages:       number;
    totalElements:    number;
    last:             boolean;
    size:             number;
    number:           number;
    numberOfElements: number;
    first:            boolean;
    empty:            boolean;
}
