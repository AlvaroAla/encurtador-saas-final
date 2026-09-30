'use client';

// Componente necessário no App Router do Next.js para encapsular o provedor de sessão (Context API)
import { SessionProvider } from "next-auth/react";

// Fornece a sessão do NextAuth para todos os componentes filhos
export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}