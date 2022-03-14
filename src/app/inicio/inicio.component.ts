import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../models/Postagem';
import { Tema } from '../models/Tema';
import { Usuario } from '../models/Usuario';
import { AuthService } from '../services/auth.service';
import { PostagemService } from '../services/postagem.service';
import { TemaService } from '../services/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem();
  tema: Tema = new Tema();
  usuario: Usuario = new Usuario();

  id: number;
  listaTemas: Tema[];
  listaPostagens: Postagem[];
  idUsuario = environment.id;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    if (environment.token == '') {
      // alert("Sua seção expirou, faça login novamente.");
      this.router.navigate(["/entrar"]);
    }

    this.authService.refreshToken();
    this.getAllTema();
    this.getAllPostagem();
  }

  getAllTema() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.id).subscribe((resp: Tema) => {
      this.tema = resp;
    })
  }

  getAllPostagem() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    })
  }

  findByIdUsuario(){
    this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp;
    })
  }

  publicarPostagem() {
    this.tema.idTema = this.id;
    this.postagem.tema = this.tema;

    this.usuario.id = this.idUsuario;
    this.postagem.usuario = this.usuario;

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp;
      alert("Postagem realizada com sucesso!");
      this.postagem = new Postagem();
      this.getAllPostagem();
    })
  }

}
