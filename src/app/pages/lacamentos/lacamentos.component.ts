import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { ShoppingCart, LucideAngularModule } from 'lucide-angular';
import { GameService } from '../../services/game.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { AuthService } from '../../services/auth.service'; 
import { CarrosselComponent } from './components/carrossel/carrossel.component';


@Component({
  selector: 'app-lancamentos', 
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    CarrosselComponent 
  ],
  templateUrl: './lacamentos.component.html',
  styleUrl: './lacamentos.component.css'
})
export class LancamentosComponent implements OnInit {

  carrinhoIcone = ShoppingCart;
  jogos: any[] = [];
  eUltimaPagina: boolean = true; 
  
  constructor(
    private gameService: GameService,
    private carrinhoService: CarrinhoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarNovidades();
  }

  buscarNovidades() {
    this.gameService.buscarNovidades().subscribe({
      next: (dados: any) => { 
        this.jogos = dados; 
      },
      error: (erro: any) => console.error('Erro ao buscar novidades:', erro) 
    });
  }

  adicionarAoCarrinho(jogo: any) {
    if (!this.authService.estaLogado()) {
      this.router.navigate(['/login']);
      return;
    }
    const itemDTO = { jogoId: jogo.id, quantidade: 1 };
    
    this.carrinhoService.adicionarAoCarrinho(itemDTO).subscribe({
      next: () => alert(`"${jogo.nome}" adicionado ao carrinho!`),
      error: () => alert('Erro ao adicionar.')
    });
  }
}