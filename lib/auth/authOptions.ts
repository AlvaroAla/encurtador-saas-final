import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db/prisma";
import bcrypt from "bcryptjs";

// Configurações principais de Autenticação utilizando NextAuth
export const authOptions: NextAuthOptions = {
  providers: [
    // Provedor de credenciais customizado (E-mail e Senha)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Valida se os campos foram preenchidos
        if (!credentials?.email || !credentials?.password) return null;
        
        // Busca o usuário no banco de dados
        const user = await prisma.user.findUnique({ where: { email: credentials.email } });
        
        // Se o usuário não existir ou estiver desativado, nega o acesso
        if (!user || !user.active) return null;
        
        // Compara a senha enviada com o hash salvo no banco
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;
        
        // Retorna os dados do usuário para serem armazenados na sessão
        return { id: user.id, email: user.email, name: user.name };
      }
    })
  ],
  callbacks: {
    // Adiciona o ID do usuário no token JWT para uso futuro em consultas ao banco
    session: ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    }
  },
  session: { strategy: "jwt" }, // Utiliza JSON Web Tokens para gerenciar a sessão
  pages: { signIn: "/login" }, // Define a página customizada de login
  secret: process.env.NEXTAUTH_SECRET, // Chave de segurança para criptografar os tokens
};