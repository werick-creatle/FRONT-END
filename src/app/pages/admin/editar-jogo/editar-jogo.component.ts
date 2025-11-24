import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../../services/game.service'; 

@Component({
  selector: 'app-editar-jogo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-jogo.component.html',
  styleUrl: './editar-jogo.component.css'
})
export class EditarJogoComponent implements OnInit {

  idJogo: number = 0;

  // Objeto do jogo
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
    private route: ActivatedRoute, // Para pegar o ID na rota
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Pega o ID da URL (ex: /admin/editar-jogo/15)
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.idJogo = Number(id);
      this.carregarDados(this.idJogo);
    }
  }

  carregarDados(id: number) {
    this.gameService.buscarPorId(id).subscribe({
      next: (dados: any) => {
        this.jogo = dados;
        // O Java manda a data certa, o input type="date" deve reconhecer se for yyyy-MM-dd
      },
      error: (err) => {
        alert('Erro ao buscar o jogo. Talvez ele não exista.');
        this.router.navigate(['/admin/jogos']);
      }
    });
  }

  onSubmit() {
    this.gameService.atualizar(this.idJogo, this.jogo).subscribe({
      next: () => {
        alert('Jogo atualizado com sucesso!');
        this.router.navigate(['/admin/jogos']); // Volta para a tabela
      },
      error: (err) => {
        console.error(err);
        if (err.status === 403) alert('Acesso Negado.');
        else alert('Erro ao salvar alterações.');
      }
    });
  }
}