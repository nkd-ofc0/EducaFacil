import { MetadataRoute } from 'next';
import { tools } from '@/lib/tools'; // <--- MUDOU DE NICHES PARA TOOLS

export default function sitemap(): MetadataRoute.Sitemap {
  // Se já tiver o link novo da Vercel do EducaFácil, coloque aqui. 
  // Se não, deixe assim e mude depois.
  const baseUrl = 'https://educa-facil.vercel.app'; 

  // 1. Página Principal
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // 2. Páginas de Ferramentas (Dinâmicas)
  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/ferramenta/${tool.slug}`, // <--- MUDOU A ROTA
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...toolRoutes];
}
