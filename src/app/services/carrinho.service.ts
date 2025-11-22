import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ===========================================
// ## 🧩 Interfaces e DTOs (Modelos de Dados)
// ===========================================

export interface Jogo {
  id: number;
  nome: string;
  preco: number;
  imagemUrl: string;
}

export interface CarrinhoItem {
  itemId: number;
  nomeJogo: Jogo;
  urlImagemCapa: string;
  precoUnitario: number;

  quantidade: number;
  subtotal: number;
}

export interface CarrinhoViewDTO {
  itens: CarrinhoItem[];
  total: number;
}

export interface ItemAdicionarDTO {
  jogoId: number;
  quantidade: number;
}


// ===========================================
// ## ⚙️ Serviço Principal (CarrinhoService)
// ===========================================

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private apiUrl = 'http://localhost:8080/api/carrinho';

  // --- Propriedades Privadas (Injeções e URLs) ---
  private http = inject(HttpClient);


  // --- 1. MÉTODOS DE CONSULTA (GET) ---

  // GET /api/carrinho
  buscarItens(): Observable<CarrinhoViewDTO> {
    return this.http.get<CarrinhoViewDTO>(this.apiUrl);
  }


  // --- 2. MÉTODOS DE AÇÃO (POST / PUT / DELETE) ---

  // POST /api/carrinho/adicionar (Adiciona um novo item ou atualiza a quantidade)
  adicionarAoCarrinho(dados: ItemAdicionarDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/adicionar`, dados);
  }

  // PUT /api/carrinho/atualizar/{itemId} (Atualiza a quantidade de um item existente)
  atualizarQuantidade(itemId: number, quantidade: number): Observable<CarrinhoItem> {
    const body = { quantidade };
    return this.http.put<CarrinhoItem>(`${this.apiUrl}/atualizar/${itemId}`, body);
  }

  // DELETE /api/carrinho/remover/{itemId} (Remove um item do carrinho)
  removerItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remover/${itemId}`);
  }

  // POST /api/pedidos (Finaliza a compra e move o carrinho para um pedido)
  finalizarCompra(): Observable<any> {
    return this.http.post('/api/pedidos', {});
  }
}