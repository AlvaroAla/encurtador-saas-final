import { PrismaClient } from '@prisma/client';

// Evita a criação de múltiplas instâncias do Prisma durante o desenvolvimento (Hot Reloading do Next.js)
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Instancia o Prisma Client
export const prisma = globalForPrisma.prisma || new PrismaClient();

// Salva a instância globalmente se não estivermos em ambiente de produção
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;