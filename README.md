# Portfólio - Desenvolvimento Web II

Este é um portfólio dinâmico e responsivo desenvolvido para a disciplina de **Desenvolvimento Web II** na **FATEC**.

O projeto utiliza uma arquitetura de **Front-end desacoplado** que consome dados e gerencia operações de CRUD em um **backend real em produção** de forma assíncrona via requisições HTTP (GET, POST, PUT, DELETE).

---

## 🚀 Tecnologias Utilizadas

*   **Front-end:** HTML5, CSS3 (Vanilla CSS com suporte a Dark Mode e Responsividade), JavaScript (ES6+ com `fetch` API e `IntersectionObserver`).
*   **Back-end:** Node.js, Express (servidor de API HTTP) e [Prisma ORM (v7)](https://www.prisma.io/) utilizando Driver Adapters.
*   **Banco de Dados:** [MySQL](https://www.mysql.com/) para persistência de dados real e relacional.
*   **Ferramentas de Teste:** Postman / Insomnia para validação das rotas da API.

---

## 📂 Estrutura de Arquivos

*   `index.html`: Página principal do portfólio.
*   `admin.html`: Painel administrativo para realizar operações de inserção, edição e exclusão.
*   `script.js`: Lógica de consumo da API (porta 4001) e manipulação do DOM.
*   `style.css`: Estilização visual (Modern & Dark Mode).
*   `backend/`: Diretório que hospeda o servidor e toda a lógica de banco de dados:
    *   `server.js`: Servidor Express com mapeamento das rotas HTTP da API.
    *   `db.js`: Inicialização e injeção do Driver Adapter do MySQL/MariaDB para o Prisma Client.
    *   `prisma/schema.prisma`: Definição de modelos relacionais do Prisma.
    *   `prisma/seed.js`: Script para importar/reinicializar dados padrão no banco.
    *   `prisma.config.js`: Configurações do Prisma v7.

---

## 🛠️ Como Executar o Projeto

### 1. Pré-requisitos
*   Node.js instalado (v18 ou superior).
*   Servidor MySQL em execução na sua máquina.

---

### Opção A: Inicialização Rápida (No seu ambiente atual)
Como o seu banco de dados MySQL e o arquivo `.env` já foram totalmente configurados e migrados com sucesso na sua máquina, você só precisa iniciar o servidor!

1. **Abra o terminal no diretório `/backend`** e inicie o servidor:
   ```bash
   npm run dev
   ```
   *(O servidor de desenvolvimento iniciará automaticamente na porta **4001**).*
2. **Abra o front-end**: Abra o arquivo `index.html` na raiz do projeto utilizando a extensão **Live Server** do VS Code (ou qualquer outro servidor de arquivos estáticos local).

---

### Opção B: Instalação e Configuração Completa (Em uma máquina nova)
Caso queira clonar este projeto e rodá-lo do zero em outro computador ou banco de dados limpo, siga estes passos:

1. **Instale as dependências**:
   No terminal, acesse a pasta `/backend` e rode:
   ```bash
   npm install
   ```
2. **Configure as Variáveis de Ambiente**:
   Crie ou edite o arquivo `.env` no diretório `/backend` e insira as credenciais do seu banco de dados MySQL local:
   ```env
   DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/portfolio_db"
   PORT=4001
   ```
3. **Crie as tabelas no banco de dados (Prisma Migrations)**:
   Com o terminal na pasta `/backend`, execute o comando abaixo para gerar a estrutura de tabelas no MySQL:
   ```bash
   npx prisma migrate dev --name init
   ```
4. **Alimente o banco com os dados padrões (Seed)**:
   Importe as informações iniciais (projetos, formações, habilidades, etc.) para o MySQL executando:
   ```bash
   npx prisma db seed
   ```
5. **Inicie o servidor e acesse o site**:
   Rode `npm run dev` na pasta `/backend` e abra o arquivo `index.html` na raiz via **Live Server**.

---

## 📍 Rotas da API

O servidor backend disponibiliza os seguintes endpoints REST na porta **4001**:

| Recurso | Método | Endpoint | Descrição |
| :--- | :--- | :--- | :--- |
| **Projetos** | GET | `/projetos` | Lista todos os projetos |
| **Projetos** | POST | `/projetos` | Adiciona um novo projeto |
| **Projetos** | PUT | `/projetos/:id` | Atualiza um projeto existente |
| **Projetos** | DELETE | `/projetos/:id` | Remove um projeto |
| **Formações** | GET | `/formacoes` | Lista todas as formações |
| **Formações** | POST | `/formacoes` | Adiciona uma nova formação |
| **Eventos** | GET | `/eventos` | Lista todos os eventos |
| **Eventos** | POST | `/eventos` | Adiciona um novo evento |
| **Blog** | GET | `/blog` | Lista as postagens do blog |
| **Blog** | POST | `/blog` | Cria uma nova postagem |
| **Habilidades** | GET | `/habilidades` | Retorna as categorias de skills formatadas |
