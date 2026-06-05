# EduTask Manager

Este projeto é uma aplicação web desenvolvida em Angular, seguindo o padrão MVC (Model-View-Controller), que oferece funcionalidades de CRUD (Create, Read, Update, Delete) para tarefas e categorias, além de um sistema de autenticação de usuários. Os dados são armazenados localmente no `localStorage` do navegador.

## Funcionalidades

- **Autenticação de Usuários**: Registro, Login e Logout.
- **Gerenciamento de Tarefas**: Adicionar, visualizar, editar, marcar como concluída e excluir tarefas.
- **Categorias**: CRUD completo para categorias (adicionar, editar, excluir), permitindo organizar as tarefas por cores e nomes personalizados.
- **Persistência de Dados**: Todos os dados (usuários, tarefas, categorias) são armazenados no `localStorage`.
- **Proteção de Rotas**: Acesso ao dashboard restrito a usuários autenticados.

## Estrutura do Projeto

O projeto segue uma estrutura modular e organizada, com as seguintes pastas principais dentro de `src/app`:

- `models/`: Contém as interfaces TypeScript para as entidades `User`, `Task` e `Category`.
- `services/`: Inclui os serviços `AuthService` (para autenticação) e `DataService` (para manipulação de dados no `localStorage`).
- `guards/`: Contém o `AuthGuard` para proteger rotas que exigem autenticação.
- `pages/`: Componentes que representam as páginas principais da aplicação (Login, Register, Dashboard).
- `components/`: Componentes reutilizáveis (TaskForm, TaskList).

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão v22.20.0 recomendada)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
- [Angular CLI](https://angular.io/cli) (versão 21.2.13)

## Instalação

Siga os passos abaixo para configurar e executar o projeto em sua máquina local:

1. **Clone o repositório** (se aplicável, ou descompacte os arquivos do projeto):
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd edutask-manager
   ```
   *Se você recebeu os arquivos diretamente, apenas navegue até a pasta `edutask-manager`.*

2. **Instale as dependências**:
   ```bash
   npm install
   ```

## Execução da Aplicação

Para iniciar o servidor de desenvolvimento e visualizar a aplicação no navegador:

```bash
ng serve
```

Após a execução do comando, a aplicação estará disponível em `http://localhost:4200/` (ou outra porta, se 4200 estiver em uso). O navegador será aberto automaticamente.

## Utilização no Visual Studio Code

O projeto está configurado para ser facilmente aberto e desenvolvido no Visual Studio Code. Basta abrir a pasta `edutask-manager` no VS Code. As extensões recomendadas para desenvolvimento Angular serão sugeridas automaticamente.

## Desenvolvimento

### Gerar Componentes, Services, etc.

Para gerar novos componentes, serviços, módulos, etc., utilize o Angular CLI:

```bash
ng generate component <nome-do-componente>
ng generate service <nome-do-servico>
ng generate guard <nome-do-guard>
# E assim por diante...
```

### Testes

Para executar os testes unitários:

```bash
ng test
```

Para executar os testes end-to-end:

```bash
ng e2e
```

### Build para Produção

Para construir o projeto para deploy em ambiente de produção:

```bash
ng build
```

Os arquivos de build serão gerados na pasta `dist/`.

#### José Carlos Flores
---

## 👤 GitHub

[![Foto de Perfil](https://github.com/floresjcd.png?size=50)](https://github.com/floresjcd) 
**[@floresjcd](https://github.com/floresjcd)**