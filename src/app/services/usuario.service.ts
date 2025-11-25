import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // URL base para os dados do usuário
  private readonly API = 'http://localhost:8080/api/usuarios/meuperfil';

  constructor(private http: HttpClient) {}

  // 1. GET - Buscar meus dados (O Backend sabe quem é pelo Cookie/Token)
  buscarMeuPerfil(): Observable<any> {
    return this.http.get(this.API, { withCredentials: true });
  }

  // 2. PUT - Atualizar meus dados (Nome e Data)
  atualizarMeuPerfil(dados: any): Observable<any> {
    return this.http.put(this.API, dados, { withCredentials: true });
  }
}