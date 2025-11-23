import { BookOpen, FileText, Calendar, Users, BrainCircuit, GraduationCap, Sparkles, ClipboardList } from 'lucide-react';

export type ToolConfig = {
  slug: string;
  title: string;
  description: string;
  labelInput1: string;
  labelInput2: string;
  placeholderInput2: string;
  icon: any;
};

export const tools: ToolConfig[] = [
  {
    slug: "plano-de-aula",
    title: "Planejador de Aula (BNCC)",
    description: "Roteiro passo a passo alinhado à BNCC, com objetivos, metodologia ativa e cronograma.",
    labelInput1: "Disciplina e Ano (Ex: Ciências, 4º Ano)",
    labelInput2: "Tema da Aula",
    placeholderInput2: "Ex: Ciclo da Água e preservação...",
    icon: BookOpen
  },
  {
    slug: "banco-de-questoes",
    title: "Fábrica de Provas e Questões",
    description: "Crie provas completas, listas de exercícios ou simulados com gabarito automático.",
    labelInput1: "Disciplina e Nível de Dificuldade",
    labelInput2: "Conteúdo ou Tópicos",
    placeholderInput2: "Ex: 5 questões de múltipla escolha e 2 dissertativas sobre Frações...",
    icon: FileText
  },
  {
    slug: "planejamento-anual",
    title: "Planejamento Anual / Semestral",
    description: "Estruture todo o conteúdo do ano letivo dividido por bimestres ou trimestres.",
    labelInput1: "Disciplina e Série",
    labelInput2: "Foco ou Livro Didático utilizado",
    placeholderInput2: "Ex: Foco em alfabetização e letramento...",
    icon: Calendar
  },
  {
    slug: "adaptacao-inclusao",
    title: "Adaptação Curricular (Inclusão)",
    description: "Adapte atividades para alunos com TEA, TDAH ou outras necessidades específicas.",
    labelInput1: "Necessidade do Aluno (Ex: Aluno com TEA nível 1)",
    labelInput2: "Atividade original para adaptar",
    placeholderInput2: "Cole a atividade original aqui ou descreva o objetivo...",
    icon: Users
  },
  {
    slug: "relatorio-individual",
    title: "Relatórios e Pareceres",
    description: "Gere os textos para boletins e fichas individuais com linguagem pedagógica profissional.",
    labelInput1: "Nome do Aluno",
    labelInput2: "Observações (Comportamento/Desempenho)",
    placeholderInput2: "Ex: Participativo, mas com dificuldade em interpretação...",
    icon: ClipboardList
  },
  {
    slug: "tradutor-pedagogico",
    title: "Simplificador de Conteúdo",
    description: "Transforme textos complexos de livros em explicações simples para a idade dos alunos.",
    labelInput1: "Idade dos Alunos",
    labelInput2: "Texto ou Tema complexo",
    placeholderInput2: "Cole o texto difícil aqui ou envie a foto...",
    icon: BrainCircuit
  }
];
