import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { ShoppingCart, ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';
import { GameService } from '../../services/game.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-playstation',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './playstation.component.html',
  styleUrl: './playstation.component.css'
})
export class PlaystationComponent implements OnInit {

  // Ícones
  carrinhoIcone = ShoppingCart;
  setaEsquerda = ChevronLeft;
  setaDireita = ChevronRight;
  
  // Lista de jogos
  jogos: any[] = [];

  // Variáveis de paginação
  paginaAtual: number = 0;
  tamanhoDaPagina: number = 30;
  totalPaginas: number = 0;
  ePrimeiraPagina: boolean = true;
  eUltimaPagina: boolean = false;

  constructor(
    private gameService: GameService,
    private carrinhoService: CarrinhoService,
    private authService: AuthService,
    private router: Router 
  ) {} 

  ngOnInit(): void {
    this.buscarJogosPS(); 
  }

  buscarJogosPS() {
    this.gameService.listar(this.paginaAtual, this.tamanhoDaPagina, 'PS5').subscribe({
      next: (dados: any) => {
        
        if (Array.isArray(dados)) {
          this.jogos = [...this.jogos, ...dados];
          this.eUltimaPagina = true; 
        } else {
          // Lógica de paginação do Spring
          this.jogos = [...this.jogos, ...dados.content];
          this.totalPaginas = dados.totalPages;
          this.ePrimeiraPagina = dados.first;
          this.eUltimaPagina = dados.last;
        }
        
        console.log('Jogos de PS5 carregados:', this.jogos); // Debug
      }, 
      error: (erro: any) => {
        console.error('Erro ao carregar os jogos de PlayStation: ', erro);
      }
    });
  }

  carregarMais() {
    if (!this.eUltimaPagina) {
      this.paginaAtual++;
      this.buscarJogosPS(); 
    }
  }

  // MÉTODO PARA ADICIONAR AO CARRINHO
  adicionarAoCarrinho(jogo: any) {
    
    if (!this.authService.estaLogado()) {
      alert('Você precisa fazer login para comprar!');
      this.router.navigate(['/login']);
      return;
    }

    const itemDTO = {
      jogoId: jogo.id, 
      quantidade: 1
    };

    this.carrinhoService.adicionarAoCarrinho(itemDTO).subscribe({
      next: () => {
        alert(`"${jogo.nome}" adicionado ao carrinho!`); 
      },
      error: (err: any) => {
        console.error('Erro ao adicionar:', err);
        alert('Erro ao adicionar. Verifique o console.');
      }
    });
  }
}