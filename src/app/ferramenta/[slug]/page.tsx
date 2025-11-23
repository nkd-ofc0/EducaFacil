import { Metadata } from 'next';
import { TeacherTool } from '@/components/TeacherTool';
import { tools } from '@/lib/tools'; // <--- IMPORTA AS FERRAMENTAS CERTAS
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  // Busca na lista certa (tools)
  const tool = tools.find((t) => t.slug === resolvedParams.slug);
  
  return {
    title: tool ? `${tool.title} - EducaFácil AI` : 'Ferramenta - EducaFácil',
    description: tool?.description || 'Ferramenta para professores.',
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
       <div className="max-w-6xl mx-auto mb-6">
         <Link href="/" className="text-slate-500 hover:text-blue-600 flex items-center gap-1 text-sm font-bold mb-4">
           <ChevronLeft className="w-4 h-4" /> Voltar para o Menu
         </Link>
       </div>

      {/* Chama a ferramenta passando o slug atual */}
      <TeacherTool currentSlug={resolvedParams.slug} />

      <div className="mt-20 mb-10 text-center">
         <p className="text-slate-400 text-xs font-bold">NKD Tecnologia</p>
      </div>
    </div>
  );
}
