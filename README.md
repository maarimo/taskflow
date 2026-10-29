# TaskFlow

Aplicação web para gerenciamento de tarefas, desenvolvida para praticar integração entre frontend, backend e banco de dados.

## Funcionalidades

- Cadastro de tarefas com título, descrição e prioridade.
- Listagem de tarefas.
- Edição de tarefas existentes.
- Conclusão de tarefas.
- Exclusão de tarefas com confirmação.
- Filtro por status.
- Indicadores de tarefas.
- Persistência dos dados em banco SQLite.
- Tratamento de erros e estados de carregamento.

## Tecnologias

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- Node.js
- NestJS
- TypeScript
- TypeORM
- SQLite

## Pré-requisitos

- Node.js e npm.
- Git.

## Como executar

### 1. Clonar o repositório

```bash
git clone URL_DO_SEU_REPOSITORIO
cd taskflow
```

Substitua `URL_DO_SEU_REPOSITORIO` pela URL HTTPS do seu repositório no GitHub.

### 2. Iniciar o backend

Abra um terminal:

```bash
cd backend
npm install
npm run start:dev
```

A API ficará disponível em `http://localhost:3000`.

### 3. Iniciar o frontend

Abra outro terminal, a partir da pasta raiz:

```bash
cd frontend
npm install
npm run dev
```

A aplicação ficará disponível no endereço exibido pelo Vite, normalmente `http://localhost:5173`.

## API

| Método | Endpoint | Descrição |
|---|---|---|
| GET | `/tarefas` | Lista tarefas |
| GET | `/tarefas?status=PENDENTE` | Filtra por status |
| GET | `/tarefas/:id` | Busca uma tarefa |
| POST | `/tarefas` | Cadastra uma tarefa |
| PATCH | `/tarefas/:id` | Atualiza uma tarefa |
| DELETE | `/tarefas/:id` | Exclui uma tarefa |

## Banco de dados

Os dados são armazenados localmente em SQLite, com persistência entre reinicializações da API.

## Objetivo do projeto

Projeto de portfólio para praticar desenvolvimento full stack, criação de APIs REST, validação de dados, persistência relacional e integração entre React e NestJS.

## Autor

Desenvolvido como projeto de estudos e portfólio.