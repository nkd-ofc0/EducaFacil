import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { tools } from '@/lib/tools';
import { BookOpen, FileText, User, Star, ArrowRight } from 'lucide-react';

// Mapa de ícones
const iconMap = {
  book: BookOpen,
  file: FileText,
  user: User,
  star: Star,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-4">
            EducaFácil <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A ferramenta secreta dos professores produtivos. Planeje aulas, crie provas e relatórios em segundos com Inteligência Artificial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool) => {
            const Icon = iconMap[tool.iconName] || Star;
            return (
              <Link key={tool.slug} href={`/ferramenta/${tool.slug}`} className="group">
                <Card className="h-full border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="text-blue-500 w-6 h-6" />
                  </div>
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl text-slate-800 group-hover:text-blue-700 transition-colors">
                      {tool.title}
                    </CardTitle>
                    <CardDescription className="text-slate-500 leading-relaxed">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-16 text-center space-y-4 border-t border-slate-200 pt-8">
           <p className="text-slate-400 text-xs font-bold">
             Desenvolvido com carinho por NKD Tecnologia
           </p>
        </div>

      </div>
    </div>
  );
}