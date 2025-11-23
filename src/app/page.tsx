// @ts-nocheck
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { tools } from '@/lib/tools';
import { BookOpen, FileText, Calendar, Users, BrainCircuit, ClipboardList, ArrowRight, CheckCircle2, Star } from 'lucide-react';

const iconMap: any = {
  'book': BookOpen,
  'file': FileText,
  'calendar': Calendar,
  'users': Users,
  'brain': BrainCircuit,
  'list': ClipboardList,
  'default': Star
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 pb-16 pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Feito para Professores 🍎
          </div>
          <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
            Sua rotina pedagógica pronta em <span className="text-blue-600">segundos</span>.
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Planeje aulas, crie provas e relatórios com Inteligência Artificial.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="#ferramentas">
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-105 flex items-center gap-2">
                    Acessar Plataforma <ArrowRight className="w-5 h-5" />
                </button>
            </Link>
          </div>
        </div>
      </div>

      <div id="ferramentas" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
                const Icon = iconMap[tool.iconName] || iconMap['default'];
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
      
      <div className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
         <p className="text-xs font-bold mb-4 uppercase tracking-widest">EducaFácil AI</p>
         <p className="text-xs">Desenvolvido por <span className="text-white">NKD Tecnologia</span></p>
      </div>
    </div>
  );
}
