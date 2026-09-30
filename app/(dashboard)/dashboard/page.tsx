import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import AdBanner from "@/components/ads/AdBanner";

// Página Principal do Dashboard (Resumo das Estatísticas)
export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  
  // Busca no banco de dados apenas as URLs pertencentes ao usuário logado
  const urls = await prisma.url.findMany({
    where: { userId: (session?.user as any).id }
  });

  // Calcula os indicadores chave de desempenho
  const totalLinks = urls.length;
  const totalClicks = urls.reduce((acc, url) => acc + url.clicksCount, 0); // Soma os cliques de todos os links
  const activeLinks = urls.filter(u => u.active).length;

  return (
    <div>
      {/* Grid com os Cartões de Estatísticas (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <h3 className="text-sm font-medium text-slate-500 mb-2">Total de Links Criados</h3>
          <p className="text-3xl font-bold text-blue-600">{totalLinks}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <h3 className="text-sm font-medium text-slate-500 mb-2">Total de Acessos</h3>
          <p className="text-3xl font-bold text-green-600">{totalClicks}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
          <h3 className="text-sm font-medium text-slate-500 mb-2">Links Ativos</h3>
          <p className="text-3xl font-bold text-slate-900">{activeLinks}</p>
        </div>
      </div>

      {/* Espaço reservado para monetização dentro do painel do usuário */}
      <AdBanner dataAdSlot="1234567890" />
    </div>
  );
}