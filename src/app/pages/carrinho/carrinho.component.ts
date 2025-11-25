import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Router, RouterLink } from '@angular/router'; 
import { Trash2, LucideAngularModule } from 'lucide-angular'; 
import { take } from 'rxjs'; 

// Seus Services e Models
import { CarrinhoService, CarrinhoViewDTO, CarrinhoItem } from '../../services/carrinho.service'; 

// --- NOVO: Importando o PedidoService e o Model do Pedido ---
import { PedidoService } from '../../services/pedido.service';
import { PedidoViewDTO } from '../../models/pedido.model';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    FormsModule, 
    RouterLink
  ], 
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit {
  
  carrinhoItems: CarrinhoItem[] = [];
  total: number = 0;
  
  readonly lixeiraIcone = Trash2; 

  // Injeção de dependências
  private carrinhoService = inject(CarrinhoService);
  private router = inject(Router);
  
  // --- NOVO: Injetando o PedidoService ---
  private pedidoService = inject(PedidoService);

  ngOnInit(): void {
    this.buscarItensDoCarrinho();
  }

  buscarItensDoCarrinho(): void {
    this.carrinhoService.buscarItens()
      .pipe(take(1)) 
      .subscribe({
        next: (res: CarrinhoViewDTO) => { 
          this.carrinhoItems = res.itens; 
          this.total = res.valorTotal; 
        },
        error: (err: any) => { 
          console.error('Erro ao buscar itens do carrinho:', err);
        }
      });
  }

  removerItem(itemId: number): void {
    this.carrinhoService.removerItem(itemId)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.carrinhoItems = this.carrinhoItems.filter(item => item.itemId !== itemId);
          this.calcularTotal();
        },
        error: (err: any) => console.error('Erro ao remover item:', err)
      });
  }

  atualizarQuantidade(item: CarrinhoItem): void {
    if (item.quantidade < 1) {
      this.removerItem(item.itemId);''
      return;
    }

    this.carrinhoService.atualizarQuantidade(item.itemId, item.quantidade)
      .pipe(take(1))
      .subscribe({
        next: (res: CarrinhoItem) => { 
          item.subtotal = res.subtotal; 
          this.calcularTotal();
        },
        error: (err: any) =>{
          console.error('Erro ao atualizar: ', err);
          if(err.error && typeof err.error == 'string'){
            alert(err.error);
          } else {
            alert('Não foi possivel atualizar a quantidade');
          }
          this.buscarItensDoCarrinho(); // Recarrega para garantir consistência
        }
      });
  }

  calcularTotal(): void {
    this.total = this.carrinhoItems.reduce((acc, item) => acc + item.subtotal, 0);
  }


  finalizarCompra(): void {
    if (this.carrinhoItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    this.pedidoService.finalizarCompra()
      .pipe(take(1))
      .subscribe({
        next: (res: PedidoViewDTO) => { 
          console.log('Pedido gerado:', res);
          
          // Limpa a tela localmente
          this.carrinhoItems = []; 
          this.total = 0;

 
  
          this.router.navigate(['/pedido-sucesso', res.pedidoId]); 
        },
        error: (err: any) => { 
          console.error('Erro ao finalizar a compra:', err);

          if (err.error && typeof err.error === 'string') {
             alert(err.error);
          } else if (err.error && err.error.message) {
             alert(err.error.message);
          } else {
             alert('Ocorreu um erro inesperado ao finalizar a compra.');
          }
        }
      });
  }
}