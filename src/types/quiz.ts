export interface QuizAnswers {
  atuacao?: string;
  perfil_atuacao?: string;
  tempo_mercado?: string;
  faturamento_mensal?: string;
  tipo_demanda?: string;
  natureza_problema?: string;
  capacidade_projetos?: string;
  horas_semanais?: string;
  estado_metodologia?: string;
  capacidade_investimento_publico?: string;
  objetivo_90_dias?: string;
  relacionamento_preferido?: string;
  posicionamento_desejado?: string;
}

export interface QuizSubmission {
  id: string;
  created_at: string;
  answers: QuizAnswers;
  status: 'pending' | 'processing' | 'done' | 'error';
  error_message?: string;
}

export interface QuizResult {
  id: string;
  created_at: string;
  submission_id: string;
  result_markdown: string;
  model_used?: string;
}

export interface SlideOption {
  value: string;
  label: string;
  icon?: string;
}

export interface SlideConfig {
  id: number;
  type: 'choice' | 'intro' | 'question' | 'loading' | 'result';
  title?: string;
  subtitle?: string;
  question?: string;
  options?: SlideOption[];
  answerKey?: keyof QuizAnswers;
  buttonText?: string;
}
