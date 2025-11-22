import { Routes } from '@angular/router';
import { LancamentosComponent } from './pages/lacamentos/lacamentos.component'; 
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { PlaystationComponent } from './pages/playstation/playstation.component';
import { PcComponent } from './pages/pc/pc.component';
import { XboxComponent } from './pages/xbox/xbox.component';
import { CarrinhoComponent } from './pages/carrinho/carrinho.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { CadastrarJogosComponent } from './pages/admin/cadastrar-jogos/cadastrar-jogos.component';
import { RemoverJogosComponent } from './pages/admin/remover-jogos/remover-jogos.component';


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
    {
        path: 'cadastro',
        component: CadastroComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },

    // ADMIN 
    {
        path: 'admin',
        component: AdminComponent,
        children: [ // <-- Rotas filhas do AdminComponent
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: 'cadastrar-jogos',
                component: CadastrarJogosComponent,
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

    //Primeira tela ao abrir o site
    {
        path: '',
        redirectTo: 'lancamentos',
        pathMatch: 'full',
    },
];