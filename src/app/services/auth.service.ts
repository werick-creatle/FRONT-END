import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) { }

  // 1. Método de Login
  logar(dados: any): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true // Importante para o Cookie
    };

    return this.http.post<any>(this.API, dados, httpOptions).pipe(
      tap((resposta) => {
        if (resposta) {
          localStorage.setItem('usuario_logado', JSON.stringify(resposta));
          console.log('Login salvo:', resposta);
        }
      })
    );
  }

  // 2. Métodos Auxiliares (Tudo dentro da classe!)
  getUsuarioLogado() {
    const salvo = localStorage.getItem('usuario_logado');
    return salvo ? JSON.parse(salvo) : null;
  }

  deslogar() {
    localStorage.removeItem('usuario_logado');
  }

  estaLogado(): boolean {
    return !!localStorage.getItem('usuario_logado');
  }
}