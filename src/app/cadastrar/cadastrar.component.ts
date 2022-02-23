import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/Usuario';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario;
  confirmarSenha: string;
  tipoUser: string;

  constructor(private authService: AuthService, private router: Router) { 

  }

  ngOnInit() {
    window.scroll(0,0);
  }

  confirmaSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUsuario(event: any) {
    this.tipoUser = event.target.value;
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUser;

    if (this.usuario.senha != this.confirmarSenha) {
      alert("A senha de ambos os campos devem ser iguais!");
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;
        this.router.navigate(["/entrar"]);
        alert("Usuário cadastrado com sucesso!");
      });
    }
  }
}
