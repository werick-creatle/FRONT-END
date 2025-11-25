import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { RegistroDTO } from '../../models/registro-dto';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  // 1. Objeto que guardará os dados do formulário (Ligado via ngModel no HTML)
  dados: RegistroDTO = {
    nomeCompleto: '',
    login: '',
    senha: '',
    dataNascimento: ''
  };

  // Variável para mostrar mensagem de erro na tela se algo der errado
  mensagemErro: string = '';

  // 2. Injeção de Dependências (AuthService e Router)
  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}
  
  // 3. O método chamado pelo (ngSubmit)
  enviarFormulario(): void {
    this.mensagemErro = '';

    this.authService.cadastrar(this.dados).subscribe({
      next: (respostaSucesso) => {
        // O backend retorna uma String: "Usuário registrado com sucesso!"
        alert(respostaSucesso); 
        
        // Redireciona para a tela de login após o OK
        this.router.navigate(['/login']);
      },
      error: (erro) => {
        console.error('Erro no cadastro:', erro);
        
        // Tratamento básico de erro
        if (erro.status === 400) {
          // Ex: "Este login já está em uso."
          this.mensagemErro = erro.error; 
        } else {
          this.mensagemErro = 'Ocorreu um erro inesperado. Tente novamente.';
        }
      }
    });
  }
}