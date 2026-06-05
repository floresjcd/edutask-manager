# Documentação Técnica: EduTask Manager

## 1. Introdução

O EduTask Manager é uma aplicação web desenvolvida em Angular, projetada para auxiliar no gerenciamento pessoal de tarefas. A aplicação segue o padrão arquitetural Model-View-Controller (MVC) e utiliza o `localStorage` do navegador para persistência de dados, eliminando a necessidade de um backend tradicional. Inclui funcionalidades essenciais como autenticação de usuários e operações CRUD (Create, Read, Update, Delete) para tarefas e categorias.

Esta versão foi especificamente validada e configurada para ser compatível com:
- **Node.js**: v22.20.0
- **Angular**: 21.2.13
- **TypeScript**: ~5.9.2

## 2. Arquitetura da Aplicação (MVC no Contexto Angular)

Embora o Angular seja um framework de componentes, a estrutura do projeto foi pensada para refletir os princípios do MVC, adaptando-os ao ecossistema Angular:

-   **Model**: Representado pelas interfaces TypeScript (`User`, `Task`, `Category`) localizadas em `src/app/models/`. Estas interfaces definem a estrutura dos dados utilizados na aplicação.

-   **View**: Corresponde aos templates HTML (`.html`) e arquivos de estilo (`.css`) dos componentes Angular. Estes são responsáveis pela apresentação visual e interação com o usuário.

-   **Controller**: Implementado pelas classes TypeScript (`.ts`) dos componentes Angular. Cada componente atua como um controlador para sua respectiva view, gerenciando a lógica de negócios, o estado do componente e a interação com os serviços.

-   **Services**: Uma camada de abstração que encapsula a lógica de persistência de dados e autenticação. Os serviços (`AuthService`, `DataService`) são injetáveis e fornecem métodos para manipular os dados no `localStorage` e gerenciar o estado de autenticação do usuário.

## 3. Entidades de Dados

A aplicação gerencia três entidades principais:

### 3.1. User

Representa um usuário do sistema. Armazena informações de autenticação e dados básicos.

| Propriedade | Tipo     | Descrição                               |
| :---------- | :------- | :-------------------------------------- |
| `id`        | `string` | Identificador único do usuário.         |
| `name`      | `string` | Nome completo do usuário.               |
| `email`     | `string` | Endereço de e-mail (usado para login).  |
| `password`  | `string` | Senha do usuário (opcional em alguns contextos, como após o login). |

### 3.2. Category

Permite categorizar as tarefas para melhor organização.

| Propriedade | Tipo     | Descrição                               |
| :---------- | :------- | :-------------------------------------- |
| `id`        | `string` | Identificador único da categoria.       |
| `name`      | `string` | Nome da categoria (ex: Trabalho, Estudo). |
| `color`     | `string` | Cor associada à categoria (para UI).    |

### 3.3. Task

Representa uma tarefa a ser gerenciada pelo usuário.

| Propriedade  | Tipo      | Descrição                               |
| :----------- | :-------- | :-------------------------------------- |
| `id`         | `string`  | Identificador único da tarefa.          |
| `title`      | `string`  | Título breve da tarefa.                 |
| `description`| `string`  | Descrição detalhada da tarefa.          |
| `dueDate`    | `string`  | Data de vencimento da tarefa (formato YYYY-MM-DD). |
| `completed`  | `boolean` | Indica se a tarefa foi concluída.      |
| `categoryId` | `string`  | ID da categoria à qual a tarefa pertence. |
| `userId`     | `string`  | ID do usuário proprietário da tarefa.   |

## 4. Serviços

### 4.1. `AuthService` (`src/app/services/auth.service.ts`)

Responsável por gerenciar a autenticação de usuários. Utiliza o `localStorage` para armazenar a lista de usuários registrados (`edutask_users`) e o usuário atualmente logado (`edutask_current_user`).

-   `register(user: User)`: Registra um novo usuário. Retorna `true` se o registro for bem-sucedido, `false` se o e-mail já estiver em uso.
-   `login(email: string, password: string)`: Autentica um usuário. Retorna `true` se as credenciais forem válidas, `false` caso contrário.
-   `logout()`: Desloga o usuário e remove as informações de sessão do `localStorage`.
-   `isAuthenticated()`: Verifica se há um usuário logado.
-   `currentUser`: Um `signal` que mantém o estado do usuário logado, reativo a mudanças.

### 4.2. `DataService` (`src/app/services/data.service.ts`)

Gerencia as operações CRUD para tarefas e categorias, persistindo os dados no `localStorage`.

-   `initDefaultCategories()`: Inicializa categorias padrão se nenhuma existir.
-   `getCategories()`: Retorna todas as categorias.
-   `addCategory(category: Category)`: Adiciona uma nova categoria.
-   `getTasks()`: Retorna as tarefas do usuário logado.
-   `addTask(task: Task)`: Adiciona uma nova tarefa associada ao usuário logado.
-   `updateTask(updatedTask: Task)`: Atualiza uma tarefa existente.
-   `deleteTask(id: string)`: Exclui uma tarefa pelo ID.

## 5. Guards

### 5.1. `AuthGuard` (`src/app/guards/auth.guard.ts`)

Uma função `CanActivateFn` que protege as rotas, garantindo que apenas usuários autenticados possam acessá-las. Se o usuário não estiver autenticado, ele é redirecionado para a página de login.

## 6. Componentes e Páginas

### 6.1. Páginas (`src/app/pages/`)

-   **`LoginComponent`**: Interface para o login de usuários. Interage com `AuthService`.
-   **`RegisterComponent`**: Interface para o registro de novos usuários. Interage com `AuthService`.
-   **`DashboardComponent`**: Página principal após o login. Exibe a lista de tarefas, permite adicionar novas tarefas e gerencia o logout. Interage com `AuthService` e `DataService`.

### 6.2. Componentes Reutilizáveis (`src/app/components/`)

-   **`TaskFormComponent`**: Formulário para criação e edição de tarefas. Recebe categorias e a tarefa a ser editada como `@Input()` e emite eventos para salvar ou cancelar a edição.
-   **`TaskListComponent`**: Exibe a lista de tarefas. Recebe as tarefas e categorias como `@Input()` e emite eventos para alternar status, editar ou excluir tarefas.
105	-   **`CategoryManagerComponent`**: Gerencia o CRUD de categorias. Permite criar novas categorias com cores personalizadas, editar nomes/cores existentes e excluir categorias.

## 7. Roteamento (`src/app/app.routes.ts`)

O arquivo `app.routes.ts` define as rotas da aplicação:

-   `/`: Redireciona para `/dashboard`.
-   `/login`: Rota para o `LoginComponent`.
-   `/register`: Rota para o `RegisterComponent`.
-   `/dashboard`: Rota para o `DashboardComponent`, protegida pelo `AuthGuard`.
-   `**`: Rota curinga que redireciona para `/dashboard` (tratamento de rotas não encontradas).

## 8. Estilização (`src/styles.css`)

O arquivo `src/styles.css` contém estilos globais e utilitários para a aplicação, incluindo variáveis CSS para cores e espaçamentos, e estilos para formulários, botões e layouts básicos das páginas de autenticação e dashboard.

## 9. Configuração do Ambiente de Desenvolvimento

Para configurar o ambiente e executar a aplicação, consulte o arquivo `README.md` na raiz do projeto. Ele detalha os pré-requisitos, passos de instalação e comandos para execução e build.

#### José Carlos Flores
---

## 👤 GitHub

[![Foto de Perfil](https://github.com/floresjcd.png?size=50)](https://github.com/floresjcd) 
**[@floresjcd](https://github.com/floresjcd)**