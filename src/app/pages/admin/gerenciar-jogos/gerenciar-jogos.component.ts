import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Importante para o botão de Editar
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-gerenciar-jogos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gerenciar-jogos.component.html',
  styleUrl: './gerenciar-jogos.component.css'
})
export class GerenciarJogosComponent implements OnInit {

  jogos: any[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.carregarJogos();
  }

  carregarJogos() {
    // Busca a lista padrão (página 0, tamanho 100 pra pegar tudo ou ajuste conforme a minha API)
    this.gameService.listar(0, 100).subscribe({
      next: (dados: any) => {
        this.jogos = dados.content ? dados.content : dados;
      },
      error: (err) => console.error('Erro ao carregar jogos', err)
    });
  }

  deletarJogo(id: number) {
    const confirmacao = confirm('Tem certeza que deseja excluir este jogo?');
    
    if (confirmacao) {
      this.gameService.excluir(id).subscribe({
        next: () => {
          alert('Jogo excluído com sucesso!');
          this.carregarJogos(); // Recarrega a lista para sumir com o jogo deletado
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao excluir. Verifique se você é Admin.');
        }
      });
    }
  }
}