'use client';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

// Componente responsável pela navegação lateral no painel privado (Dashboard)
export default function Sidebar() {
  const pathname = usePathname();
  
  // Definição dos links do menu
  const links = [
    { href: '/', label: '🏠 Encurtar Link (Início)' },
    { href: '/dashboard', label: '📊 Dashboard' },
    { href: '/links', label: '🔗 Meus Links' }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 min-h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold text-blue-600 mb-8 px-2">LinkSaaS</h2>
      
      {/* Navegação principal da barra lateral */}
      <nav className="flex-1 space-y-2">
        {links.map(l => (
          <Link key={l.href} href={l.href} className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === l.href ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}>
            {l.label}
          </Link>
        ))}
      </nav>
      
      {/* Botão de Logout que limpa a sessão e redireciona para a página principal */}
      <button onClick={() => signOut({ callbackUrl: '/' })} className="text-left px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-auto">
        Sair da conta
      </button>
    </aside>
  );
}