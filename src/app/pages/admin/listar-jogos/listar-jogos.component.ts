import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';   
import { GameService } from '../../../services/game.service';

@Component({
  selector: 'app-listar-jogos',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './listar-jogos.component.html',
  styleUrl: './listar-jogos.component.css'
})
export class ListarJogosComponent implements OnInit {

  jogos: any[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.carregarJogos();
  }

  carregarJogos() {
    this.gameService.listar(0, 1000).subscribe({
      next: (res: any) => {
        this.jogos = res.content ? res.content : res;
      },
      error: (err) => console.error(err)
    });
  }

  deletarJogo(id: number) {
    if(confirm('Tem certeza que deseja apagar este jogo?')) {
      this.gameService.excluir(id).subscribe({
        next: () => {
          alert('Jogo excluído com sucesso!');
          this.carregarJogos(); // Recarrega a tabela
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao excluir. Verifique se você é Admin.');
        }
      });
    }
  }
}