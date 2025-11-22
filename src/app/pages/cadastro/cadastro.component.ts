// src/app/pages/cadastro/cadastro.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necessário
import { FormsModule } from '@angular/forms';  // Necessário para o formulário
import { RouterLink } from '@angular/router';   // Necessário para links como o 'Faça Login'

@Component({
  // Seletor que você usa para incorporar o componente (ex: <app-cadastro>)
  selector: 'app-cadastro', 
  standalone: true, 
  
  // Adiciona os módulos necessários
  imports: [CommonModule, FormsModule, RouterLink], 
  
  // Aponta para os arquivos DENTRO da pasta cadastro
  templateUrl: './cadastro.component.html', 
  styleUrl: './cadastro.component.css'
})
// O nome da classe deve ser 'CadastroComponent'
export class CadastroComponent {
  
  // O método chamado pelo (ngSubmit) no HTML
  enviarFormulario(): void {
    console.log('Formulário de cadastro submetido!');
    alert('Cadastro em processamento...');
  }
}