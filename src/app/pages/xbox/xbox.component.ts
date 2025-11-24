import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { ShoppingCart, ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';
import { GameService } from '../../services/game.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-xbox', 
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './xbox.component.html',
  styleUrl: './xbox.component.css'
})
export class XboxComponent implements OnInit {

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
    this.buscarJogosXbox(); 
  }

  //Filtro para apenas jogos de Xbox
  buscarJogosXbox() { 
    this.gameService.listar(this.paginaAtual, this.tamanhoDaPagina, 'XBOX').subscribe({
      next: (dados: any) => {
        // Se a API retornar array direto (sem paginação)
        if (Array.isArray(dados)) {
          this.jogos = [...this.jogos, ...dados];
          this.eUltimaPagina = true; 
        } else {
          // Se retornar com paginação Spring
          this.jogos = [...this.jogos, ...dados.content];
          this.totalPaginas = dados.totalPages;
          this.ePrimeiraPagina = dados.first;
          this.eUltimaPagina = dados.last;
        }
        console.log('Jogos de Xbox carregados:', this.jogos);
      }, 
      error: (erro: any) => {
        console.error('Erro ao carregar os jogos de Xbox: ', erro);
      }
    });
  }

  carregarMais() {
    if (!this.eUltimaPagina) {
      this.paginaAtual++;
      this.buscarJogosXbox(); 
    }
  }

  // Metodo para adicionar os jogos ao carrinho
  adicionarAoCarrinho(jogo: any) {
    
    //Verificação para saber se o usuario esta logado
    if (!this.authService.estaLogado()) {
      alert('Você precisa fazer login para comprar!');
      this.router.navigate(['/login']);
      return;
    }

    //Monta o objeto para o carrinho
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
        alert('Erro ao adicionar. Verifique o console.');
      }
    });
  }
}