import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { nanoid } from "nanoid";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

// Lista de palavras proibidas para evitar que usuários criem códigos personalizados conflitantes com o sistema
const RESERVED_WORDS = ["admin", "login", "api", "dashboard", "settings", "register"];

// Esquema de validação dos dados recebidos utilizando a biblioteca Zod
const urlSchema = z.object({
  originalUrl: z.string().url("URL inválida"),
  customCode: z.string().min(3).max(30).regex(/^[a-zA-Z0-9-_]+$/).optional(),
});

// Endpoint para criação de novas URLs encurtadas
export async function POST(req: Request) {
  try {
    // Recupera a sessão atual (caso o usuário esteja logado)
    const session = await getServerSession(authOptions);
    const body = await req.json();
    
    // Aplica a validação nos dados enviados (Url Original e Código Customizado opcional)
    const { originalUrl, customCode } = urlSchema.parse(body);
    let shortCode = customCode;

    // Lógica se o usuário escolheu um código personalizado
    if (shortCode) {
      if (RESERVED_WORDS.includes(shortCode.toLowerCase())) {
        return NextResponse.json({ error: "Esta palavra é reservada pelo sistema" }, { status: 400 });
      }
      // Verifica se o código personalizado já foi utilizado por alguém
      const exists = await prisma.url.findUnique({ where: { shortCode } });
      if (exists) return NextResponse.json({ error: "Este código já está em uso" }, { status: 409 });
    } else {
      // Lógica de geração automática (Gera códigos até encontrar um que seja único)
      let isUnique = false;
      while (!isUnique) {
        shortCode = nanoid(7); // Gera uma string aleatória segura de 7 caracteres
        const exists = await prisma.url.findUnique({ where: { shortCode } });
        if (!exists) isUnique = true;
      }
    }

    // Salva a nova URL no banco de dados, atrelando ao ID do usuário caso esteja logado
    const newUrl = await prisma.url.create({
      data: {
        originalUrl,
        shortCode: shortCode as string,
        userId: (session?.user as any)?.id || null, // Se null, é um link anônimo
      }
    });
    
    // Retorna a URL recém-criada
    return NextResponse.json(newUrl, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Falha na validação dos dados enviados" }, { status: 400 });
  }
}