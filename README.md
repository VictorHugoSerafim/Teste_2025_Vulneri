# Teste Vulneri 2025

Este projeto consiste em um sistema de gerenciamento de tarefas colaborativas com autenticação de usuários, desenvolvido como parte do Teste Vulneri 2025.

---

## ✅ Como executar o projeto

Após clonar este repositório, siga os passos abaixo para iniciar o **backend** e o **frontend** do projeto:

### 1. Criar o banco de dados PostgreSQL

```bash
psql -U postgres
CREATE DATABASE task_manager;
```

> Substitua `postgres` pelo seu nome de usuário do PostgreSQL, se necessário.

---

### 2. Executar o Backend

```bash
cd backend
npm install
npm run dev
```

---

### 3. Executar o Frontend

```bash
cd ../frontend
npm install
ng serve
```

> Isso iniciará o frontend em `http://localhost:4200`.

---

## ⚙️ Tecnologias utilizadas

### 🛠 Backend

- **Node.js com Express**  
  API RESTful leve e escalável para gerenciamento de tarefas e usuários.

- **PostgreSQL**  
  Banco de dados relacional para persistência de dados.

- **Sequelize**  
  ORM para modelagem de dados e mapeamento objeto-relacional.

- **JWT (JSON Web Token)**  
  Autenticação segura e baseada em tokens para rotas protegidas.

- **Middleware de Autenticação**  
  Validação automática de tokens JWT antes de acessar rotas privadas.

- **Cadastro e Login de Usuários**  
  Geração de token JWT ao efetuar login com sucesso.

- **CRUD de Tarefas**  
  Criação, leitura, atualização e exclusão de tarefas por usuário autenticado.

---

### 🎨 Frontend

- **Angular com Angular Material**  
  Interface moderna, responsiva e baseada em Material Design.

- **Requisições autenticadas via JWT**  
  Comunicação segura com a API backend utilizando token.

- **Interceptor HTTP**  
  Inclusão automática do token JWT no cabeçalho de cada requisição.

- **AuthGuard (Proteção de rotas)**  
  Bloqueio de rotas para usuários não autenticados.

- **Telas de Login e Registro**  
  Integração direta com a API backend para autenticação de usuários.

---

## ⚠️ Observação

Nem todos os requisitos do teste foram concluídos por conta do tempo disponível. No entanto, o backend está **totalmente funcional**, e as APIs podem ser testadas via **Postman** conforme abaixo.

---

## 📫 Rotas da API para Testes (via Postman)

> Base URL: `http://localhost:3000/api`

### 🔐 Autenticação

- **Registrar Usuário**

```http
POST /auth/register
Body:
{
  "username": "Usuário 1",
  "email": "usuario1@email.com",
  "password": "123456"
}
```

- **Login**

```http
POST /auth/login
Body:
{
  "email": "usuario1@email.com",
  "password": "123456"
}
```

> Copie o token JWT retornado e adicione nos headers das próximas requisições:  
> `"Authorization": "Bearer {{token}}"`

---

### ✅ Tarefas

- **Criar Tarefa**

```http
POST /tasks
Body:
{
  "title": "Primeira tarefa",
  "description": "teste",
  "dueDate": "2025-08-02"
}
```

- **Listar Tarefas**

```http
GET /tasks
```

- **Atualizar Tarefa**

```http
PUT /tasks/1
Body:
{
  "title": "Atualizado!",
  "status": "em andamento"
}
```

> Substitua `1` pelo ID da tarefa a ser atualizada.

- **Deletar Tarefa**

```http
DELETE /tasks/1
```

> Substitua `1` pelo ID da tarefa a ser deletada.

- **Compartilhar Tarefa**

```http
POST /tasks/share
Body:
{
  "taskId": 1,
  "userIdToShare": 2
}
```

---

## 🧑‍💻 Autor

Desenvolvido por [VictorHugoSerafim] durante o Teste Vulneri 2025.
