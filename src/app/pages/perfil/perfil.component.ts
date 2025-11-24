import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importante para o formulário
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  // Objeto para preencher a tela
  usuario = {
    nomeCompleto: '',
    dataNascimento: '',
    login: '' // Email 
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.usuarioService.buscarMeuPerfil().subscribe({
      next: (dados: any) => {
        this.usuario = dados;
        // O input type="date" vai ler automaticamente se vier yyyy-MM-dd
      },
      error: (err) => {
        console.error('Erro ao buscar perfil:', err);
        alert('Erro ao carregar dados. Verifique se está logado.');
      }
    });
  }

  onSubmit() {
    // Monta o objeto EXATO que o Backend espera (conforme meu jason)
    const dadosParaEnviar = {
      nomeCompleto: this.usuario.nomeCompleto,
      dataNascimento: this.usuario.dataNascimento
    };

    this.usuarioService.atualizarMeuPerfil(dadosParaEnviar).subscribe({
      next: () => {
        alert('Perfil atualizado com sucesso! ✅');
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao atualizar perfil.');
      }
    });
  }
}