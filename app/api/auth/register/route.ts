import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

// Rota de API responsável pelo registro de novos usuários
export async function POST(req: Request) {
  try {
    // Extrai os dados enviados no corpo da requisição
    const { name, email, password } = await req.json();
    
    // Validação básica de segurança e preenchimento
    if (!name || !email || !password || password.length < 8) {
      return NextResponse.json({ error: "Dados inválidos ou senha menor que 8 caracteres" }, { status: 400 });
    }
    
    // Verifica se o e-mail já está cadastrado no banco de dados
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "E-mail já está em uso por outra conta" }, { status: 409 });
    }
    
    // Gera o hash seguro da senha (custo 10)
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Cria o registro do novo usuário no banco de dados
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });
    
    // Retorna sucesso sem expor a senha
    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } }, { status: 201 });
  } catch (error) {
    // Trata erros internos do servidor
    return NextResponse.json({ error: "Erro interno ao tentar registrar usuário" }, { status: 500 });
  }
}