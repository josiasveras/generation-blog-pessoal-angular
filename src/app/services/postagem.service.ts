import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../models/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(private http: HttpClient) { 

  }

  // Passando o token no HttpHeader para liberar url´s de usuário logado
  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagens(): Observable<Postagem[]>{
     // URL local
     //return this.http.get<Postagem[]>("http://localhost:8080/postagem/buscar/tudo");

    // URL Heroku
    return this.http.get<Postagem[]>("https://blog-josias.herokuapp.com/postagem/buscar/tudo", this.token);
  }

  getByIdPostagem(id: number): Observable<Postagem>{
    // URL local
    // return this.http.get<Postagem>(`http://localhost:8080/postagem/buscar/${id}`, this.token);

    // URL Heroku
    return this.http.get<Postagem>(`https://blog-josias.herokuapp.com/postagem/buscar/${id}`, this.token);
  }

  postPostagem(postagem: Postagem): Observable<Postagem>{
    // URL local
    //return this.http.post<Postagem>("http://localhost:8080/postagem/salvar", postagem, this.token);

    // URL Heroku
    return this.http.post<Postagem>("https://blog-josias.herokuapp.com/postagem/salvar", postagem, this.token);
  }

  putPostagem(postagem: Postagem): Observable<Postagem>{
    // URL local
    // return this.http.put<Postagem>("http://localhost:8080/postagem/atualizar", postagem, this.token);

    // URL Heroku
    return this.http.put<Postagem>("https://blog-josias.herokuapp.com/postagem/atualizar", postagem, this.token);
  }

  deletePostagem(id: number){
    // URL local
    // return this.http.delete(`http://localhost:8080/postagem/deletar/${id}`, this.token);

    // URL Heroku
    return this.http.delete(`https://blog-josias.herokuapp.com/postagem/deletar/${id}`, this.token);
  }

}
