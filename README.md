# NutrSync

Uma aplicação full stack para registrar, visualizar, editar e excluir refeições diárias.

## Funcionalidades

- ✅ CRUD completo de refeições
- ✅ Dashboard com refeições do dia atual e total de calorias
- ✅ Filtro por tipo de refeição
- ✅ Marcar refeições como favoritas
- ✅ Interface responsiva e elegante
- ✅ API interna para gerenciar os dados

## Stack Tecnológica

- **Frontend**
  - Next.js 14 (App Router)
  - Tailwind CSS
  - React Hook Form + Zod
  - TypeScript

- **Backend**
  - API Routes do Next.js
  - MongoDB Atlas
  - Mongoose

- **Deploy**
  - Vercel

## Como executar

1. Clone o repositório
2. Instale as dependências
   ```bash
   npm install
   ```
3. Crie um arquivo `.env.local` na raiz do projeto com suas variáveis de ambiente (ver `.env.example`)
4. Execute o projeto
   ```bash
   npm run dev
   ```
5. Acesse `http://localhost:3000`

## Estrutura do Projeto

```
/src
  /app
    /api
      /refeicoes
        /[id]
          route.ts
        route.ts
    /refeicoes
      page.tsx
    layout.tsx
    page.tsx
  /components
    /forms
      FormRefeicao.tsx
    /ui
      Dashboard.tsx
      FiltroTipo.tsx
      RefeicaoCard.tsx
  /hooks
    useRefeicoes.ts
  /lib
    mongodb.ts
    utils.ts
  /models
    Refeicao.ts
  /types
    globals.d.ts
```

## Autor

Ricardo Macedo Filho
