import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Já está aqui, o que é bom!

@Component({
  selector: 'app-admin',
  // O RouterModule deve ser importado aqui para que o Angular reconheça o <router-outlet>
  imports: [
    RouterModule // <-- Adicione RouterModule ao array de imports
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  standalone: true // Geralmente componentes autônomos têm esta propriedade
})
export class AdminComponent {
  // ...
}