# Desafio React Loomi

Dashboard administrativo desenvolvido com Next.js 16, TypeScript e Tailwind CSS, implementando autenticação, gerenciamento de estado e integração com API mock.

## ✨ Funcionalidades Implementadas

### 🌐 Internacionalização (i18n)
- **Arquivos de idioma** em `public/locales/{pt-BR,en}` organizados por namespace (`common`, `auth`, `dashboard`, `tickets`, `plans`, `view360`, etc.).
- **Integração react-i18next** centralizada em `src/lib/i18n.ts` com `LanguageDetector` (persistindo a escolha em `localStorage`/cookies) e tipagem dos namespaces.
- **Provider global** (`src/lib/providers/i18n-provider.tsx`) envolve o App para disponibilizar `useTranslation` em qualquer componente.
- **Seletor de idioma** no header do login (`HeaderActions`) usando `i18n.changeLanguage`, refletindo o idioma atual e respeitando o detector.
- **Módulos migrados**: Login, Dashboard, Tickets (em andamento), Planos e Visão 360 estão sendo traduzidos iterativamente com `t('namespace.chave')`.

### 🔐 Sistema de Autenticação
- **Formulário de Login** com validação de e-mail e senha
- **Integração com API** mock via endpoint `/login.json`
- **Armazenamento seguro**: Token em cookies + dados do usuário em localStorage
- **Notificações toast** para feedback de sucesso/erro (Sonner)
- **Funcionalidade "Lembrar de mim"** com duração configurável (7 ou 30 dias)
- **Validações robustas** com Zod + React Hook Form
- **Design responsivo** e moderno
- **Proxy (middleware)** protegendo rotas privadas com base no cookie `auth-token`
- **Redirecionamento inteligente**: após login o usuário volta para a rota solicitada (`redirectTo`)


### KPI Dashboard
- **Hooks**: `useDashboardData`, `useDashboardMapData` e `useInvalidateDashboardQueries` para buscar, manter cache e invalidar KPIs e mapa.
- **Services**: `getDashboardData()` e `getMapData()` encapsulam chamadas aos endpoints `/dash.json` e `/map.json`.
- **Types**: `DashboardData`, `ActiveClients`, `ActiveClientItem`, `ActiveClientFilters`, além dos tipos auxiliares das séries de KPI.
- **Dashboard dinâmico**: gráficos, cards, mapa (clientes por região) e tabela de clientes ativos consumindo `/dash.json` e `/map.json` com cache e skeletons de carregamento

### 📊 Lista de Clientes Ativos
- Filtro textual único para nome ou e-mail com atualização instantânea
- Combinação de filtros por status, tipo de seguro e localização
- Tabela com ordenação por coluna usando TanStack Table e feedback quando não há resultados

### Tickets
- **Hooks**: `useTicketsData` e `useInvalidateTicketsQueries` gerenciam o cache de tickets via TanStack Query com delay simulado e invalidation centralizada.
- **Services**: `getTicketsData()` encapsula a chamada ao endpoint `/tickets.json` usando o `api` compartilhado.
- **Types**: `TicketsResponse`, `TicketItem`, `TicketsResume`, `TicketPriority` e `TicketStatus` garantem tipagem da listagem, filtros e resumo.
- **Criação e Edição**: Implementada a funcionalidade de criação e edição dos Tickets com persistência de dados.

### Persistência de Dados em Tickets
- Implementei uma camada de persistência em localStorage para manter um clone da resposta do GET e suportar operações simuladas de criação/edição:
- Adicionei src/modules/tickets/services/tickets-storage.ts, responsável por garantir o clone (ensureTicketsClone), ler/gravar (getTicketsClone, setTicketsClone) e atualizar (updateTicketsClone) os dados persistidos. O clone é inicializado na primeira vez que o GET roda e permanece disponível após refresh.
- Atualizei getTicketsData em tickets-service.ts para sempre retornar esse clone persistido ao invés da resposta crua da API.
- Criei as funções createTicket e updateTicket, que operam sobre o clone usando updateTicketsClone, recalculam o resumo (contagem por status) e persistem o resultado. IDs são gerados via crypto.randomUUID (com fallback).
- Mantive useTicketsData e os componentes inalterados: após chamar createTicket/updateTicket, basta invalidar/com revalidar a query (ex.: useInvalidateTicketsQueries) para refletir os dados persistidos.
- Assim, novas criações/edições permanecem mesmo após recarregar a página; para limpar basta remover a chave de storage (há resetTicketsClone caso queira limpar).

### Gestão de Planos
- **Planos**: Tela de gestão de planos onde você consegue criar um plano personalizado ou apenas selecionar um plano padrão. Mostra beneícios inclusos e Indicadores de cada plano.
- **Hooks**: `usePlansData` e `useInvalidatePlansQueries` gerenciam o cache de dados dos planos via TanStack Query com delay simulado e invalidation centralizada.
- **Services**: `getPlansData()` encapsula a chamada ao endpoint `/plans.json` usando o `api` compartilhado.
- **Types**: `PlansResponse`, `PlanIndicator` e `PlansData` garantem tipagem dos benefícios inclusos e indicadores de cada plano (conversão, ROI e valor).

### Visão 360º
- **Planos**: Tela Visão 360º combina os componentes `ClientInfoSidebar`, `AISuggestions`, `SmartClassification` e `SuggestionCards` para exibir perfil completo, produtos contratados, frases captadas e ofertas recomendadas pela IA.
- **Hooks**: `useView360Data` e `useInvalidateView360Queries` cuidam do fetch/cache do endpoint `/360-view.json`, com delay simulado e invalidação centralizada via TanStack Query.
- **Services**: `getView360Data()` encapsula a chamada ao endpoint `/360-view.json` através do `api` compartilhado.
- **Types**: `View360Data`, `Client`, `Product`, `Suggestion`, `SuggestionsIA`, `SmartClassification`, `CapturedPhrase` e `AppAction` descrevem o payload completo usado pelos componentes.

### Chat
- **Chat**: Tela de atendimento com histórico, input e sidebar inteligente (dados do cliente, perfil, ações e sugestões IA).
- **Hooks**: `useChatsData` centraliza o fetch/cache do transcript, insights e próximos passos; integra com `useView360Data` para enriquecer o sidebar.
- **Services**: Dados mockados consumidos via TanStack Query, prontos para apontar para um endpoint real quando necessário.
- **Types**: `ChatMessage`, `ChatTranscript`, `ChatInsight`, `ChatAction` e `ChatsData` tipam mensagens, recomendações e ações futuras.

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
│   ├── login/
│   ├── (authenticated)/
│   │   ├── dashboard/
│   │   ├── tickets/
│   │   ├── plans/
│   │   ├── chats/
│   │   └── view-360/
│   └── globals.css
├── modules/          # Módulos de negócio
│   ├── auth/
│   ├── dashboard/
│   ├── tickets/
│   ├── plans/
│   └── customer360/
└── lib/              # Configurações básicas
    ├── api/
    ├── config/
    ├── providers/
    ├── query/
    ├── utils/
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
6. Após o sucesso, você volta para a rota que tentou acessar (ex.: `/dashboard`, `/tickets`, etc.)

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
- **Services e hooks**: `getDashboardData()`/`getMapData()` e `useDashboardData()`/`useMapData()` com cache via TanStack Query (mapa construído com [react-map-gl](https://github.com/visgl/react-map-gl#readme))

## 📡 Endpoints Disponíveis

| Endpoint | Descrição |
|----------|-----------|
| `/login.json` | Autenticação |
| `/dash.json` | KPIs, Mapa de Impacto, Gráficos de Métricas e Clientes Ativos |
| `/map.json` | Dados geográficos para o mapa 360 |

## 📝 Próximos Passos

- [x] Implementar página de login ✅
- [x] Criar dashboard
- [x] Desenvolver gestão de tickets
- [x] Adicionar simulador de planos
- [x] Implementar customer 360
- [x] Adicionar guards de rotas protegidas