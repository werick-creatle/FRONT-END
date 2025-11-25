import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly API = 'http://localhost:8080/api/jogos';

  constructor(private http: HttpClient) { }



 // ============ Meus metodos ==============


  listar(pagina: number, tamanho: number, filtro?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', pagina.toString())
      .set('size', tamanho.toString());

    if (filtro) {
      // Se houver filtro, chama a rota específica de plataforma
      return this.http.get<any[]>(`${this.API}/plataforma/${filtro}`);
    }
    // Se não houver filtro, chama a rota padrão com paginação
    return this.http.get<any>(this.API, { params: params });
  }


  

  buscarNovidades(): Observable<any[]> {
    // Isso chama o endpoint /api/jogos/novidades, que devolve uma Lista (sem paginação)
    return this.http.get<any[]>(`${this.API}/novidades`);
  }






cadastrar(dadosJogo: any): Observable<any> {
    return this.http.post(this.API, dadosJogo, { 
      withCredentials: true // OBRIGATÓRIO: Envia o cookie de quem está logado
    });
  }




// ATUALIZAR (PUT)
  atualizar(id: number, dados: any): Observable<any> {
    return this.http.put(`${this.API}/${id}`, dados, { withCredentials: true });
  }

  // EXCLUIR (DELETE)
  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.API}/${id}`, { withCredentials: true });
  }

  // BUSCAR POR ID (Necessário para a edição)
  buscarPorId(id: number): Observable<any> {
    return this.http.get(`${this.API}/${id}`);
  }




}