import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterOutlet } from '@angular/router';
import { LucideAngularModule, UserIcon, Shield, ShoppingCart, Search } from 'lucide-angular';

import { MenuComponent } from './shared/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LucideAngularModule,
    CommonModule,
    MenuComponent,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  title = 'game-store';

  usuarioIcone = UserIcon;
  shield = Shield;
  carrinhoIcone = ShoppingCart;
  searchIcone = Search;

  constructor(private router: Router) {}

  mostrarLayout(): boolean {
    const url = this.router.url;

    // Rotas fixas sem layout
    const rotasFixas = ['/login', '/cadastro'];

    // Login e cadastro → sem layout
    if (rotasFixas.includes(url)) return false;

    // Qualquer coisa dentro de /admin → sem layout
    if (url.startsWith('/admin')) return false;

    // Qualquer pedido-sucesso com ID → sem layout
    if (url.startsWith('/pedido-sucesso')) return false;

    return true;
  }
}
