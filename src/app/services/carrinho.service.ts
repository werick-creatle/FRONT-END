import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

// --- 1. INTERFACES (Ajustadas para bater com o Java) ---

export interface CarrinhoItem {
  itemId: number;
  jogoId: number;        // Adicionado para bater com o Java
  nomeJogo: string;      // MUDANÇA: Java manda String, não Objeto
  urlImagemCapa: string;
  precoUnitario: number;
  quantidade: number;
  subtotal: number;
}

export interface CarrinhoViewDTO {
  itens: CarrinhoItem[];
  valorTotal: number; // Certifique-se que seu Java manda 'valorTotal' ou 'total'
}

export interface ItemAdicionarDTO {
  jogoId: number;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private apiUrl = 'http://localhost:8080/api/carrinho';

  private quantidadeSubject = new BehaviorSubject<number>(0);
  
  // Variável que o Header vai ler (RESOLVE O ERRO VERMELHO)
  quantidadeItens$ = this.quantidadeSubject.asObservable();

  constructor(private http: HttpClient) {

  }

  // --- 3. LÓGICA AUXILIAR ---
  
  private atualizarContador(itens: CarrinhoItem[]) {
    if (!itens) {
      this.quantidadeSubject.next(0);
      return;
    }
    // Soma a quantidade de todos os itens
    const total = itens.reduce((acc, item) => acc + item.quantidade, 0);
    this.quantidadeSubject.next(total);
  }

  // --- 4. MÉTODOS HTTP (Com withCredentials e tap) ---

  // GET - Buscar
  buscarItens(): Observable<CarrinhoViewDTO> {
    return this.http.get<CarrinhoViewDTO>(this.apiUrl, { withCredentials: true }).pipe(
      tap(retorno => {
        // Toda vez que busca, atualiza a bolinha do header
        if (retorno && retorno.itens) {
          this.atualizarContador(retorno.itens);
        }
      })
    );
  }

  // POST - Adicionar
  adicionarAoCarrinho(dados: ItemAdicionarDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/adicionar`, dados, { withCredentials: true }).pipe(
      tap(() => {
        // Depois de adicionar, recarrega o carrinho para atualizar o contador
        this.buscarItens().subscribe();
      })
    );
  }

  // PUT - Atualizar Qtd
  atualizarQuantidade(itemId: number, quantidade: number): Observable<any> {
    const body = { quantidade };
    return this.http.put(`${this.apiUrl}/atualizar/${itemId}`, body, { withCredentials: true }).pipe(
      tap(() => this.buscarItens().subscribe())
    );
  }

  // DELETE - Remover
  removerItem(itemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remover/${itemId}`, { withCredentials: true }).pipe(
      tap(() => this.buscarItens().subscribe())
    );
  }

  // POST - Finalizar Pedido
  finalizarCompra(): Observable<any> {
    // Atenção: Ajustei a rota para /pedidos/finalizar conforme conversamos antes
    return this.http.post('http://localhost:8080/api/pedidos/finalizar', {}, { withCredentials: true }).pipe(
      tap(() => {
        // Compra feita -> Carrinho vazio -> Contador zero
        this.quantidadeSubject.next(0);
      })
    );
  }
}