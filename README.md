# Conecta Care — Web

Portal web do Conecta Care, desenvolvido em Angular 21 com PrimeNG 21 (tema Aura) e bootstrap standalone.

## Stack

| Tecnologia | Versão |
|---|---|
| Angular | 21 |
| PrimeNG | 21 (tema Aura) |
| TypeScript | 5.x |
| Bootstrap | Standalone (via `bootstrapApplication`) |

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
src/
├── app/
│   ├── admin/           # Módulo admin (eventos)
│   ├── auth/            # Autenticação (guards, serviços, login)
│   ├── core/
│   │   └── services/    # StorageService e serviços globais
│   ├── enums/           # Enums (Role, Modulo)
│   ├── planos-saude/    # Módulo planos de saúde (operadoras)
│   ├── planos-saude-filial/ # Módulo planos de saúde filial
│   ├── registration/    # Fluxo de cadastro
│   ├── services/
│   │   └── feat/        # Interfaces de domínio (Valid, etc.)
│   └── shared/
│       ├── components/  # Componentes reutilizáveis
│       ├── services/    # SharedValidService, SharedTokenService
│       └── validations/ # Validações customizadas
├── assets/
│   ├── fonts/           # Fontes (.ttf)
│   ├── img/             # Imagens
│   └── css/             # Estilos globais
└── environments/        # Configuração de ambiente
```

## Scripts disponíveis

| Comando | Descrição |
|---|---|
| `ng serve` | Servidor de desenvolvimento (`localhost:4200`) |
| `ng build` | Build de desenvolvimento |
| `ng build --configuration production` | Build de produção |
| `ng test` | Testes unitários via Karma |
| `ng e2e` | Testes end-to-end via Protractor |
| `ng generate component <nome>` | Gera novo componente |
