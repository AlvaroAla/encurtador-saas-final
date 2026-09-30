import Sidebar from "@/components/layout/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";

// Layout base de todas as páginas autenticadas (Dashboard e Lista de Links)
// Aqui validamos se o usuário está logado antes de mostrar qualquer tela interna.
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Coleta a sessão pelo lado do Servidor para segurança máxima
  const session = await getServerSession(authOptions);
  
  // Se não houver sessão ativa, expulsa o visitante para a tela de login
  if (!session) redirect('/login');

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Componente Lateral de Navegação (Sidebar) */}
      <Sidebar />
      
      {/* Container Principal do Painel */}
      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Olá, {session?.user?.name}</h1>
          <p className="text-slate-500">Bem-vindo ao seu painel de controle.</p>
        </header>
        
        {/* Renderiza o conteúdo da página específica (Dashboard ou Links) */}
        {children}
      </main>
    </div>
  );
}