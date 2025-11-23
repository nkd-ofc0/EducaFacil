import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { tools } from '@/lib/tools';
import { BookOpen, FileText, Calendar, Users, BrainCircuit, ClipboardList, ArrowRight, CheckCircle2 } from 'lucide-react';

// Mapeamento de ícones
const iconMap: any = {
  'book': BookOpen,
  'file': FileText,
  'calendar': Calendar,
  'users': Users,
  'brain': BrainCircuit,
  'list': ClipboardList
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* HERO SECTION (Topo) */}
      <div className="bg-white border-b border-slate-200 pb-16 pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Feito para Professores 🍎
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
            Sua rotina pedagógica pronta em <span className="text-blue-600">segundos</span>.
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Pare de levar trabalho para casa. Use Inteligência Artificial para criar provas, planejamentos e relatórios num piscar de olhos.
          </p>
          
          <div className="flex justify-center gap-4">
            <Link href="#ferramentas">
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-105 flex items-center gap-2">
                    Acessar Plataforma <ArrowRight className="w-5 h-5" />
                </button>
            </Link>
          </div>
          
          <div className="mt-10 flex justify-center gap-8 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> Alinhado à BNCC</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> Upload de Fotos</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> Teste Grátis</span>
          </div>
        </div>
      </div>

      {/* FERRAMENTAS (Grid) */}
      <div id="ferramentas" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-10 text-center">O que você quer criar hoje?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
                // Fallback simples para ícone se não achar
                const Icon = tool.icon || BookOpen;
                return (
                <Link key={tool.slug} href={`/ferramenta/${tool.slug}`} className="group">
                    <Card className="h-full border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden bg-white">
                    <CardHeader>
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                            <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                        </div>
                        <CardTitle className="text-lg text-slate-800 group-hover:text-blue-700 transition-colors">
                        {tool.title}
                        </CardTitle>
                        <CardDescription className="text-slate-500 leading-relaxed text-sm mt-2">
                        {tool.description}
                        </CardDescription>
                    </CardHeader>
                    </Card>
                </Link>
                );
            })}
            </div>
        </div>
      </div>

      {/* RODAPÉ */}
      <div className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
         <p className="text-xs font-bold mb-4 uppercase tracking-widest">EducaFácil AI</p>
         <p className="text-xs mb-8">Desenvolvido por <span className="text-white">NKD Tecnologia</span></p>
         <div className="flex justify-center gap-6 text-[10px]">
             <Link href="/termos" className="hover:text-white">Termos de Uso</Link>
             <Link href="/privacidade" className="hover:text-white">Política de Privacidade</Link>
         </div>
      </div>
    </div>
  );
}
