'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Sparkles, Lock, Star, Zap, CheckCircle2, Crown, KeyRound, LogIn, History, Copy, Trash2, School, Image as ImageIcon, X, Upload } from 'lucide-react';
import { generateEducationalContent } from '@/app/actions';
import { tools } from '@/lib/tools';

// Tipo Histórico
type HistoryItem = {
  id: number;
  toolName: string;
  topic: string;
  content: string;
  date: string;
};

export function TeacherTool({ currentSlug }: { currentSlug: string }) {
  const currentTool = tools.find(t => t.slug === currentSlug) || tools[0];

  const [loading, setLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  
  // Inputs
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [schoolHeader, setSchoolHeader] = useState(''); // Cabeçalho da escola persistente
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const [accessCode, setAccessCode] = useState(''); 
  const [error, setError] = useState('');
  const [freeUses, setFreeUses] = useState(0);
  const [isVip, setIsVip] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const CHECKOUT_LINK = "https://mercadopago.com.br"; 
  const SENHA_MESTRA = "PROF2025"; 

  useEffect(() => {
    const savedUses = localStorage.getItem('educafacil_uses');
    const savedVip = localStorage.getItem('educafacil_vip');
    const savedHistory = localStorage.getItem('educafacil_history');
    const savedSchool = localStorage.getItem('educafacil_school'); // Carrega a escola salva
    
    if (savedUses) setFreeUses(parseInt(savedUses || '0'));
    if (savedVip === 'true') setIsVip(true);
    if (savedHistory) setHistory(JSON.parse(savedHistory));
    if (savedSchool) setSchoolHeader(savedSchool);
  }, []);

  // Salva a escola automaticamente
  const handleSchoolChange = (val: string) => {
    setSchoolHeader(val);
    localStorage.setItem('educafacil_school', val);
  }

  // Lida com a imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    const currentUses = parseInt(localStorage.getItem('educafacil_uses') || '0');
    const currentVip = localStorage.getItem('educafacil_vip') === 'true';
    const isFreeTrial = currentUses < 3; // Professor ganha 3 testes

    if (currentUses !== freeUses) setFreeUses(currentUses);
    if (currentVip !== isVip) setIsVip(currentVip);

    const userProvidedPassword = accessCode.trim();

    if (!currentVip && !isFreeTrial && !userProvidedPassword) {
      setError('🔒 Seu período de teste acabou. Faça login ou assine.');
      setFreeUses(currentUses); 
      return;
    }

    if (!input1 || !input2) {
      setError('Por favor, preencha os campos principais.');
      return;
    }

    setLoading(true);
    setError('');
    
    const codeToSend = userProvidedPassword || ((isFreeTrial || currentVip) ? SENHA_MESTRA : '');

    // Envia para a nova função multimodal
    const result = await generateEducationalContent(
        currentSlug, 
        input1, 
        input2, 
        schoolHeader, 
        selectedImage, 
        codeToSend
    );

    if (result.error) {
      setError(result.error);
      if (currentVip) { setIsVip(false); localStorage.removeItem('educafacil_vip'); }
    } else if (result.data) {
      setGeneratedContent(result.data);
      
      // Salva histórico
      const newItem = {
        id: Date.now(),
        toolName: currentTool.title,
        topic: input2.substring(0, 30) + "...",
        content: result.data,
        date: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      const newHistory = [newItem, ...history].slice(0, 5);
      setHistory(newHistory);
      localStorage.setItem('educafacil_history', JSON.stringify(newHistory));
      
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
    <div className="grid gap-8 w-full max-w-7xl grid-cols-1 lg:grid-cols-12 items-start">
      
      {/* ESQUERDA: CONFIGURAÇÃO */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* 1. IDENTIDADE DA ESCOLA (PERSISTENTE) */}
        <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="py-3 border-b border-slate-100 bg-slate-50 rounded-t-xl">
                <CardTitle className="text-sm font-bold text-slate-600 flex items-center gap-2">
                    <School className="w-4 h-4 text-blue-600" /> Identidade da Escola (Cabeçalho)
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <Label className="text-xs text-slate-500 mb-1">Nome da Escola / Cabeçalho Padrão (Salvo Automaticamente)</Label>
                <Input 
                    value={schoolHeader} 
                    onChange={(e) => handleSchoolChange(e.target.value)} 
                    placeholder="Ex: Escola Municipal São João - Prof. Maria - Data: ___/___"
                    className="bg-white"
                />
            </CardContent>
        </Card>

        {/* 2. FERRAMENTA ATIVA */}
        <Card className="border-slate-200 shadow-xl bg-white border-t-4 border-t-blue-600">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="flex items-center gap-2 text-xl text-slate-800">
                {isVip ? <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" /> : <Zap className="h-6 w-6 text-blue-600 fill-blue-100" />}
                {currentTool.title}
              </CardTitle>
              {!isVip && freeUses < 3 && (
                <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold border border-green-200 uppercase tracking-wide">
                  {3 - freeUses} Testes Restantes
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm">{currentTool.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-6 pt-4">
            
            {/* LOGIN RÁPIDO */}
            {!isVip && (
              <div className="flex justify-end">
                 <div className="text-xs flex items-center gap-2 text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <KeyRound className="w-3 h-3" />
                    <span>Tem senha VIP?</span>
                    <Input type="password" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} className="h-6 w-24 text-xs bg-white" placeholder="Senha..." />
                    <Button size="sm" onClick={() => accessCode === SENHA_MESTRA && setIsVip(true)} className="h-6 px-2 bg-slate-800 text-[10px]">OK</Button>
                 </div>
              </div>
            )}

            {/* BLOCO DE VENDA */}
            {isLocked && (
              <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200 text-center space-y-3 shadow-inner">
                <Crown className="w-8 h-8 text-yellow-500 fill-yellow-500 mx-auto" />
                <h3 className="text-blue-900 font-bold text-lg">Sua vida mais fácil, Prof!</h3>
                <p className="text-slate-700 text-sm">
                  Tenha acesso ilimitado a todas as ferramentas (Provas, Planejamento, Relatórios) por um valor simbólico.
                </p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 shadow-md" onClick={() => window.open(CHECKOUT_LINK, '_blank')}>
                  LIBERAR ACESSO VITALÍCIO
                </Button>
              </div>
            )}

            <div className={`space-y-5 ${isLocked ? 'opacity-40 pointer-events-none grayscale' : ''}`}>
              
              <div className="space-y-2">
                <Label className="text-slate-700 font-bold">{currentTool.labelInput1}</Label>
                <Input value={input1} onChange={(e) => setInput1(e.target.value)} className="h-11 text-base" />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-700 font-bold">{currentTool.labelInput2}</Label>
                <Textarea 
                    value={input2} 
                    onChange={(e) => setInput2(e.target.value)} 
                    placeholder={currentTool.placeholderInput2}
                    className="h-32 resize-none text-base" 
                />
              </div>

              {/* UPLOAD DE IMAGEM (LIVRO) */}
              <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-100 rounded-full"><ImageIcon className="w-4 h-4 text-blue-600"/></div>
                        <div>
                            <p className="text-xs font-bold text-slate-700">Usar material de apoio (Opcional)</p>
                            <p className="text-[10px] text-slate-500">Tire foto da página do livro ou de uma questão antiga.</p>
                        </div>
                    </div>
                    <div>
                        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                        {selectedImage ? (
                            <Button variant="destructive" size="sm" onClick={() => setSelectedImage(null)} className="h-8 text-xs"><X className="w-3 h-3 mr-1"/> Remover Foto</Button>
                        ) : (
                            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="h-8 text-xs"><Upload className="w-3 h-3 mr-1"/> Enviar Foto</Button>
                        )}
                    </div>
                </div>
                {selectedImage && <p className="text-[10px] text-green-600 mt-2 font-bold flex items-center justify-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Imagem carregada com sucesso!</p>}
              </div>

            </div>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded text-sm font-bold border border-red-200 flex items-center gap-2"><Lock className="w-4 h-4" /> {error}</div>}

            {!isLocked && (
                <Button onClick={handleGenerate} className="w-full py-7 text-lg font-bold shadow-lg bg-blue-600 hover:bg-blue-700 transition-all" disabled={loading}>
                {loading ? <span className="flex items-center gap-2">Preparando material... <Sparkles className="w-4 h-4 animate-spin"/></span> : <span className="flex items-center gap-2"><Sparkles className="w-5 h-5" /> Gerar Agora</span>}
                </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* DIREITA: RESULTADO E HISTÓRICO */}
      <div className="lg:col-span-5 space-y-6">
        <Card className="bg-white border-slate-200 shadow-xl h-[600px] flex flex-col relative">
          <CardHeader className="pb-2 border-b border-slate-100 bg-slate-50 rounded-t-xl pt-4">
            <CardTitle className="text-base text-slate-700 flex justify-between items-center">
                Material Gerado
                {generatedContent && <span className="text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded border border-green-200">Pronto</span>}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col min-h-0 relative bg-white">
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                {generatedContent ? (
                  <div className="whitespace-pre-wrap text-slate-800 font-serif text-sm leading-relaxed">
                    {generatedContent}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 gap-4">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                        <Sparkles className="h-8 w-8 opacity-30" />
                    </div>
                    <p className="text-sm text-center max-w-[200px]">
                        Seu material aparecerá aqui formatado para impressão.
                    </p>
                  </div>
                )}
            </div>
            {generatedContent && (
                <div className="p-4 border-t border-slate-100 bg-slate-50 absolute bottom-0 w-full">
                    <Button onClick={copyToClipboard} variant="outline" className="w-full font-bold border-blue-200 text-blue-700 hover:bg-blue-50">
                        <Copy className="w-4 h-4 mr-2" /> Copiar Texto
                    </Button>
                </div>
            )}
          </CardContent>
        </Card>

        {/* Histórico */}
        {history.length > 0 && (
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-3">
                <div className="flex justify-between items-center mb-2 px-1">
                    <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><History className="w-3 h-3"/> Histórico</h4>
                    <button onClick={clearHistory} className="text-[10px] text-red-400 hover:text-red-600"><Trash2 className="w-3 h-3"/></button>
                </div>
                <div className="space-y-2 max-h-[150px] overflow-y-auto">
                    {history.map((item) => (
                        <div key={item.id} onClick={() => setGeneratedContent(item.content)} className="bg-white p-2 rounded border border-slate-200 text-xs text-slate-600 cursor-pointer hover:border-blue-400 truncate">
                            <span className="font-bold text-blue-600">{item.toolName}</span>: {item.topic}
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
