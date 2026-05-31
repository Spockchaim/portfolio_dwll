# 🚀 Portfólio Full-Stack - Pedro Chaim

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

Este projeto é um portfólio dinâmico e responsivo desenvolvido como parte da disciplina de **Desenvolvimento Web II** na **FATEC São José dos Campos**. Ele demonstra a integração entre um frontend moderno desacoplado e um backend robusto com persistência de dados real.

---

## 📋 Sobre o Projeto

O objetivo deste projeto foi construir uma aplicação full-stack que fosse além de uma página estática. O portfólio consome uma API RESTful própria, permitindo o gerenciamento dinâmico de projetos, formações, habilidades e postagens de blog através de um painel administrativo completo.

### ✨ Principais Funcionalidades

- **Dashboard Dinâmico:** Carregamento assíncrono de dados via Fetch API.
- **Painel Administrativo:** Interface completa de CRUD para gerenciar o conteúdo do site em tempo real sem alterar o código.
- **Design Responsivo & Moderno:** Interface otimizada para diferentes dispositivos com foco em experiência do usuário (UX).
- **Sistema de Blog:** Feed dinâmico para compartilhamento de artigos e novidades.
- **Seção de Eventos:** Exibição de participação em workshops, maratonas e conferências com suporte a imagens.
- **Habilidades Interativas:** Visualização de competências técnicas com barras de progresso dinâmicas.

---

## 🛠️ Stack Tecnológica

### Frontend
- **HTML5 & CSS3:** Utilização de Vanilla CSS para performance máxima e customização total.
- **JavaScript (ES6+):** Manipulação de DOM, consumo de API assíncrona e lógica de interface.
- **IntersectionObserver:** Implementação de scroll suave e carregamento sob demanda.

### Backend
- **Node.js & Express 5:** Servidor de API robusto e modular.
- **Prisma ORM (v7):** Gerenciamento de banco de dados com tipagem segura e migrações eficientes.
- **MySQL/MariaDB:** Banco de dados relacional para persistência de dados escalável.
- **CORS & Dotenv:** Padrões de segurança e gerenciamento de configurações.

---

## 📂 Estrutura do Repositório

```text
.
├── backend/                # Servidor Node.js, Configurações do Prisma e API
│   ├── prisma/             # Schema do banco de dados e scripts de semente (seed)
│   └── server.js           # Rotas, controladores e lógica do servidor Express
├── img/                    # Ativos visuais e fotografias do portfólio
├── index.html              # Interface principal de visualização
├── admin.html              # Painel de gerenciamento administrativo (CRUD)
├── script.js               # Lógica de integração e consumo da API
└── style.css               # Estilização global, variáveis e responsividade
```

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **MySQL** ou **MariaDB** instalado e rodando

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Spockchaim/Portifolio.git
   cd Portifolio
   ```

2. **Configure o Backend:**
   Acesse a pasta do servidor e instale as dependências:
   ```bash
   cd backend
   npm install
   ```

3. **Configuração de Ambiente:**
   Crie um arquivo `.env` no diretório `backend/` e configure a URL de conexão com seu banco de dados:
   ```env
   DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/portfolio_db"
   PORT=4001
   ```

4. **Prepare o Banco de Dados:**
   Execute as migrações para criar as tabelas e popule o banco com os dados iniciais:
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```

5. **Inicie o Servidor:**
   ```bash
   npm run dev
   ```

6. **Acesse o Portfólio:**
   Abra o arquivo `index.html` na raiz do projeto em seu navegador preferido.

---

## 🛣️ API Endpoints (Porta 4001)

| Recurso | Método | Endpoint | Descrição |
| :--- | :--- | :--- | :--- |
| **Projetos** | GET | `/projetos` | Retorna lista de projetos |
| **Projetos** | POST | `/projetos` | Cria novo projeto |
| **Habilidades** | GET | `/habilidades` | Lista competências técnicas |
| **Blog** | GET | `/blog` | Lista postagens recentes |
| **Eventos** | GET | `/eventos` | Retorna participações em eventos |

---

## 👤 Autor

**Pedro Chaim**  
Engenheiro de Software em Formação - FATEC São José dos Campos

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pedrochaim/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Spockchaim)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:spockzenho@gmail.com)

---

## 📄 Licença

Este projeto está licenciado sob a [ISC License](https://opensource.org/licenses/ISC).
