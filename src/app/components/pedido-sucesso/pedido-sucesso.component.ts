import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


import { PedidoViewDTO } from '../../models/pedido.model'; 
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-pedido-sucesso',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './pedido-sucesso.component.html',
  styleUrl: './pedido-sucesso.component.css'
})
export class PedidoSucessoComponent implements OnInit {

  pedido: PedidoViewDTO | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.pedidoService.getPedidoById(Number(id)).subscribe({
        next: (dados: PedidoViewDTO) => {
          this.pedido = dados;
        },
        error: (err: any) => {
          console.error('Erro ao buscar pedido:', err);
        }
      });
    }
  }

  voltarLoja() {
    this.router.navigate(['/jogos']);
  }
}