'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Componente que renderiza os botões de ação ("Copiar" e "Desativar/Ativar") na tabela de links
export default function LinkActions({ urlId, isActive, shortCode }: { urlId: string, isActive: boolean, shortCode: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Função para alternar o status do link chamando a API
  const toggleStatus = async () => {
    setLoading(true);
    await fetch(`/api/urls/${urlId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ active: !isActive })
    });
    setLoading(false);
    router.refresh(); // Recarrega os dados da página de forma suave para refletir a alteração
  };

  // Função para copiar o link curto gerado
  const copyLink = () => {
    const url = `${window.location.origin}/${shortCode}`;
    navigator.clipboard.writeText(url);
    alert('Link copiado para a área de transferência!');
  };

  return (
    <div className="flex space-x-3 items-center">
      {/* Botão de copiar link */}
      <button onClick={copyLink} className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition">
        Copiar
      </button>
      
      {/* Botão dinâmico que altera cor e texto baseando-se no status atual do link */}
      <button onClick={toggleStatus} disabled={loading} className={`${isActive ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'} text-sm font-semibold disabled:opacity-50 transition`}>
        {isActive ? 'Desativar' : 'Reativar'}
      </button>
    </div>
  );
}