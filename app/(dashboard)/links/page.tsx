import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import LinkActions from "@/components/links/LinkActions";

// Página da Tabela Completa de Links do Usuário
export default async function LinksPage() {
  const session = await getServerSession(authOptions);
  
  // Busca todos os links, ordenando do mais recente para o mais antigo
  const urls = await prisma.url.findMany({
    where: { userId: (session?.user as any).id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
        <h2 className="font-semibold text-slate-800">Gerenciamento dos seus Links</h2>
      </div>
      
      {/* Tabela responsiva (Aplica scroll em telas muito pequenas) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-slate-200 text-sm text-slate-500 uppercase tracking-wide">
              <th className="p-4 font-medium">Código Curto</th>
              <th className="p-4 font-medium">URL Original</th>
              <th className="p-4 font-medium">Acessos</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Ações Rápida</th>
            </tr>
          </thead>
          <tbody className="text-sm text-slate-700">
            {/* Mensagem caso o usuário ainda não tenha encurtado nada */}
            {urls.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-slate-500">Você ainda não criou nenhum link encurtado.</td></tr>
            )}
            
            {/* Renderização dinâmica das linhas da tabela */}
            {urls.map(url => (
              <tr key={url.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-blue-600">
                  <a href={`/${url.shortCode}`} target="_blank" rel="noreferrer">/{url.shortCode}</a>
                </td>
                
                {/* Trunca a URL original se for muito longa para não quebrar o layout da tabela */}
                <td className="p-4 truncate max-w-xs text-slate-500" title={url.originalUrl}>{url.originalUrl}</td>
                
                <td className="p-4 font-medium">{url.clicksCount}</td>
                
                <td className="p-4">
                  {/* Etiqueta colorida de status */}
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${url.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {url.active ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                
                <td className="p-4">
                  {/* Passa as propriedades ao componente Client-side responsável pelas interações (Cliques) */}
                  <LinkActions urlId={url.id} isActive={url.active} shortCode={url.shortCode} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}