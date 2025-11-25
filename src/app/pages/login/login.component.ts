import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  dadosLogin = {
    login: '',
    senha: ''
  };

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  fazerLogin() {
    if (this.dadosLogin.login && this.dadosLogin.senha) {
      
      this.authService.logar(this.dadosLogin).subscribe({
        next: (resposta) => {
          console.log('Sucesso no login!');
          alert('Login realizado!');
          this.router.navigate(['/']); // Vai para a Home
        },
        error: (erro) => {
          console.error('Erro no login:', erro);
          alert('Erro ao entrar. Verifique usuário e senha.');
        }
      });
      
    } else {
      alert('Preencha os campos!');
    }
  }
}