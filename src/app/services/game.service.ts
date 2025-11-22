import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly API = 'http://localhost:8080/api/jogos';

  constructor(private http: HttpClient) { }

  listar(pagina: number, tamanho: number, filtro?: string): Observable<any> {
    
    // CORREÇÃO: Variável 'params' declarada apenas uma vez aqui dentro
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
}