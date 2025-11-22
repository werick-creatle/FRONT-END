import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet } from '@angular/router'; // CORREÇÃO 1: RouterLink é essencial para o Menu
import { LucideAngularModule, UserIcon, Shield, ShoppingCart, Search } from 'lucide-angular';

import { MenuComponent } from './shared/menu/menu.component';

import { HeaderComponent } from './components/header/header.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  LucideAngularModule, CommonModule, MenuComponent,HeaderComponent], 
  templateUrl: './app.component.html', 
  styleUrl: './app.component.css', 
})
export class AppComponent {
  title = 'game-store';


  usuarioIcone = UserIcon;
  shield = Shield;
  carrinhoIcone = ShoppingCart;
  searchIcone = Search; 
}

