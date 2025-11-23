'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const SENHA_MESTRA = "PROF2025"; // Nova senha para professoras

export async function generateEducationalContent(slug: string, input1: string, input2: string, accessCode: string) {
  
  // Verificação de Senha (Igual ao outro, mas adaptado)
  if (accessCode !== SENHA_MESTRA) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay anti-brute-force
    return { error: '⛔ Código de Acesso Inválido.' };
  }

  if (!process.env.GEMINI_API_KEY) return { error: 'Erro interno de configuração.' };
  if (!input1 || !input2) return { error: 'Preencha todos os campos.' };

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-001' });

    // O "Prompt Router": Escolhe o comando certo baseada na ferramenta escolhida
    let prompt = "";

    if (slug === 'plano-de-aula') {
      prompt = `
        Aja como uma Coordenadora Pedagógica Experiente.
        Crie um Plano de Aula detalhado para: ${input1}.
        Tema: ${input2}.
        
        Estrutura obrigatória:
        1. Objetivos de Aprendizagem (BNCC se possível).
        2. Estrutura da Aula (Cronograma em minutos).
        3. Metodologia (Como explicar).
        4. Atividade Prática sugerida.
        5. Avaliação.
        Use formatação clara, tópicos e negrito.
      `;
    } else if (slug === 'gerador-de-questoes') {
      prompt = `
        Crie uma prova/lista de exercícios para: ${input1}.
        Assunto: ${input2}.
        
        Gere o conteúdo com enunciado claro.
        SEMPRE inclua o GABARITO no final.
        Se for múltipla escolha, marque a correta no gabarito.
      `;
    } else if (slug === 'relatorio-aluno') {
      prompt = `
        Escreva um relatório descritivo escolar profissional e empático para o aluno: ${input1}.
        Características observadas: ${input2}.
        
        Use linguagem formal pedagógica, mas acolhedora.
        Foque no desenvolvimento e sugestões de melhoria.
        Evite termos negativos diretos, use "pontos de atenção".
      `;
    } else {
      // Genérico para outras ferramentas
      prompt = `Aja como um assistente escolar para ${input1}. Ajude com: ${input2}. Seja didático.`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return { success: true, data: response.text() };
  } catch (error: any) {
    console.error("Erro API:", error);
    return { error: 'Erro ao gerar. Tente novamente.' };
  }
}