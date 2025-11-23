'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const SENHA_MESTRA = "PROF2025"; 

export async function generateEducationalContent(
  slug: string, 
  input1: string, 
  input2: string, 
  schoolContext: string, // Cabeçalho da escola
  imageBase64: string | null, // Foto do livro/prova
  accessCode: string
) {
  
  if (accessCode !== SENHA_MESTRA) {
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    return { error: '⛔ Senha incorreta. Faça login para usar.' };
  }

  if (!process.env.GEMINI_API_KEY) return { error: 'Erro de configuração no servidor.' };

  try {
    // Modelo Flash é rápido e vê imagens
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let promptContext = "";
    
    // Prompt Engenharia Pedagógica
    if (slug === 'banco-de-questoes') {
      promptContext = `Crie uma PROVA/LISTA DE EXERCÍCIOS.
      INSTITUIÇÃO: ${schoolContext}
      DISCIPLINA: ${input1}
      CONTEÚDO: ${input2}
      
      REGRAS:
      1. Crie um cabeçalho profissional com nome da escola (se fornecido).
      2. Se houver imagem, use-a como base estrita para as questões.
      3. Inclua GABARITO no final.
      `;
    } else if (slug === 'adaptacao-inclusao') {
      promptContext = `Você é especialista em Educação Inclusiva.
      Adapte uma atividade para: ${input1}.
      Conteúdo original: ${input2}.
      Contexto Escolar: ${schoolContext}.
      
      Forneça estratégias práticas e o texto da atividade adaptada.
      `;
    } else if (slug === 'planejamento-anual') {
      promptContext = `Crie um Planejamento Anual dividido por Bimestres.
      Curso: ${input1}.
      Foco: ${input2}.
      Baseado na BNCC (Brasil).
      `;
    } else {
      promptContext = `Atue como Coordenador Pedagógico. 
      Ferramenta: ${slug}. 
      Contexto 1: ${input1}. 
      Contexto 2: ${input2}. 
      Escola: ${schoolContext}.
      Se houver imagem, analise-a pedagógicamente.
      `;
    }

    // Monta o pacote para a IA (Texto + Imagem Opcional)
    const parts: any[] = [{ text: promptContext }];
    
    if (imageBase64) {
      const base64Data = imageBase64.split(',')[1] || imageBase64;
      parts.push({
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg",
        },
      });
    }

    const result = await model.generateContent(parts);
    const response = await result.response;
    return { success: true, data: response.text() };
    
  } catch (error: any) {
    console.error("Erro API:", error);
    return { error: 'Erro ao processar. Tente novamente ou use uma imagem menor.' };
  }
}
