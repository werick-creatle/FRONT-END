import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Trash2 } from 'lucide-angular';

@Component({
  selector: 'app-remover-jogos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideAngularModule
  ],
  templateUrl: './remover-jogos.component.html',
  styleUrls: ['./remover-jogos.component.css']
})
export class RemoverJogosComponent {

  // Ícone da lixeira para usar no HTML
  lixeiraIcone = Trash2;

  removerItem(id: number) {
    console.log('Removendo jogo com id:', id);
  }

}
