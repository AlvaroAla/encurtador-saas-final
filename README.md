# 🔗 Encurtador de URLs SaaS

Uma aplicação Fullstack completa e de nível de produção para encurtamento e gerenciamento de URLs, desenvolvida com as melhores práticas e tecnologias modernas do ecossistema JavaScript/TypeScript.

## 🚀 Tecnologias e Arquitetura

O projeto foi construído utilizando um ecossistema de alto desempenho:
* **Framework Core:** [Next.js 14](https://nextjs.org/) (App Router)
* **Linguagem:** TypeScript
* **Estilização e UI:** Tailwind CSS (Design moderno focado em conversão SaaS)
* **Banco de Dados:** PostgreSQL hospedado (compatível com Supabase, Render, Neon)
* **ORM:** [Prisma](https://www.prisma.io/) (Garante tipagem forte e proteção nativa contra Injeção de SQL)
* **Autenticação:** [NextAuth.js](https://next-auth.js.org/) com estratégia JWT e criptografia de senhas (Bcrypt)
* **Validação de Dados:** Zod (Backend)
* **Geração de Hashes:** Nanoid (Geração segura de códigos alfanuméricos livres de colisão)

## ✨ Funcionalidades Principais

* **Encurtamento Inteligente:** Conversão instantânea de URLs longas em códigos curtos (ex: `dominio.com/aB3x9`).
* **Autenticação Completa:** Criação de conta, hash de senha e login seguro.
* **Painel de Controle (Dashboard):** Visão geral interativa com métricas de cliques, links totais e links ativos.
* **Gerenciamento de Links:** Capacidade de listar, copiar para área de transferência e desativar/reativar links em tempo real.
* **Analytics Integrado:** Contagem atômica de cliques. O middleware de redirecionamento coleta de forma invisível dados do acesso (O IP sofre hash no backend em cumprimento à LGPD).
* **Monetização Estruturada:** Espaços pré-configurados e componentes focados para integração com Google AdSense (`AdBanner`).

## 🛠️ Como executar o projeto localmente

Siga o passo a passo abaixo para rodar o projeto na sua máquina:

1. **Clone o repositório e instale as dependências:**
   ```bash
   git clone https://github.com/SEU-USUARIO/encurtador-saas.git
   cd encurtador-saas
   npm install
   ```

2. **Configuração de Variáveis de Ambiente:**
   Renomeie o arquivo `.env.example` para `.env` e configure sua URL de conexão do PostgreSQL e a chave secreta do NextAuth.
   ```env
   DATABASE_URL="postgresql://usuario:senha@host:5432/banco"
   NEXTAUTH_SECRET="uma_chave_aleatoria_e_segura"
   ```

3. **Gere o Prisma Client e construa as Tabelas no Banco de Dados:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🛡️ Segurança e Escalabilidade

* **Proteção contra OR (Open Redirect):** Validações via Zod garantem que apenas esquemas `http`/`https` sejam permitidos.
* **LGPD Compliant:** O sistema de analytics criptografa IPs no backend antes de armazená-los, mantendo apenas a geolocalização por país e referenciador de tráfego.
* **Componentização:** Padrões `Clean Code` e separação rigorosa de componentes (`/components/layout`, `/lib/auth`, `/lib/db`) facilitando refatoração por outros desenvolvedores da equipe.

---
Desenvolvido com dedicação para compor portfólio profissional de Engenharia de Software.
