'use client';
import { useEffect } from 'react';

// Componente inteligente de Monetização (Google AdSense)
export default function AdBanner({ dataAdSlot }: { dataAdSlot: string }) {
  // Dispara o carregamento do anúncio assim que o componente for exibido na tela
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (err) {
      console.error('Erro ao inicializar Google AdSense:', err);
    }
  }, []);

  return (
    // Box responsivo que não quebra o layout caso o anúncio demore a carregar
    <div className="w-full flex justify-center mt-8 overflow-hidden bg-slate-100 border-2 border-dashed border-slate-300 text-slate-400 font-medium text-sm py-12 items-center text-center rounded-xl">
      {/* DICA: Para ativar monetização real, substitua 'SEU_CODIGO_AQUI' pelo seu 'ca-pub' do Google AdSense e remova os comentários da linha abaixo */}
      
      {/* <ins className="adsbygoogle" style={{ display: 'block' }} data-ad-client="ca-pub-SEU_CODIGO_AQUI" data-ad-slot={dataAdSlot} data-ad-format="auto" data-full-width-responsive="true"></ins> */}
      
      <span>Espaço Reservado para Anúncio Google (Monetização)</span>
    </div>
  );
}