import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { RegistroDTO } from '../models/registro-dto';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private readonly BASE_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }



  //Metodo cadastrar
cadastrar(dados: RegistroDTO): Observable<string> {
    return this.http.post(
      `${this.BASE_URL}/register`, 
      dados, 
      { responseType: 'text' }
    );
  }





  // 1. Método de Login
  logar(dados: any): Observable<any> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true // Importante para o Cookie
    };

    return this.http.post<any>(`${this.BASE_URL}/login`, dados, httpOptions).pipe(
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