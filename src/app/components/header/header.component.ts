import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { LucideAngularModule, UserIcon, Shield, ShoppingCart, Search, LogOut } from 'lucide-angular';
import { AuthService } from '../../services/auth.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { Observable } from 'rxjs'; // <--- Importante importar isso

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  usuarioIcone = UserIcon;
  shield = Shield;
  carrinhoIcone = ShoppingCart;
  searchIcone = Search;
  logoutIcone = LogOut; 

  quantidadeItens$: Observable<number>;

  constructor(
    public authService: AuthService,
    private carrinhoService: CarrinhoService,
    private router: Router
  ) {
  
    this.quantidadeItens$ = this.carrinhoService.quantidadeItens$;
  }

  logout() {
    this.authService.deslogar();
    this.router.navigate(['/login']);
  }
}