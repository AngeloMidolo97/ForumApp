import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { Page, Post } from '../model/post';
import { Risposta } from '../model/risposta';
import { User } from '../model/user';
import { UserInterface } from '../model/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: User

  isLoggedin = new BehaviorSubject<boolean>(false);
  username = new BehaviorSubject<string>(localStorage.getItem('username')!)
  toggle = this.isLoggedin.asObservable();


  constructor(private http: HttpClient, private router: Router) { }


  signUp(user: {}) {
    return this.http.post("http://localhost:8081/auth/signup", user);
  }

  login(user: {}) {
    return this.http.post<User>("http://localhost:8081/auth/login", user).pipe(tap(data => {
      this.isLoggedin.next(true);
    }));
  }

  logOut() {
    this.isLoggedin.next(false);
    localStorage.removeItem('user')
    localStorage.removeItem('username')
    this.router.navigate(['/login'])
  }

  getData(page: number) {
    return this.http.get<Page>(`http://localhost:8081/post?page=${page}&size=10`);
  }

  getMyPost(id: number) {
    return this.http.get<Post[]>("http://localhost:8081/mypost?id=" + id);
  }

  getPostById(id: number) {
    return this.http.get<Post>("http://localhost:8081/post/id?id=" + id);
  }

  getRispostaPostById(id: number) {
    return this.http.get<Risposta[]>("http://localhost:8081/risposta?id=" + id);
  }

  rispostaPost(risposta: {}, id: number) {
    return this.http.post<Risposta[]>("http://localhost:8081/post/risposta?id=" + id, risposta);
  }

  getUserById(id: number) {
    return this.http.get<UserInterface>("http://localhost:8081/user/id?id=" + id);
  }

  getUserByUsername(username: string) {
    return this.http.get<UserInterface>("http://localhost:8081/user/?username=" + username)
  }

  getProfile() {
    return this.http.get<UserInterface>("http://localhost:8081/profile");
  }

  updateProfile(id: number, user: {}) {
    return this.http.put<UserInterface>("http://localhost:8081/profile/1?id=" + id, user);
  }

  createUser(expirationDate: Date, roles: string[], token: string, type: string, username: string) {
    this.user = new User(expirationDate, roles, token, type, username);
  }

  SearchBar(nome: string) {
    return this.http.get<Post[]>("http://localhost:8081/post/name?nome=" + nome)
  }

  createPost(post: {}) {
    return this.http.post<Post>("http://localhost:8081/post", post);
  }

  getByCategoria(categoria: string) {
    return this.http.get<Post[]>("http://localhost:8081/categoria?categoria=" + categoria)
  }

  like(id: number, like: {}) {
    return this.http.put("http://localhost:8081/like/" + id, like)
  }

  getTop3() {
    return this.http.get<Post[]>("http://localhost:8081/post/top3")
  }

  deletePost(id: number) {
    return this.http.delete("http://localhost:8081/post/" + id);
  }

  getAllUsers() {
    return this.http.get<UserInterface[]>("http://localhost:8081/user");
  }

  getAllUsersD() {
    return this.http.get<UserInterface[]>("http://localhost:8081/dashboard");
  }

  getLastUser() {
    return this.http.get<UserInterface[]>("http://localhost:8081/lastUser");
  }

  banUser(u: {}, id: number) {
    return this.http.put("http://localhost:8081/ban/" + id, u);
  }


}
