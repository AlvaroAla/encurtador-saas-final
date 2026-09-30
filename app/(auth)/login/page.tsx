'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Página de Autenticação / Login
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Função disparada ao submeter as credenciais
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Chama o método nativo signIn do NextAuth, informando o provedor de credentials
    const res = await signIn('credentials', { email, password, redirect: false });
    
    if (res?.ok) {
      router.push('/dashboard'); // Redireciona para o painel em caso de sucesso
    } else {
      alert('E-mail ou senha inválidos. Tente novamente.');
      setLoading(false);
    }
  };

  // Simulação do "Esqueci a Senha" para o Portfólio
  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Em um ambiente de produção, esta ação enviaria um link de redefinição para o seu e-mail configurado via AWS SES ou Resend.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">Acesse sua conta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 transition" 
              placeholder="seu@email.com" 
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-slate-700">Senha</label>
              <a href="#" onClick={handleForgotPassword} className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline transition">
                Esqueci minha senha
              </a>
            </div>
            <input 
              type="password" 
              required 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:border-blue-500 transition" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2.5 rounded-lg font-medium shadow-sm hover:bg-blue-700 transition mt-2 disabled:opacity-70"
          >
            {loading ? 'Entrando...' : 'Fazer Login'}
          </button>

        </form>
        <p className="mt-6 text-center text-sm text-slate-600">
          Ainda não possui uma conta? <Link href="/register" className="text-blue-600 font-medium hover:underline">Crie agora</Link>
        </p>
      </div>
    </div>
  );
}