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

---

## Como adicionar um novo local no mapa

Abra `src/data/locations.json` e adicione um objeto ao array:

```json
{
  "id": 36,
  "name": "Nome do Local",
  "city": "Cidade",
  "region": "Região de SC",
  "lat": -27.1234,
  "lng": -48.5678,
  "waterStatus": "good",
  "beachStatus": "proper",
  "description": "Descrição curta do local e situação hídrica.",
  "ngo": null
}
```

`waterStatus` aceita: `"good"` | `"warning"` | `"bad"`
`beachStatus` aceita: `"proper"` | `"improper"` | `"not_applicable"`

**Só isso.** O marcador aparece no mapa automaticamente.

---

## Como vincular uma ONG a um local

No JSON, troque `"ngo": null` por:

```json
"ngo": {
  "name": "Nome da ONG",
  "description": "O que a ONG faz.",
  "contact": "email@ong.org | (48) 99999-9999",
  "donationUrl": "https://link-de-doacao.com"
}
```

---

## Como alterar o status de um local

No JSON, mude o campo `waterStatus`:

```json
"waterStatus": "bad"
```

O marcador no mapa muda de cor automaticamente.

---

## Fluxo de dados

```
locations.json
    ↓ importado em
page.tsx (como módulo TypeScript)
    ↓ passado para
useFilteredLocations (hook)
    ↓ retorna lista filtrada para
MapWrapper → Map (marcadores)
Sidebar (painel de detalhes)
StatsBar (contadores)
```

---

## Localidades incluídas (35 locais reais)

| # | Local | Município | Status |
|---|-------|-----------|--------|
| 1 | Lagoa da Conceição | Florianópolis | 🟡 Atenção |
| 2 | Praia dos Ingleses | Florianópolis | 🟢 Própria |
| 3 | Praia do Campeche | Florianópolis | 🟢 Própria |
| 4 | Praia Brava | Itajaí | 🟡 Atenção |
| 5 | Praia Mole | Florianópolis | 🟢 Própria |
| 6 | Barra da Lagoa | Florianópolis | 🟡 Atenção |
| 7 | Praia da Joaquina | Florianópolis | 🟢 Própria |
| 8 | Praia Central de Bombinhas | Bombinhas | 🟢 Própria |
| 9 | Praia Central de Balneário Camboriú | Balneário Camboriú | 🔴 Imprópria |
| 10 | Porto de Itajaí | Itajaí | 🔴 Imprópria |
| 11 | Praia de Canasvieiras | Florianópolis | 🟡 Atenção |
| 12 | Lagoa do Peri | Florianópolis | 🟢 Própria |
| 13 | Praia de Garopaba | Garopaba | 🟢 Própria |
| 14 | Praia de Imbituba | Imbituba | 🟡 Atenção |
| 15 | Lagoa de Santo Antônio (Laguna) | Laguna | 🟡 Atenção |
| 16 | Praia de Sambaqui | Florianópolis | 🟢 Própria |
| 17 | Praia de Itapema | Itapema | 🟢 Própria |
| 18 | Praia de Porto Belo | Porto Belo | 🟢 Própria |
| 19 | Praia da Armação | Florianópolis | 🟢 Própria |
| 20 | Rio Tijucas | Tijucas | 🔴 Imprópria |
| 21 | Praia de Navegantes | Navegantes | 🔴 Imprópria |
| 22 | Praia de Penha | Penha | 🟢 Própria |
| 23 | Praia de Piçarras | Balneário Piçarras | 🟡 Atenção |
| 24 | Praia de São Francisco do Sul | São Francisco do Sul | 🟡 Atenção |
| 25 | Praia do Forte — Joinville | Joinville | 🔴 Imprópria |
| 26 | Praia de Palhoça | Palhoça | 🔴 Imprópria |
| 27 | Rio Araranguá | Araranguá | 🟡 Atenção |
| 28 | Praia de Içara | Içara | 🟡 Atenção |
| 29 | Morro dos Conventos | Araranguá | 🟢 Própria |
| 30 | Rio Itajaí-Açu — Blumenau | Blumenau | 🟡 Atenção |
| 31 | Praia de Pinheira | Palhoça | 🟢 Própria |
| 32 | Praia de Gov. Celso Ramos | Gov. Celso Ramos | 🟢 Própria |
| 33 | Lagoa de Ibiraquera | Imbituba | 🟢 Própria |
| 34 | Praia de Jurerê Internacional | Florianópolis | 🟢 Própria |
| 35 | Praia do Santinho | Florianópolis | 🟢 Própria |

---

## ODS 6

Este projeto foi desenvolvido para o hackathon de impacto social, alinhado ao
Objetivo de Desenvolvimento Sustentável 6 da ONU:
**"Garantir disponibilidade e manejo sustentável da água e saneamento para todos"**.
