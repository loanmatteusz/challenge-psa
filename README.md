# Fullstack Finance App

Este é um projeto fullstack composto por uma **API** em [NestJS](https://nestjs.com/) e uma **interface web (UI)** em [Next.js](https://nextjs.org/), ambos organizados em containers Docker e orquestrados via `docker-compose`.

---

## 🧱 Estrutura do Projeto

```
./
├── api/         # Backend (NestJS)
├── ui/          # Frontend (Next.js)
└── docker-compose.yml
```

---

## 🚀 Como rodar o projeto

Certifique-se de ter o **Docker** e o **Docker Compose** instalados em sua máquina.  
Para subir todos os serviços, execute o seguinte comando na raiz do projeto:

```bash
docker compose up --build
```

---

## 🌐 Acessos

### 🛠 API (NestJS)

- Base URL: `http://localhost:8080/api`

#### Rotas principais:

- `POST /api/auth/register` – Cadastro de novo usuário
- `POST /api/auth/login` – Login de usuário
- `GET /api/users` – Lista de usuários
- `GET /api/transaction` – Lista de transações
- `GET /api/category` – Lista de categorias

> As rotas exigem autenticação via token JWT.

### Rota da documentação via Swagger
- `GET /api/docs` – Documentação Swagger da API

---

### 🎨 UI (Next.js)

- URL: `http://localhost:3000`

#### Páginas principais:

- `/sign-in` – Tela de login  
- `/sign-up` – Tela de cadastro  
- `/transaction` – Gerenciamento de transações  
- `/category` – Gerenciamento de categorias

---

## 📝 Notas

- O backend expõe a API na porta **8080** com o prefixo `/api`.
- O frontend roda na porta **3000** e consome a API via `/api`.
- O Swagger pode ser acessado diretamente em `http://localhost:8080/api/docs`.

---

## 📦 Tecnologias Utilizadas

- **Backend:** NestJS, Swagger, JWT Auth, PostgreSQL (se incluído no docker-compose)
- **Frontend:** Next.js, React, Axios
- **DevOps:** Docker, Docker Compose

---

## 📄 Licença

Este projeto é open-source e pode ser usado como base para aplicações financeiras ou outros CRUDs similares.