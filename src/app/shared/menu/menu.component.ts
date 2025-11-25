import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


//Metodo para fazer o menu lateral quando a tela for apertada
export class MenuComponent {
  
  // Variável de controle: começa fechado (false)
  menuAberto: boolean = false;

  // Função que inverte o valor (se tá fechado, abre; se tá aberto, fecha)
  alterarMenu() {
    this.menuAberto = !this.menuAberto;
  }

  // Função para fechar o menu quando clicar em um link
  fecharMenu() {
    this.menuAberto = false;

  }
}