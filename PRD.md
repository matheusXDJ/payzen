# Payzen - Product Requirements Document (PRD)

> **Version:** 1.0  
> **Last Updated:** May 12, 2026  
> **Owner:** Matheus (Founder)  
> **Status:** In Development

---

## 🎯 Milestones & Tasks

### Milestone 1: Project Setup & Infrastructure
**Timeline:** Days 1-3  
**Goal:** Complete project scaffolding with all tooling configured

#### Tasks
- [x] **1.1 Repository Setup**
- [x] **1.2 Turborepo Configuration**
- [x] **1.3 Next.js App Setup**
- [x] **1.4 TypeScript Configuration**
- [x] **1.5 Linting & Formatting**
- [x] **1.6 Package Structure**

---

### Milestone 2: Database & Authentication
**Timeline:** Days 4-6  
**Goal:** Functional database with user authentication

#### Tasks
- [x] **2.1 PostgreSQL Setup**
- [x] **2.2 Prisma Configuration**
- [x] **2.3 Initial Migration** ✅ (Rodado com sucesso no Supabase)
- [x] **2.4 Authentication Models**
- [x] **2.5 NextAuth Setup**
- [x] **2.6 OAuth Providers** (Falta você preencher as chaves do Google/GitHub no arquivo `.env`)
- [x] **2.7 Auth Pages**
- [x] **2.8 Protected Routes**

---

### Milestone 3: shadcn/ui & Design System
**Timeline:** Days 7-8  
**Goal:** Complete UI component library setup

#### Tasks
- [x] **3.1 shadcn/ui Installation**
- [x] **3.2 Install Core Components** (Button, Card, Input, Label, Dialog, Select, Toast, Dropdown Menu — todos criados)
- [x] **3.3 Theme Configuration**
- [x] **3.4 Layout Components**

---

### Milestone 4: PostHog Analytics
**Timeline:** Day 9  
**Goal:** Full analytics tracking implementation

#### Tasks
- [x] **4.1 PostHog Setup** (Falta você criar a conta e pegar as chaves)
- [x] **4.2 PostHog Integration**
- [x] **4.3 Event Tracking**
- [x] **4.4 User Identification**

---

### Milestone 5: Transaction Management
**Timeline:** Days 10-13  
**Goal:** Complete transaction CRUD functionality

#### Tasks
- [x] **5.1 Transaction API Routes**
- [x] **5.2 Transaction Types**
- [x] **5.3 Transaction Hooks**
- [x] **5.4 Transaction List Page**
- [x] **5.5 Transaction Form**
- [x] **5.6 Transaction Detail Page**
- [x] **5.7 Create Transaction Flow**

---

### Milestone 6: Dashboard & Analytics
**Timeline:** Days 14-16  
**Goal:** Complete dashboard with charts and insights

#### Tasks
- [x] **6.1 Dashboard API**
- [x] **6.2 Dashboard Page** (Esqueleto inicial)
- [x] **6.3 Overview Cards** (Esqueleto inicial)
- [x] **6.4 Charts Implementation**
- [x] **6.5 Recent Transactions**

---

### Milestone 7: Categories Management
**Timeline:** Days 17-18  
**Goal:** Full category CRUD with custom icons/colors

#### Tasks
- [x] **7.1 Category API**
- [x] **7.2 Category Page**
- [x] **7.3 Category Form**
- [x] **7.4 Default Categories** (Seeded automaticamente no primeiro login)
- [x] **7.5 Category Usage**

---

### Milestone 8: Credit Cards
**Timeline:** Days 19-20  
**Goal:** Credit card tracking with limits and dates

#### Tasks
- [x] **8.1 Credit Card API**
- [x] **8.2 Credit Card Page**
- [x] **8.3 Credit Card Form**
- [x] **8.4 Card Integration**

---

### Milestone 9: Recurring Bills
**Timeline:** Days 21-22  
**Goal:** Recurring bills with automatic reminders

#### Tasks
- [x] **9.1 Recurring Bills API**
- [x] **9.2 Recurring Bills Page**
- [x] **9.3 Recurring Bill Form**
- [ ] **9.4 Bill Reminders (Optional)**

---

### Milestone 10: WhatsApp Integration
**Timeline:** Days 23-26  
**Goal:** Fully functional WhatsApp transaction logging

#### Tasks
- [ ] **10.1 Meta WhatsApp Setup** (Falta você criar a conta Business no Meta)
- [x] **10.2 Cloudflare Worker Setup**
- [x] **10.3 Webhook Handler**
- [x] **10.4 Message Parser**
- [x] **10.5 Transaction Creation**
- [ ] **10.6 WhatsApp Responses** (Requer chaves do Meta)
- [x] **10.7 User Settings**
- [ ] **10.8 Testing** (Requer chaves do Meta para testar)

---

### Milestone 11: Export & Reports
**Timeline:** Days 27-28  
**Goal:** Export transactions to CSV and PDF

#### Tasks
- [x] **11.1 Export API**
- [x] **11.2 CSV Export**
- [x] **11.3 PDF Export** (HTML report para imprimir como PDF)
- [x] **11.4 Export UI**

---

### Milestone 12: Landing Page & SEO
**Timeline:** Days 29-30  
**Goal:** SEO-optimized landing page for acquisition

#### Tasks
- [x] **12.1 Landing Page Design**
- [x] **12.2 SEO Configuration** (meta tags, OG, robots.txt, sitemap.xml)
- [x] **12.3 Pricing Page**
- [x] **12.4 About Page**
- [ ] **12.5 Performance Optimization** (fazer após deploy na Vercel)

---

### Milestone 13: Mobile Responsiveness
**Timeline:** Days 31-32  
**Goal:** Fully responsive across all devices

#### Tasks
- [x] **13.1 Mobile Navigation** (hamburguer menu criado)
- [x] **13.2 Responsive Dashboard** (layout flex/grid responsivo)
- [x] **13.3 Responsive Forms** (grid adaptativo nos formularios)
- [ ] **13.4 Touch Interactions** (refinamento pós-teste no celular)

---

### Milestone 14: Testing & Bug Fixes
**Timeline:** Days 33-35  
**Goal:** Stable, production-ready application

#### Tasks
- [ ] **14.1 Manual Testing** (a fazer com o app rodando)
- [x] **14.2 Error Handling** (ErrorBoundary criado)
- [ ] **14.3 Performance Testing** (a fazer pós-deploy)
- [ ] **14.4 Security Audit** (a fazer pós-deploy)
- [ ] **14.5 Bug Fixes** (a fazer conforme testes)

---

### Milestone 15: Deployment & Launch
**Timeline:** Days 36-38  
**Goal:** Live production deployment

#### Tasks
- [x] **15.1 Vercel Configuration** (vercel.json criado)
- [ ] **15.2 Database Migration** (rodar `npx prisma db push` no deploy)
- [ ] **15.3 WhatsApp Worker Deployment** (aguardando número Meta)
- [x] **15.4 Monitoring Setup** (PostHog configurado)
- [x] **15.5 Documentation** (README.md completo criado)
- [ ] **15.6 Launch Checklist** (a fazer antes do go-live)

---

### Milestone 16: Post-Launch (Future)
**Timeline:** Post-MVP  
**Goal:** Monetization and advanced features

#### Tasks
- [x] **16.1 Stripe Integration** (aguardando chaves Stripe)
- [x] **16.2 Checkout Flow** (rota /api/checkout criada)
- [x] **16.3 Webhook Handlers** (checkout, subscription updated/deleted, payment failed)
- [x] **16.4 Customer Portal** (rota /api/portal criada)
- [x] **16.5 Feature Gates** (limite de 100 transacões/mês para plano Free implementado)
- [x] **16.6 Premium Features** (Checkout, Portal e UI de Billing implementados)
