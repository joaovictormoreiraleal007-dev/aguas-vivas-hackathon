# ÁguaSC 💧

**Plataforma de monitoramento hídrico de Santa Catarina**
Alinhada à ODS 6 da ONU — Água Potável e Saneamento

---

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Leaflet** + **OpenStreetMap**
- **JSON local** para os dados (zero banco de dados)

---

## Estrutura do Projeto

```
aguasc/
├── src/
│   ├── app/
│   │   ├── layout.tsx          → Layout raiz (metadados, fontes)
│   │   ├── page.tsx            → Página principal (orquestra tudo)
│   │   └── globals.css         → Reset + imports do Tailwind
│   │
│   ├── components/
│   │   ├── Header.tsx          → Barra superior com nome e badge ODS 6
│   │   ├── Map.tsx             → Mapa Leaflet com marcadores coloridos
│   │   ├── MapWrapper.tsx      → Import dinâmico (evita SSR do Leaflet)
│   │   ├── Sidebar.tsx         → Painel lateral com detalhes do local
│   │   ├── Controls.tsx        → SearchBar + FilterBar
│   │   └── StatsBar.tsx        → Contadores de status na barra de controle
│   │
│   ├── data/
│   │   └── locations.json      → 35 localidades reais de SC ← EDITE AQUI
│   │
│   ├── hooks/
│   │   └── useFilteredLocations.ts → Lógica de busca + filtro + seleção
│   │
│   └── types/
│       └── index.ts            → Tipos TypeScript (WaterLocation, NGO, etc.)
│
├── public/                     → Assets estáticos (se necessário)
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
└── vercel.json
```

---

## Como rodar localmente

```bash
npm install
npm run dev
# Acesse http://localhost:3000
```

---

## Como fazer deploy na Vercel

1. Suba o projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e clique em **Add New Project**
3. Importe o repositório
4. A Vercel detecta Next.js automaticamente — clique em **Deploy**
5. Pronto. Zero configuração extra.
