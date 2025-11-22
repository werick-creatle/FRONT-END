import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  private readonly API = 'http://localhost:8080/api/carrinho';

  constructor(private http: HttpClient) { }

  buscarCarrinho(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.API}/${usuarioId}`);
  }

  adicionar(itemDTO: any): Observable<any> {
    return this.http.post<any>(`${this.API}/adicionar`, itemDTO);
  }
}