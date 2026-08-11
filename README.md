# FinSight – Personal Finance Intelligence Platform

> **"Understand your money. Build your future."**

FinSight is a production-quality, full-stack personal finance management and intelligence platform designed to empower individuals with clear financial analytics, automated statement imports, smart categorization, monthly budget tracking, savings goal progress, and AI-driven personal financial advice.

---

## 🌟 Key Features

- 📊 **Financial Dashboard**: Real-time balance tracking, monthly income vs. expense metrics, savings rates, and upcoming payments.
- 💳 **Transaction Engine**: Multi-criteria search, category filters, payment methods, merchant tagging, and pagination.
- 🎯 **Savings Goals & Budgets**: Visual goal tracking with target dates and dynamic budget health notifications (<70% normal, 70-90% warning, >90% critical).
- 🔄 **Recurring Subscriptions**: Automation tracking for recurring subscriptions and bills with upcoming payment reminders.
- 📈 **Advanced Analytics**: Interactive charts for spending trends, top merchants, budget performance, and financial health scoring (0-100).
- 📥 **CSV Bank Statement Import**: Drag-and-drop CSV parser with interactive column mapping, validation, preview, and summary breakdown.
- 🤖 **Smart Category Suggestions**: Automated heuristic merchant-to-category mapping for fast transaction imports.
- 💡 **AI Financial Assistant & Automated Insights**: Secure backend LLM integration providing educational financial advice and automated spending anomaly detection.
- 🔒 **Row Level Security (RLS)**: Bank-grade user data isolation using PostgreSQL policies in Supabase.

---

## 🏗 System Architecture & Tech Stack

### Architecture Overview

```
                          ┌────────────────────────┐
                          │    Browser / Client    │
                          │ React + TS + Tailwind  │
                          └───────────┬────────────┘
                                      │
                         ┌────────────┴────────────┐
                         │  Supabase Auth & Client │
                         └────────────┬────────────┘
                                      │
            ┌─────────────────────────┼─────────────────────────┐
            ▼                         ▼                         ▼
┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────────┐
│ Supabase PostgreSQL DB│ │ Node.js Express API   │ │   AI Provider (LLM)   │
│   (Tables & RLS)      │ │ Backend Service       │ │ (Secured Server-Side) │
└───────────────────────┘ └───────────────────────┘ └───────────────────────┘
```

### Stack Breakdown

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Lucide React, TanStack Query v5, React Router v6, React Hook Form, Zod, Recharts, date-fns, PapaParse.
- **Backend**: Node.js, Express.js, TypeScript, CORS, dotenv, Zod validation middleware.
- **Database & Auth**: PostgreSQL hosted on Supabase with Row Level Security (RLS) policies and Supabase Auth.
- **Testing & Quality**: Vitest, React Testing Library, ESLint, Prettier.
- **DevOps**: Docker, Docker Compose, Environment Variable management.

---

## 📁 Repository Structure

```
FinSight/
├── client/                 # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/     # UI primitives, layout shell, widget modules
│   │   ├── hooks/          # Custom hooks (auth, theme, query hooks)
│   │   ├── lib/            # Supabase client, QueryClient setup
│   │   ├── pages/          # Full page views
│   │   ├── routes/         # Router definitions & protected route wrappers
│   │   ├── services/       # REST API service client functions
│   │   ├── types/          # TypeScript interfaces & types
│   │   └── utils/          # Formatting & calculation utilities
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.ts
├── server/                 # Express + TypeScript backend API
│   ├── src/
│   │   ├── config/         # Server environment & Supabase config
│   │   ├── controllers/    # API endpoint request handlers
│   │   ├── middleware/     # Auth verification & error handling
│   │   ├── routes/         # Express routers
│   │   ├── services/       # Financial analysis & AI prompt engines
│   │   └── index.ts        # Server entry point
│   └── tsconfig.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher
- **Supabase Account**: For database and authentication setup

### Installation & Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/finsight.git
   cd finsight
   ```

2. **Backend Setup**:
   ```bash
   cd server
   npm install
   cp ../.env.example .env
   npm run dev
   ```
   *The server will start on `http://localhost:5000`.*

3. **Frontend Setup**:
   ```bash
   cd ../client
   npm install
   cp ../.env.example .env
   npm run dev
   ```
   *The client will start on `http://localhost:5173`.*

---

## 🛡 Security & Best Practices

- **Row Level Security**: All PostgreSQL tables enforce `user_id = auth.uid()` to prevent data leakage between users.
- **Server-side AI Execution**: AI keys are kept strictly on the backend server. No sensitive keys are bundled into frontend JavaScript artifacts.
- **Input Sanitation & Schema Validation**: Strict runtime validation using Zod on both client forms and server endpoints.

---

## 📝 License

This project is open-source under the MIT License.
