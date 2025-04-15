# Estrutura do Projeto MealTracker

Este documento descreve a nova estrutura de pastas do projeto MealTracker, baseada em princípios de Clean Architecture e organização por features.

## Visão Geral

```
/src
  /core                   # Core da aplicação (domínio e infraestrutura)
  /features               # Funcionalidades específicas
  /shared                 # Componentes e utilidades compartilhadas
  /app                    # Rotas da aplicação (Next.js App Router)
```

## Detalhamento das Pastas

### Core

Contém o coração da aplicação, independente de frameworks específicos.

```
/core
  /domain
    /entities            # Definições de entidades e regras de negócio
    /dtos                # Data Transfer Objects
    /enums               # Enumerações reutilizáveis
  /infrastructure
    /database            # Conexão e acesso ao banco de dados
      /models            # Modelos do Mongoose
      /repositories      # Repositórios para acesso aos dados
    /validators          # Validadores usando Zod
```

### Features

Organiza o código por funcionalidades/domínios da aplicação.

```
/features
  /refeicoes             # Feature de gerenciamento de refeições
    /components          # Componentes específicos da feature
    /hooks               # Hooks personalizados da feature
    /api                 # Serviços cliente para interação com a API
  /dashboard             # Feature de dashboard
    /components          # Componentes específicos do dashboard
```

### Shared

Componentes, hooks e utilidades reutilizáveis.

```
/shared
  /components
    /ui                  # Componentes UI básicos
    /layout              # Componentes de layout
  /hooks                 # Hooks genéricos
  /utils                 # Funções utilitárias
```

### App

Rotas do Next.js seguindo a estrutura do App Router.

```
/app
  /api
    /refeicoes           # API para manipulação de refeições
      /[id]              # Endpoint para refeição específica
  /refeicoes             # Página de refeições
  /dashboard             # Página de dashboard
  layout.tsx             # Layout principal
  page.tsx               # Página inicial
```

## Princípios da Estrutura

1. **Separação de Responsabilidades**: Cada parte do código tem um propósito bem definido
2. **Independência de Frameworks**: Core do sistema é independente de frameworks
3. **Organização por Feature**: Facilita a manutenção e descoberta de código
4. **Componentização**: Componentes pequenos e reutilizáveis
5. **Testabilidade**: Estrutura facilita a criação de testes unitários e de integração

## Fluxo de Dados

1. **UI (App/Features)** → Interface com o usuário
2. **Hooks/Serviços (Features)** → Gerencia o estado e chama APIs
3. **API Routes (App/Api)** → Recebe requisições e chama os repositórios
4. **Repositórios (Core/Infrastructure)** → Acessa o banco de dados
5. **Entidades (Core/Domain)** → Define os modelos e regras de negócio

## Benefícios

- **Escalabilidade**: Fácil adicionar novas features sem conflitos
- **Manutenção**: Código organizado por domínio, com separação clara
- **Reuso**: Componentes e lógica podem ser reaproveitados
- **Testabilidade**: Separação de responsabilidades facilita testes
- **Desacoplamento**: Menor dependência entre partes do sistema

## Migração

A migração foi realizada gradualmente, movendo arquivos para suas novas localizações e ajustando importações. Os componentes foram adaptados para usar as novas camadas de serviço e repositórios. 