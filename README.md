# Desafio React Loomi

Dashboard administrativo desenvolvido com Next.js 16, TypeScript e Tailwind CSS, implementando autenticação, gerenciamento de estado e integração com API mock.

## ✨ Funcionalidades Implementadas

### 🔐 Sistema de Autenticação
- **Formulário de Login** com validação de e-mail e senha
- **Integração com API** mock via endpoint `/login.json`
- **Armazenamento seguro**: Token em cookies + dados do usuário em localStorage
- **Notificações toast** para feedback de sucesso/erro (Sonner)
- **Funcionalidade "Lembrar de mim"** com duração configurável (7 ou 30 dias)
- **Validações robustas** com Zod + React Hook Form
- **Design responsivo** e moderno

### 🛠️ Stack Técnica
- **Next.js 16** (App Router)
- **TypeScript** para type safety
- **Tailwind CSS 4** para estilização
- **Zustand** para gerenciamento de estado global
- **TanStack Query** para data fetching
- **React Hook Form + Zod** para validação de formulários
- **Sonner** para notificações toast
- **shadcn/ui** componentes reutilizáveis

## 📁 Estrutura do Projeto

```
src/
├── app/              # Rotas do Next.js
├── modules/          # Módulos de negócio
│   ├── auth/
│   ├── dashboard/
│   ├── tickets/
│   ├── plans/
│   └── customer360/
└── lib/              # Configurações básicas
    ├── api/
    ├── hooks/
    ├── query/
    └── stores/
```

## 🚀 Como Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:
```bash
NEXT_PUBLIC_API_BASE_URL=https://loomi.s3.us-east-1.amazonaws.com/mock-api-json/v2
```

### 3. Rodar o Projeto
```bash
npm run dev
```

Acesse: `http://localhost:3000/login`

## 🧪 Testando a Autenticação

1. Acesse `/login`
2. Insira um e-mail válido (ex: `usuario@teste.com`)
3. Digite qualquer senha (máx. 12 caracteres)
4. Marque "Lembrar de mim" (opcional)
5. Clique em "Entrar"
6. Redirecionamento automático para `/dashboard`

**Armazenamento:**
- 🍪 Token salvo em **cookies** (`auth-token`)
- 💾 Dados do usuário em **localStorage** (`user-data`)

## 📂 Arquitetura do Código

### Módulo de Autenticação (`src/modules/auth/`)
```
auth/
├── components/
│   ├── login-form.tsx        # Formulário com validações
│   └── header-actions.tsx    # Ações do header
├── hooks/
│   └── useLogin.ts           # Lógica de autenticação
├── services/
│   └── auth-service.ts       # Integração com API
├── schemas/
│   └── login-schema.ts       # Validações Zod
└── pages/
    └── login-pages.tsx       # Página completa
```

### Configurações Globais (`src/lib/`)
- **API**: Cliente HTTP + endpoints organizados
- **Stores**: Zustand para estado global
- **Utils**: Cookies, formatadores, etc
- **Providers**: Theme provider + Query provider

## 📡 Endpoints Disponíveis

| Endpoint | Descrição |
|----------|-----------|
| `/login.json` | Autenticação |

## 📝 Próximos Passos

- [x] Implementar página de login ✅
- [ ] Criar dashboard com KPIs
- [ ] Desenvolver gestão de tickets
- [ ] Adicionar simulador de planos
- [ ] Implementar customer 360
- [ ] Adicionar guards de rotas protegidas