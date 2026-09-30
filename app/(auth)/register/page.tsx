'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Página de Criação de Conta
export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Função para cadastrar o usuário e enviá-lo ao banco de dados via API customizada
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Aciona a rota de registro que criamos no backend
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers:{ 'Content-Type': 'application/json'},
      body: JSON.stringify({ name, email, password })
    });
    
    if (res.ok) {
      alert('Conta criada com sucesso! Faça login para continuar.');
      router.push('/login'); // Redireciona para o login após sucesso
    } else {
      const data = await res.json();
      alert(data.error || 'Erro inesperado ao criar a conta.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">Crie sua Conta SaaS</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
            <input type="text" required value={name} onChange={e=>setName(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 transition" placeholder="João Silva" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 transition" placeholder="joao@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Senha Segura (mín. 8 caracteres)</label>
            <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 transition" placeholder="••••••••" />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2.5 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition mt-2 disabled:opacity-70"
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-600">Já é cadastrado? <Link href="/login" className="text-blue-600 font-medium hover:underline">Entre por aqui</Link></p>
      </div>
    </div>
  );
}