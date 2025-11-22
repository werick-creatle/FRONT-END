import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Trash2, LucideAngularModule } from 'lucide-angular'; 

@Component({
  selector: 'app-carrinho',
  standalone: true,
  // IMPORTAÇÕES NECESSÁRIAS PARA O HTML
  imports: [CommonModule, LucideAngularModule], 
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent {
  
  // Declara o ícone de Lixeira (Trash2) para ser usado no HTML
  readonly lixeiraIcone = Trash2; 
  
  // Note: Não há constructor, OnInit, Observables ou lógica de serviço aqui.
}