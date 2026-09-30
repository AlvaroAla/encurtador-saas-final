'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import AdBanner from '@/components/ads/AdBanner';

// Landing Page: Página Principal do Sistema
export default function Home() {
  // Hook do NextAuth para verificar se o usuário atual está logado
  const { data: session } = useSession();
  
  // Controle de estado do campo de formulário e resultado
  const [url, setUrl] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // Função disparada ao enviar o formulário (Clique no botão Encurtar)
  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Chamada à nossa API interna para criar a URL curta
    const res = await fetch('/api/urls', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ originalUrl: url })
    });
    
    const data = await res.json();
    if (res.ok) {
      // Cria a URL completa usando o domínio atual
      setResult(`${window.location.origin}/${data.shortCode}`);
      setUrl(''); // Limpa o campo após o sucesso
    } else {
      alert(data.error); // Exibe alerta de erro (Ex: URL Inválida)
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-between p-4">
      {/* Navegação e Cabeçalho do Site */}
      <nav className="w-full p-6 flex justify-between items-center max-w-5xl">
        <h1 className="text-xl font-bold text-blue-600">LinkSaaS</h1>
        <div className="space-x-4">
          {session ? (
            // Se logado, mostra o acesso direto ao painel
            <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600 transition">Ir para o Dashboard</Link>
          ) : (
            // Se não estiver logado, exibe opções de acesso e registro
            <>
              <Link href="/login" className="text-sm font-medium hover:text-blue-600 transition">Entrar</Link>
              <Link href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm">Criar conta</Link>
            </>
          )}
        </div>
      </nav>

      {/* Conteúdo Central da Landing Page */}
      <main className="text-center max-w-2xl w-full my-auto flex-1 flex flex-col justify-center">
        <h2 className="text-5xl font-extrabold tracking-tight text-slate-900 mb-4">Encurte seus links.</h2>
        <p className="text-lg text-slate-600 mb-8">Compartilhe de forma simples, acompanhe seus acessos em tempo real e gerencie sua audiência.</p>
        
        {/* Formulário Principal de Encurtamento */}
        <form onSubmit={handleShorten} className="flex space-x-2 bg-white p-2 rounded-xl shadow-sm border border-slate-200">
          <input 
            type="url" 
            placeholder="Cole sua URL longa aqui (https://...)" 
            required 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 outline-none px-4 text-slate-700 bg-transparent"
          />
          <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm disabled:opacity-70">
            {loading ? 'Processando...' : 'Encurtar'}
          </button>
        </form>

        {/* Bloco de Sucesso: Exibe o link após a geração */}
        {result && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 shadow-sm animate-in fade-in zoom-in duration-300">
            <p className="text-sm mb-1 font-medium">URL encurtada com sucesso!</p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <a href={result} target="_blank" rel="noreferrer" className="font-bold text-lg hover:underline text-green-900">{result}</a>
              <button onClick={() => navigator.clipboard.writeText(result)} className="text-sm px-4 py-2 bg-white border border-green-300 rounded-lg shadow-sm hover:bg-green-100 transition font-medium text-green-800">Copiar</button>
            </div>
          </div>
        )}
      </main>

      {/* Espaço de Monetização adicionado estrategicamente no fim da Landing Page */}
      <footer className="w-full max-w-4xl pb-4">
        <AdBanner dataAdSlot="9876543210" />
      </footer>
    </div>
  );
}