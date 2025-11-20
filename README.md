# Desafio React Loomi

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

## 🚀 Configuração Mínima

### Estado Global (Zustand)
- Store simples de autenticação em `src/lib/stores/auth-store.ts`

### Data Fetching (TanStack Query)
- Configuração básica em `src/lib/query/query-client.ts`
- Hooks de exemplo em `src/lib/hooks/use-api.ts`

### API Client
- Cliente fetch básico em `src/lib/api/http-client.ts`
- Endpoints organizados em `src/lib/api/endpoints.ts`

### Padrão de Arquitetura
- Cada rota `app/` importa uma página do módulo correspondente
- Separação entre roteamento e lógica de negócio

## 📝 Próximos Passos

- [ ] Implementar página de login
- [ ] Criar dashboard com KPIs
- [ ] Desenvolver gestão de tickets
- [ ] Adicionar simulador de planos
- [ ] Implementar customer 360