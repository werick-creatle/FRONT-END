import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { Router, RouterLink } from '@angular/router'; 
import { Trash2, LucideAngularModule } from 'lucide-angular'; 
import { CarrinhoService, CarrinhoViewDTO, CarrinhoItem } from '../../services/carrinho.service'; 
import { take } from 'rxjs'; 

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
  
  // Ícone de lixeira
  readonly lixeiraIcone = Trash2; 

  // Injeção de dependências
  private carrinhoService = inject(CarrinhoService);
  private router = inject(Router);

  ngOnInit(): void {
    this.buscarItensDoCarrinho();
  }

  // MÉTODO: GET /api/carrinho (Carrega dados iniciais)
  buscarItensDoCarrinho(): void {
    this.carrinhoService.buscarItens()
      .pipe(take(1)) 
      .subscribe({
        next: (res: CarrinhoViewDTO) => { 
          this.carrinhoItems = res.itens; 
          this.total = res.total; 
        },
        error: (err: any) => { 
          console.error('Erro ao buscar itens do carrinho:', err);
        }
      });
  }

  // MÉTODO: DELETE /api/carrinho/remover/{itemId}
  removerItem(itemId: number): void {
    this.carrinhoService.removerItem(itemId)
      .pipe(take(1))
      .subscribe({
        next: () => {
          // Remove o item da lista local
          this.carrinhoItems = this.carrinhoItems.filter(item => item.itemId !== itemId);
          // Recalcula o total com os itens restantes
          this.calcularTotal();
        },
        error: (err: any) => console.error('Erro ao remover item:', err)
      });
  }

  // MÉTODO: PUT /api/carrinho/atualizar/{itemId}
  atualizarQuantidade(item: CarrinhoItem): void {
    if (item.quantidade < 1) {
      this.removerItem(item.itemId);
      return;
    }

    this.carrinhoService.atualizarQuantidade(item.itemId, item.quantidade)
      .pipe(take(1))
      .subscribe({
        next: (res: CarrinhoItem) => { 
          // Atualiza o subtotal deste item com o valor exato que veio da minha API java
          item.subtotal = res.subtotal; 
          this.calcularTotal();
        },
        error: (err: any) =>{
          console.error('Erro ao atualizar: ', err);

          if(err.error && typeof err.error == 'string'){
            alert(err.error);
          }else{
            alert('Não foi possivel adicionar a quantidade')
          }
          this.buscarItensDoCarrinho();
          
        }
      });
  }

  // Método q soma o total
  calcularTotal(): void {
    this.total = this.carrinhoItems.reduce((acc, item) => acc + item.subtotal, 0);
  }

  // MÉTODO: POST /api/pedidos
  finalizarCompra(): void {
    if (this.carrinhoItems.length === 0) {
      alert('Seu carrinho está vazio!');
      return;
    }

    this.carrinhoService.finalizarCompra()
      .pipe(take(1))
      .subscribe({
        next: (res: any) => { 
          alert('Compra finalizada com sucesso! Seu pedido foi gerado.');
          this.carrinhoItems = []; 
          this.total = 0;
          this.router.navigate(['/']); 
        },
        error: (err: any) => { 
          console.error('Erro ao finalizar a compra:', err);



          if (err.error && typeof err.error === 'string') {
             alert(err.error); // Exibe: "Estoque insuficiente..." ou "Carrinho vazio..."
          } else {
             alert('Ocorreu um erro inesperado ao finalizar a compra.');
          }
        }
      });
  }
}