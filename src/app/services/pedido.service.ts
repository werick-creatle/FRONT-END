import { PedidoViewDTO } from './../models/pedido.model';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/api/pedidos';


  constructor(private http: HttpClient) { }
  

  //Metodo para finalizar compra
  finalizarCompra(): Observable<PedidoViewDTO> {
    return this.http.post<PedidoViewDTO>(`${this.apiUrl}/finalizar`,{})
  }
  getPedidoById(pedidoId: number): Observable<PedidoViewDTO>{
    return this.http.get<PedidoViewDTO>(`${this.apiUrl}/${pedidoId}`)
  }
}
