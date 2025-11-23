'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { tools } from '@/lib/tools';
import { BookOpen, FileText, Calendar, Users, BrainCircuit, ClipboardList, ArrowRight, CheckCircle2, Star, LogIn, Lock, Check, KeyRound } from 'lucide-react';

// Mapa de Ícones
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
  // Estados para o Login na Home
  const [isVip, setIsVip] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [passwordAttempt, setPasswordAttempt] = useState('');
  const [loginError, setLoginError] = useState('');

  const SENHA_MESTRA = "PROF2025"; // Mesma senha do resto do sistema

  useEffect(() => {
    // Verifica se já está logado ao entrar
    const savedVip = localStorage.getItem('educafacil_vip');
    if (savedVip === 'true') setIsVip(true);
  }, []);

  const handleLogin = () => {
    if (passwordAttempt === SENHA_MESTRA) {
      setIsVip(true);
      localStorage.setItem('educafacil_vip', 'true');
      setShowLogin(false);
      setLoginError('');
      alert("Login realizado com sucesso! Acesso liberado.");
    } else {
      setLoginError("Senha incorreta.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      
      {/* --- HEADER (CABEÇALHO) --- */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-black text-lg text-slate-800 tracking-tight">EducaFácil AI</span>
          </div>

          {/* Área de Login / Status */}
          <div>
            {isVip ? (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-bold border border-green-200">
                <Check className="w-3 h-3" /> Acesso VIP Ativo
              </div>
            ) : (
              showLogin ? (
                <div className="flex items-center gap-2 animate-in slide-in-from-right-5">
                  <Input 
                    type="password" 
                    placeholder="Senha..." 
                    className="h-8 w-32 text-xs"
                    value={passwordAttempt}
                    onChange={(e) => setPasswordAttempt(e.target.value)}
                  />
                  <Button size="sm" className="h-8 bg-blue-600 hover:bg-blue-700" onClick={handleLogin}>OK</Button>
                  <button onClick={() => setShowLogin(false)} className="text-xs text-slate-400 hover:text-slate-600">x</button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 border-slate-300 text-slate-600 hover:text-blue-600 hover:border-blue-600"
                  onClick={() => setShowLogin(true)}
                >
                  <LogIn className="w-4 h-4" /> Área do Professor
                </Button>
              )
            )}
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <div className="bg-white border-b border-slate-200 pb-20 pt-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-8">
            <Star className="w-3 h-3 fill-blue-700" /> Feito para Professores
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Sua rotina pedagógica pronta em <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">segundos</span>.
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Pare de levar trabalho para casa. Use Inteligência Artificial para criar <strong>Provas, Planejamentos e Relatórios</strong> num piscar de olhos.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
            <Link href="#ferramentas" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-xl shadow-blue-100 transition-all hover:scale-105 flex items-center justify-center gap-2">
                    Começar Agora <ArrowRight className="w-5 h-5" />
                </button>
            </Link>
            {!isVip && (
                <p className="text-xs text-slate-400 mt-2 sm:mt-0">Teste Grátis Disponível</p>
            )}
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Alinhado à BNCC</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Upload de Fotos do Livro</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Download para Word</span>
          </div>
        </div>
      </div>

      {/* --- GRID DE FERRAMENTAS --- */}
      <div id="ferramentas" className="py-24 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 mb-4">O que você quer criar hoje?</h2>
                <p className="text-slate-500">Selecione uma ferramenta para começar a usar.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
                const Icon = iconMap[tool.iconName] || iconMap['default'];
                return (
                // LINK CORRIGIDO: Agora leva para /ferramenta/slug
                <Link key={tool.slug} href={`/ferramenta/${tool.slug}`} className="group block h-full">
                    <Card className="h-full border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden bg-white flex flex-col">
                        <CardHeader className="flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                                    <Icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <div className="bg-slate-100 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity -mr-2 -mt-2">
                                    <ArrowRight className="w-4 h-4 text-blue-600" />
                                </div>
                            </div>
                            <CardTitle className="text-lg text-slate-800 group-hover:text-blue-700 transition-colors mb-2">
                            {tool.title}
                            </CardTitle>
                            <CardDescription className="text-slate-500 leading-relaxed text-sm">
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

      {/* --- RODAPÉ --- */}
      <div className="bg-slate-900 text-slate-400 py-16 text-center border-t border-slate-800 mt-auto">
         <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center gap-2 mb-6">
                <BookOpen className="w-6 h-6 text-blue-500" />
                <span className="text-white font-bold text-xl tracking-tight">EducaFácil AI</span>
            </div>
            
            <p className="text-sm mb-8 text-slate-500 max-w-md mx-auto">
                Ferramenta desenvolvida para simplificar a educação no Brasil. 
                Economize tempo, foque no que importa: seus alunos.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-6 text-xs font-medium uppercase tracking-wider mb-10">
                {/* LINKS REAIS DE NAVEGAÇÃO */}
                <Link href="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
                <Link href="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
                <a href="https://wa.me/5521977402510" target="_blank" className="hover:text-white transition-colors">Suporte</a>
            </div>

            <div className="pt-8 border-t border-slate-800/50">
                <p className="text-xs text-slate-600">
                    Desenvolvido com 💙 por <a href="https://www.instagram.com/nkd.ofc/" target="_blank" className="text-blue-500 hover:text-blue-400 font-bold">NKD Tecnologia</a>
                </p>
            </div>
         </div>
      </div>
    </div>
  );
}
