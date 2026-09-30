import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

// Rota PATCH para atualizar dados específicos de uma URL (Ex: Ativar/Desativar)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  // Exige que o usuário esteja autenticado
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Acesso não autorizado" }, { status: 401 });

  const body = await req.json();

  try {
    // Busca a URL no banco de dados
    const url = await prisma.url.findUnique({ where: { id: params.id } });
    
    // Validação de segurança: Verifica se a URL pertence realmente ao usuário logado
    if (url?.userId !== (session.user as any).id) {
      return NextResponse.json({ error: "Permissão negada. Esta URL não pertence a você." }, { status: 403 });
    }

    // Atualiza o status (Ativo / Inativo)
    const updatedUrl = await prisma.url.update({
      where: { id: params.id },
      data: { active: body.active }
    });

    return NextResponse.json(updatedUrl);
  } catch (error) {
    return NextResponse.json({ error: "Ocorreu um erro ao tentar atualizar o status do link" }, { status: 500 });
  }
}