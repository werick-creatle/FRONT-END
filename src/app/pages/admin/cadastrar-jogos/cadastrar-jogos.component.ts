import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; // <--- OBRIGATÓRIO: Importar o Router
import { GameService } from '../../../services/game.service'; // <--- OBRIGATÓRIO: Verifique os pontinhos (..) do caminho

@Component({
  selector: 'app-cadastrar-jogos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastrar-jogos.component.html',
  styleUrl: './cadastrar-jogos.component.css' 
})
export class CadastrarJogosComponent {

  jogo = {
    nome: '',
    plataforma: '',
    genero: '',
    dataLancamento: '',
    preco: 0, 
    quantidadeEstoque: 0,
    urlImagemCapa: '',
    descricao: ''
  };

  constructor(
    private gameService: GameService,
    private router: Router
  ) {}

  onSubmit() {
    // Validação simples antes de enviar
    if (this.jogo.preco <= 0) {
        alert('O preço deve ser maior que zero!');
        return;
    }

    this.gameService.cadastrar(this.jogo).subscribe({
      next: (res) => {
        alert('Jogo cadastrado com sucesso!');
        this.router.navigate(['/']); 
      },
      error: (err) => {
        console.error('Erro detalhado:', err);
        
        if (err.status === 403) {
           alert('ACESSO NEGADO: O servidor recusou o cadastro. Verifique se você é ADMIN.');
        } else {
           alert('Erro ao conectar com o servidor.');
        }
      }
    });
  }
}