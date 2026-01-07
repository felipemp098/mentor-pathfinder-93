export interface MentoriaFormat {
  title: string;
  estrutura: {
    publico: string;
    promessa: string;
    entrega: string;
    duracao: string;
    frequencia: string;
    entregaveis: string;
    vagas: string;
  };
  porQueFazSentido: string;
  potencialLucrativo: {
    ticketSugerido: string;
    cenarioConservador: string;
    cenarioOtimista: string;
  };
  caminhoParaEscala: string;
}

export interface ResultData {
  summary: string[];
  formats: MentoriaFormat[];
  recomendacao: string;
  proximosPassos: string[];
}
