# Conecta Care — Web

Portal web do Conecta Care, desenvolvido em Angular 21 com composição de componentes standalone, PrimeNG 21 (tema Aura) e bootstrap application.

## Stack

| Tecnologia | Versão |
|---|---|
| Angular | 21 (standalone, sem NgModules) |
| PrimeNG | 21 (tema Aura) |
| TypeScript | 5.x |
| Bootstrap | `bootstrapApplication` (standalone) |

## Como rodar

```bash
npm install
ng serve
```

Acesse `http://localhost:4200/`.

Para build de produção:

```bash
ng build --configuration production
```

## Estrutura de pastas

```
src/app/
├── core/
│   ├── enums/           # Enums (Role, Modulo, Status, etc.)
│   ├── guards/          # Auth guard, route guards
│   ├── interceptors/    # Token interceptor
│   ├── models/          # Interfaces e classes de domínio globais
│   ├── services/        # Serviços globais (API, domain services)
│   └── utils/           # Utilitários compartilhados
│
├── shared/
│   ├── components/      # Componentes reutilizáveis (standalone)
│   │   ├── cards/       # Card components
│   │   ├── forms/       # Form components
│   │   ├── modals/      # Modal components
│   │   ├── recaptcha/   # ReCAPTCHA component
│   │   └── selects/     # Select/dropdown components
│   ├── constants/       # Constantes da aplicação
│   ├── services/        # Serviços compartilhados (storage, validation, loading)
│   └── validations/     # Validadores customizados (CPF, email, etc.)
│
├── layout/
│   ├── navbar/          # Barra de navegação
│   ├── footer/          # Rodapé
│   ├── menu/            # Menu lateral
│   └── home/            # Home/dashboard layout
│
├── pages/               # Páginas estáticas (standalone)
│   ├── confirm-registration/
│   ├── confirm-password/
│   ├── waiting-email/
│   ├── terms/
│   └── privacy/
│
├── features/            # Módulos de features (todos standalone)
│   ├── auth/            # Autenticação, login
│   ├── registration/    # Fluxo de cadastro de usuários
│   ├── patients/        # Gerenciamento de pacientes
│   ├── professionals/   # Gerenciamento de profissionais
│   ├── homecares/       # Gerenciamento de homecares/atendimentos
│   ├── health-plans/    # Planos de saúde (operadoras)
│   ├── health-plan-branches/  # Filiais de planos de saúde
│   └── admin/           # Painel administrativo (eventos)
│
├── app.component.ts     # Componente raiz (standalone)
├── app.config.ts        # Configuração de providers (serviços, interceptadores)
└── app.routes.ts        # Definição de rotas (lazy loading por feature)

assets/
├── fonts/               # Fontes (.ttf, .woff)
├── img/                 # Imagens
├── js/                  # JavaScript externo (jQuery, plugins)
└── css/                 # Estilos globais

environments/           # Configuração por ambiente (dev, staging, prod)
```

## Arquitetura

### Componentes Standalone

Todos os componentes utilizam a API moderna do Angular com `standalone: true`:

```typescript
@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...],
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent { }
```

**Benefícios:**
- ✅ Sem `NgModule` boilerplate
- ✅ Imports explícitos e treeshakeable
- ✅ Melhor tree-shaking do bundler
- ✅ Componentes reutilizáveis entre projetos

### Lazy Loading

Cada feature é carregada sob demanda via `app.routes.ts`:

```typescript
{
  path: 'patients',
  loadChildren: () => import('./features/patients/patients.routes')
    .then(m => m.PATIENTS_ROUTES),
  canActivate: [authGuard]
}
```

### Core Services

Serviços globais injetados uma única vez via `app.config.ts`:
- API calls (HttpClient)
- Autenticação (LoginService, AuthGuard)
- Storage (LocalStorage, SessionStorage)
- Loading state (SharedLoadingService)

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `ng serve` | Servidor de desenvolvimento (`localhost:4200`) |
| `ng build` | Build de desenvolvimento |
| `ng build --configuration production` | Build de produção otimizado |
| `ng test` | Testes unitários via Karma |
| `ng e2e` | Testes end-to-end |
| `ng lint` | Linting (ESLint) |

## Configuração de Ambiente

Variáveis de ambiente em `src/environments/`:

- `environment.ts` — Desenvolvimento (padrão)
- `environment.staging.ts` — Staging
- `environment.prod.ts` — Produção

## Refactoring Completado

✅ **Versão 2.0** — Angular 21 Standalone:
- [x] Migração para componentes standalone (sem NgModules)
- [x] Reorganização em core / shared / features / layout / pages
- [x] Tradução de nomes PT → EN
- [x] Lazy loading por feature
- [x] Tree-shaking otimizado
- [x] Bootstrap application moderno

Histórico completo: ver `REFACTORING_v2.md`
