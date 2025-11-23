import { Routes } from '@angular/router';
import { LancamentosComponent } from './pages/lacamentos/lacamentos.component'; 
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { PlaystationComponent } from './pages/playstation/playstation.component';
import { PcComponent } from './pages/pc/pc.component';
import { XboxComponent } from './pages/xbox/xbox.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { PedidoSucessoComponent } from './components/pedido-sucesso/pedido-sucesso.component';

// --- ÁREA ADMIN ---
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CadastrarJogosComponent } from './pages/admin/cadastrar-jogos/cadastrar-jogos.component';
import { ListarJogosComponent } from './pages/admin/listar-jogos/listar-jogos.component';
import { EditarJogoComponent } from './pages/admin/editar-jogo/editar-jogo.component'; 

import { RemoverJogosComponent } from './pages/admin/remover-jogos/remover-jogos.component';
import { PerfilComponent } from './pages/perfil/perfil.component';



export const routes: Routes = [
    {
        path: 'lancamentos',
        component: LancamentosComponent, 
    },
    {
        path: 'catalogo',
        component: CatalogoComponent,
    },
    {
        path: 'pc',
        component: PcComponent,
    },
    {
        path: 'playstation',
        component: PlaystationComponent,
    },
    {
        path: 'xbox',
        component: XboxComponent,
    },
    {
        path: 'carrinho',
        component: CarrinhoComponent,
    },
    
    // Rota de Sucesso do Pedido
    {
        path: 'pedido-sucesso/:id',
        component: PedidoSucessoComponent,
    },

    {
        path: 'cadastro',
        component: CadastroComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },

    {
        path: 'perfil',
        component: PerfilComponent,
    },
    
    // --- ROTAS DO ADMIN ---
    {
        path: 'admin',
        component: AdminComponent, 
        children: [ 
            {
                path: 'dashboard',
                component: DashboardComponent, 
            },
            {
                path: 'cadastrar-jogos',
                component: CadastrarJogosComponent,
            },
            {
                path: 'jogos',
                component: ListarJogosComponent, 
            },
            {
                path: 'editar-jogo/:id', 
                component: EditarJogoComponent,
            },
           
            {
                path: 'remover-jogos',
                component: RemoverJogosComponent,
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
        ],
    },

    // Rota padrão (Home)
    {
        path: '',
        redirectTo: 'lancamentos',
        pathMatch: 'full',
    },
];