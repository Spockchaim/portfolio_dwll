# Portfólio - Desenvolvimento Web II

Este é um portfólio dinâmico desenvolvido para a disciplina de Desenvolvimento Web II. O projeto utiliza uma arquitetura de Front-end desacoplado que se comunica com uma API via requisições HTTP (GET, POST, PUT, DELETE).

## 🚀 Tecnologias Utilizadas

*   **Front-end:** HTML5, CSS3 (Vanilla), JavaScript (ES6+).
*   **Back-end (Simulado):** [JSON Server](https://github.com/typicode/json-server) para simular uma API REST real.
*   **Persistência:** Arquivo `db.json` que atua como banco de dados.
*   **Ferramentas de Teste:** Postman / Insomnia para validação das rotas.

## 🛠️ Como Executar o Projeto

Para que o site funcione corretamente e exiba os dados, você precisa rodar o servidor da API na porta **4001**:

1.  **Certifique-se de ter o Node.js instalado.**
2.  **Abra o terminal na pasta do projeto.**
3.  **Inicie o servidor da API:**
    ```bash
    npx json-server --watch db.json --port 4001
    ```
4.  **Abra o arquivo `index.html`** no seu navegador (utilizando a extensão Live Server ou abrindo o arquivo diretamente).

## 📍 Rotas da API

O servidor disponibiliza as seguintes rotas que podem ser testadas no Postman:

| Recurso | Método | Endpoint | Descrição |
| :--- | :--- | :--- | :--- |
| **Projetos** | GET | `http://localhost:4001/projetos` | Lista todos os projetos |
| **Projetos** | POST | `http://localhost:4001/projetos` | Adiciona um novo projeto |
| **Projetos** | PUT | `http://localhost:4001/projetos/:id` | Atualiza um projeto existente |
| **Projetos** | DELETE | `http://localhost:4001/projetos/:id` | Remove um projeto |
| **Blog** | GET | `http://localhost:4001/blog` | Lista os posts do blog |
| **Blog** | POST | `http://localhost:4001/blog` | Cria um novo post |
| **Habilidades** | GET | `http://localhost:4001/habilidades` | Retorna as categorias de skills |

## 📂 Estrutura de Arquivos

*   `index.html`: Página principal do portfólio.
*   `admin.html`: Painel administrativo para realizar operações de POST, PUT e DELETE.
*   `script.js`: Lógica de consumo da API e manipulação do DOM.
*   `style.css`: Estilização visual (Modern & Dark Mode).
*   `db.json`: "Banco de dados" onde os itens são salvos de forma persistente.

## 📝 Funcionalidades Implementadas

*   **Scroll Interativo:** Menu lateral destaca a seção visível automaticamente.
*   **Consumo de API:** Todas as informações do site são buscadas na porta 4001.
*   **Painel Administrativo:** Permite gerenciar o conteúdo via API.
