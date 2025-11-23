'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Sparkles, Lock, BookOpen, GraduationCap, FileText, CheckCircle2, Copy, History, Trash2, Eye, LogIn, KeyRound } from 'lucide-react';
import { generateEducationalContent } from '@/app/actions';
import { tools } from '@/lib/tools'; // Importa nossa lista de ferramentas

// Tipo do Histórico
type HistoryItem = {
  id: number;
  toolName: string;
  topic: string;
  content: string;
  date: string;
};

export function TeacherTool({ currentSlug }: { currentSlug: string }) {
  // Encontra a configuração da ferramenta atual
  const currentTool = tools.find(t => t.slug === currentSlug) || tools[0];

  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  
  // Inputs genéricos (Input 1 = Disciplina/Nome, Input 2 = Tema/Detalhes)
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  
  const [accessCode, setAccessCode] = useState(''); 
  const [error, setError] = useState('');
  const [freeUses, setFreeUses] = useState(0);
  const [isVip, setIsVip] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const CHECKOUT_LINK = "https://mercadopago.com.br"; // Mude depois
  const SENHA_MESTRA_DO_SERVIDOR = "PROF2025"; 

  useEffect(() => {
    const savedUses = localStorage.getItem('educafacil_uses');
    const savedVip = localStorage.getItem('educafacil_vip');
    const savedHistory = localStorage.getItem('educafacil_history');
    
    if (savedUses) setFreeUses(parseInt(savedUses || '0'));
    if (savedVip === 'true') setIsVip(true);
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const saveToHistory = (contentResult: string) => {
    const newItem: HistoryItem = {
      id: Date.now(),
      toolName: currentTool.title,
      topic: input1 + " - " + input2.substring(0, 20),
      content: contentResult,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const newHistory = [newItem, ...history].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem('educafacil_history', JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('educafacil_history');
  }

  const handleLogin = () => {
    if (accessCode === SENHA_MESTRA_DO_SERVIDOR) {
      setIsVip(true);
      localStorage.setItem('educafacil_vip', 'true');
      setError('');
      alert("Acesso de Professor Liberado! 🍎");
    } else {
      setError("Senha incorreta.");
    }
  };

  const handleGenerate = async () => {
    const currentUses = parseInt(localStorage.getItem('educafacil_uses') || '0');
    const currentVip = localStorage.getItem('educafacil_vip') === 'true';
    const isFreeTrial = currentUses < 3; // PROFESSORES GANHAM 3 TESTES (Mais generoso)

    if (currentUses !== freeUses) setFreeUses(currentUses);
    if (currentVip !== isVip) setIsVip(currentVip);

    const userProvidedPassword = accessCode.trim();

    if (!currentVip && !isFreeTrial && !userProvidedPassword) {
      setError('🔒 Limite gratuito atingido. Adquira o acesso vitalício.');
      setFreeUses(currentUses); 
      return;
    }

    if (!input1 || !input2) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    setError('');
    
    const codeToSend = userProvidedPassword || ((isFreeTrial || currentVip) ? SENHA_MESTRA_DO_SERVIDOR : '');

    // Chama a ação nova de educação
    const result = await generateEducationalContent(currentSlug, input1, input2, codeToSend);

    if (result.error) {
      setError(result.error);
      if (currentVip) {
         setIsVip(false);
         localStorage.removeItem('educafacil_vip');
      }
    } else if (result.data) {
      setGeneratedContent(result.data);
      saveToHistory(result.data);
      
      if (isFreeTrial && !userProvidedPassword) {
        const newUses = currentUses + 1;
        setFreeUses(newUses);
        localStorage.setItem('educafacil_uses', newUses.toString());
      }
      if (!result.error && userProvidedPassword) {
        setIsVip(true);
        localStorage.setItem('educafacil_vip', 'true');
      }
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    alert('Conteúdo copiado!');
  };

  const isLocked = !isVip && freeUses >= 3;

  return (
    <div className="grid gap-8 w-full max-w-6xl grid-cols-1 md:grid-cols-12 items-start">
      
      {/* ESQUERDA - FORMULÁRIO */}
      <div className="md:col-span-7 space-y-6">
        <Card className="border-slate-200 shadow-xl bg-white">
          <CardHeader className="pb-4 border-b border-slate-100 bg-blue-50/50 rounded-t-xl">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="flex items-center gap-2 text-xl text-blue-900">
                <BookOpen className="h-6 w-6 text-blue-600" />
                {currentTool.title}
              </CardTitle>
              {!isVip && freeUses < 3 && (
                <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold border border-green-200 uppercase tracking-wide">
                  {3 - freeUses} Usos Grátis
                </span>
              )}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              {currentTool.description}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-6">
            
            {/* ÁREA DE LOGIN */}
            {!isVip && (
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex gap-2 items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600 text-xs font-bold uppercase">
                    <KeyRound className="w-4 h-4" /> Já tem senha?
                </div>
                <div className="flex gap-2 flex-1 max-w-[250px]">
                    <Input type="password" placeholder="Senha..." value={accessCode} onChange={(e) => setAccessCode(e.target.value)} className="h-8 text-xs bg-white" />
                    <Button onClick={handleLogin} size="sm" className="h-8 bg-slate-700 hover:bg-slate-800">Entrar</Button>
                </div>
              </div>
            )}

            {/* BLOCO DE VENDA */}
            {isLocked && (
              <div className="bg-yellow-50 p-6 rounded-xl border-2 border-yellow-200 space-y-3 text-center shadow-sm">
                <GraduationCap className="w-10 h-10 text-yellow-600 mx-auto" />
                <h3 className="text-yellow-900 font-bold text-lg">Gostou, Profe?</h3>
                <p className="text-yellow-800 text-sm mb-2">
                  Adquira o acesso vitalício e tenha um assistente pedagógico para sempre. Custa menos que um lanche.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 shadow-md" onClick={() => window.open(CHECKOUT_LINK, '_blank')}>
                  LIBERAR ACESSO (R$ 19,90)
                </Button>
              </div>
            )}

            <div className={`space-y-4 ${isLocked ? 'opacity-40 pointer-events-none grayscale' : ''}`}>
              {/* INPUT 1 - DINÂMICO */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-bold">{currentTool.labelInput1}</Label>
                <Input 
                  value={input1} 
                  onChange={(e) => setInput1(e.target.value)} 
                  className="h-12 text-lg bg-slate-50 border-slate-300"
                />
              </div>

              {/* INPUT 2 - DINÂMICO */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-bold">{currentTool.labelInput2}</Label>
                <Textarea 
                  value={input2} 
                  onChange={(e) => setInput2(e.target.value)} 
                  placeholder={currentTool.placeholderInput2}
                  className="h-32 resize-none text-base bg-slate-50 border-slate-300"
                />
              </div>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm font-bold border border-red-200 flex items-center gap-2"><Lock className="w-4 h-4" /> {error}</div>}

            {!isLocked && (
                <Button onClick={handleGenerate} className="w-full py-7 text-lg font-bold shadow-lg bg-blue-600 hover:bg-blue-700 transition-all" disabled={loading}>
                {loading ? <span className="flex items-center gap-2">Pensando... <Sparkles className="w-4 h-4 animate-spin"/></span> : <span className="flex items-center gap-2"><Sparkles className="w-5 h-5" /> Gerar Agora</span>}
                </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* DIREITA - RESULTADO */}
      <div className="md:col-span-5 space-y-6">
        <Card className="bg-white border-slate-200 shadow-xl h-[500px] flex flex-col">
          <CardHeader className="pb-2 border-b border-slate-100 bg-slate-50 rounded-t-xl">
            <CardTitle className="text-lg text-slate-700">Resultado</CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col min-h-0 relative">
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                {generatedContent ? (
                  <div className="whitespace-pre-wrap text-slate-700 font-serif text-sm leading-relaxed">
                    {generatedContent}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-3">
                    <FileText className="h-10 w-10 opacity-20" />
                    <p className="text-sm text-center max-w-[180px]">O conteúdo da sua aula aparecerá aqui...</p>
                  </div>
                )}
            </div>
            {generatedContent && (
                <div className="p-4 border-t border-slate-100 bg-white absolute bottom-0 w-full shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
                    <Button onClick={copyToClipboard} variant="outline" className="w-full font-bold border-blue-200 text-blue-700 hover:bg-blue-50">
                        <Copy className="w-4 h-4 mr-2" /> Copiar Texto
                    </Button>
                </div>
            )}
          </CardContent>
        </Card>

        {/* HISTÓRICO SIMPLES */}
        {history.length > 0 && (
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 flex items-center gap-2"><History className="w-3 h-3"/> Histórico</h4>
                <div className="space-y-2">
                    {history.map((item) => (
                        <div key={item.id} onClick={() => setGeneratedContent(item.content)} className="bg-white p-2 rounded border border-slate-200 text-xs text-slate-600 cursor-pointer hover:border-blue-400 transition-all truncate">
                            <span className="font-bold">{item.toolName}:</span> {item.topic}
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}