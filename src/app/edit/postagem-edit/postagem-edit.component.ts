import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/models/Postagem';
import { Tema } from 'src/app/models/Tema';
import { PostagemService } from 'src/app/services/postagem.service';
import { TemaService } from 'src/app/services/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem();

  tema: Tema = new Tema();
  listaTemas: Tema[];
  id: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }

  ngOnInit() {

    window.scroll(0,0);

    if (environment.token == '') {
      // alert("Sua seção expirou, faça login novamente.");
      this.router.navigate(["/entrar"]);
    }

    let id = this.route.snapshot.params["id"];
    this.findByIdPostagem(id);
    this.findAllTemas();

  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => {
      this.postagem = resp;
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.id).subscribe((resp: Tema) => {
      this.tema = resp;
    })
  }

  findAllTemas(){
    this.temaService.getAllTemas().subscribe((resp:Tema[]) => {
      this.listaTemas = resp;
    })
  }

  atualizar(){
    this.tema.idTema = this.id;
    this.postagem.tema = this.tema;

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) =>{
      this.postagem = resp;
      alert("Postagem atualizada com sucesso!");
      this.router.navigate(["/inicio"]);
    })
  }

}
