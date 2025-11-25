import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { ShoppingCart, ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';
import { GameService } from '../../services/game.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css'
})
export class CatalogoComponent implements OnInit {

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
    this.buscarJogos();
  }

  buscarJogos() {
    this.gameService.listar(this.paginaAtual, this.tamanhoDaPagina).subscribe({
      next: (dados: any) => {
        this.jogos = [...this.jogos, ...dados.content];
        this.totalPaginas = dados.totalPages;
        this.ePrimeiraPagina = dados.first;
        this.eUltimaPagina = dados.last;
      }, 
      error: (erro: any) => {
        console.error('Erro ao carregar os jogos: ', erro);
      }
    });
  }

  carregarMais() {
    if (!this.eUltimaPagina) {
      this.paginaAtual++;
      this.buscarJogos();
    }
  }

  // MÉTODO PARA ADICIONAR AO CARRINHO
  adicionarAoCarrinho(jogo: any) {
    
    // 1. Verificação de segurança
    if (!this.authService.estaLogado()) {
      alert('Você precisa fazer login para comprar!');
      this.router.navigate(['/login']);
      return;
    }

    // 2. Monta o objeto para o carrinho
    const itemDTO = {
      jogoId: jogo.id, 
      quantidade: 1
    };

    console.log('Enviando para o carrinho:', itemDTO);

    // 3. Chama o serviço
    this.carrinhoService.adicionarAoCarrinho(itemDTO).subscribe({
      next: () => {
        alert(`"${jogo.nome}" adicionado ao carrinho!`); 
      },
      error: (err: any) => {
        console.error('Erro ao adicionar:', err);
        alert('Erro ao adicionar. faça o login.');
      }
    });
  }
}