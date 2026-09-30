import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import crypto from 'crypto';

// Rota Dinâmica responsável por receber acessos aos links curtos e redirecioná-los
export async function GET(req: Request, { params }: { params: { shortCode: string } }) {
  const { shortCode } = params;
  
  // Busca a URL original baseada no código curto acessado
  const urlData = await prisma.url.findUnique({ where: { shortCode } });

  // Validação: Se o link não existe, está inativo, ou já passou da data de expiração
  if (!urlData || !urlData.active || (urlData.expiresAt && new Date() > urlData.expiresAt)) {
    // Redireciona para a página principal indicando erro
    return NextResponse.redirect(new URL("/?error=not-found", req.url));
  }

  // Coleta dados para Analytics
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  
  // Anonimização do IP usando hash (Importante para regras de privacidade como a LGPD)
  const ipHash = crypto.createHash("sha256").update(ip).digest("hex");

  try {
    // Usa uma Transação (Transaction) no Prisma para garantir a integridade dos dados:
    // Atualiza a contagem de cliques e insere o registro de analytics ao mesmo tempo
    await prisma.$transaction([
      prisma.url.update({
        where: { id: urlData.id },
        data: { clicksCount: { increment: 1 } }
      }),
      prisma.click.create({
        data: {
          urlId: urlData.id,
          ipHash,
          device: "desktop", // Aqui futuramente pode-se usar uma biblioteca de User-Agent
          country: req.headers.get("x-vercel-ip-country") // Funciona bem se hospedado na Vercel
        }
      })
    ]);
  } catch (e) {
    // Se falhar no log de analytics, ignora para não prejudicar a experiência do usuário
    console.error("Erro ao registrar analytics:", e);
  }
  
  // Executa o redirecionamento HTTP 302 (Found) para a URL Original
  return NextResponse.redirect(urlData.originalUrl, 302);
}