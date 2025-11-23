export type ToolConfig = {
  slug: string;
  title: string;
  description: string; // A descrição clara que você pediu
  labelInput1: string; // Ex: "Disciplina"
  labelInput2: string; // Ex: "Assunto da Aula"
  placeholderInput2: string;
  iconName: 'book' | 'file' | 'user' | 'star'; // Ícones visuais
};

export const tools: ToolConfig[] = [
  {
    slug: "plano-de-aula",
    title: "Planejador de Aulas Incríveis",
    description: "Crie um roteiro de aula completo, passo a passo, com atividades e cronograma, em segundos.",
    labelInput1: "Disciplina e Turma (Ex: História, 6º Ano)",
    labelInput2: "Qual o tema da aula?",
    placeholderInput2: "Ex: Revolução Francesa, com foco na Queda da Bastilha...",
    iconName: "book"
  },
  {
    slug: "gerador-de-questoes",
    title: "Gerador de Provas e Questões",
    description: "Gere questões de múltipla escolha ou dissertativas com gabarito automático para suas provas.",
    labelInput1: "Disciplina e Nível",
    labelInput2: "Sobre o que são as questões?",
    placeholderInput2: "Ex: 5 questões de múltipla escolha sobre Verbos no Passado...",
    iconName: "file"
  },
  {
    slug: "relatorio-aluno",
    title: "Relatório Individual de Aluno",
    description: "Escreva pareceres descritivos e profissionais para boletins sem perder horas pensando.",
    labelInput1: "Nome do Aluno",
    labelInput2: "Pontos a destacar (Comportamento/Notas)",
    placeholderInput2: "Ex: É muito participativo, mas conversa muito. Melhorou em matemática...",
    iconName: "user"
  },
  {
    slug: "ideias-atividade",
    title: "Dinâmicas e Atividades",
    description: "Ideias criativas para sair da rotina e engajar alunos desinteressados.",
    labelInput1: "Disciplina",
    labelInput2: "Objetivo da Atividade",
    placeholderInput2: "Ex: Ensinar frações usando materiais recicláveis...",
    iconName: "star"
  }
];