import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

// Cria o manipulador (handler) de rotas do NextAuth
const handler = NextAuth(authOptions);

// Exporta o manipulador para as requisições GET e POST na rota de autenticação
export { handler as GET, handler as POST };