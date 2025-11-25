# 🎮 GameStore – Projeto de Loja de Jogos Online

Este projeto é a **GameStore**, um sistema completo desenvolvido com **Angular** no Frontend e **Java (Spring Boot)** no Backend.  
Ele foi criado como um **PI (Projeto Integrador)** com o objetivo de simular uma loja real de jogos digitais, com páginas de navegação para o usuário e um painel administrativo para gestão do catálogo.

---

## ✨ Destaques do Projeto

O sistema foi dividido em duas áreas principais:

1. **Interface do Cliente (Frontend):**  
   Onde o usuário navega, visualiza os jogos, acessa seu perfil e gerencia o carrinho.

2. **Painel Administrativo (AdminPainel):**  
   Área restrita para administradores, onde é possível gerenciar o catálogo de jogos.

---

# 🛍️ 1. Interface do Cliente

A interface foi desenvolvida com foco em design moderno, fluidez e navegação intuitiva entre os jogos.

---

## ⭐ Página de Lançamentos

A página inicial exibe os jogos mais novos e populares da plataforma.

![Página de Lançamentos](public/capa-projeto.png)

---

## 🎮 Catálogo de Jogos

Aqui o usuário encontra todos os jogos disponíveis, com título, imagem e preço.

![Página de Catálogo](public/catalago-projeto.png)

---

## 🛒 Carrinho de Compras

Área onde o usuário visualiza os itens selecionados, adiciona, remove e finaliza compras.

![Carrinho](public/carrinho-projeto.png)

---


## 📊 Dashboard – Controle de Jogos

Permite visualizar, editar e remover qualquer jogo do catálogo.

![Dashboard](public/dashboard-projeto.png)




---

## 📂 Gerenciar Jogos

O painel foi pensado para ser simples e funcional, permitindo o controle completo dos jogos.

![Cadastrar Jogo](public/gerenciar-jogos-projeto.png)

---

---

## ➕ Cadastrar Novo Jogo

Formulário completo para cadastrar novos jogos na plataforma, incluindo nome, descrição, preço, estoque e URL da imagem.

![Cadastrar Jogo](public/cadastrar-jogo-projeto.png)

---

# 👤 Página de Perfil do Usuário

Onde o usuário pode ver seus dados e acompanhar informações pessoais.

![Perfil](public/perfiel-projeto.png)

---

# 🛠️ Tecnologias Utilizadas

### **Frontend**
- Angular  
- TypeScript  
- HTML5  
- CSS3 / SCSS  
- Angular Router  
- Lucide Icons  

### **Backend**
- Java  
- Spring Boot  
- APIs REST  
- Persistência de Carrinho  
- Autenticação e Cadastro  
- CRUD completo de Jogos  

---



# 🚀 Como Executar o Projeto

## ✔️ 1. Pré-requisitos
Instale:
- Node.js  
- Angular CLI  
- Java 17+ (para API)  
- Maven  

---

## ✔️ 2. Clonar o Repositório

```bash
git clone SEU_REPOSITORIO_AQUI

cd nome-do-projeto

npm install

ng serve -o

O projeto abrirá em:
http://localhost:4200/

mvn spring-boot:run

A API estará rodando em:
http://localhost:8080/