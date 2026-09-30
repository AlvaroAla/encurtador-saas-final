import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";

// Metadados Globais (SEO)
export const metadata = {
  title: "Encurtador de URLs SaaS",
  description: "Encurte seus links longos de forma rápida, compartilhe nas redes sociais e monitore estatísticas detalhadas de acessos e cliques.",
};

// Layout base raiz: Engloba toda a aplicação no contexto do Providers (Autenticação)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}