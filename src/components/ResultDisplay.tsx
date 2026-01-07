import { motion } from 'framer-motion';
import { 
  Target, 
  CheckCircle2, 
  Sparkles,
  DollarSign,
  Users,
  Award,
  Lightbulb,
  TrendingUp,
  Calendar,
  FileText
} from 'lucide-react';
import { ResultData } from '@/types/result';

interface ResultDisplayProps {
  markdown: string;
  jsonData?: ResultData | null;
}

export function ResultDisplay({ markdown, jsonData }: ResultDisplayProps) {
  // Try to parse JSON from markdown if jsonData is not provided
  let data: ResultData | null = jsonData || null;

  if (!data) {
    try {
      data = JSON.parse(markdown);
    } catch {
      // If parsing fails, it's markdown - we'll handle it with fallback
      return <MarkdownFallback markdown={markdown} />;
    }
  }

  if (!data) {
    return <MarkdownFallback markdown={markdown} />;
  }

  return (
    <div className="space-y-10">
      {/* Summary Section */}
      {data.summary && data.summary.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-elegant">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Resumo do Perfil
            </h2>
          </div>
          <div className="bg-card/50 rounded-xl p-6 md:p-8 border border-border/50">
            <ul className="space-y-4">
              {data.summary.map((item, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90 leading-relaxed text-lg">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Formats Section */}
      {data.formats && data.formats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-elegant">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Formatos Recomendados
            </h2>
          </div>
          
          <div className="space-y-6">
            {data.formats.map((format, formatIdx) => (
              <motion.div
                key={formatIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + formatIdx * 0.15, duration: 0.5 }}
                className="bg-gradient-to-br from-card via-card/80 to-card/50 rounded-2xl p-6 md:p-8 border-2 border-accent/20 shadow-elegant hover:border-accent/40 transition-all"
              >
                {/* Format Title */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border/30">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
                    {format.title}
                  </h3>
                </div>

                {/* Estrutura */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-accent" />
                    Estrutura
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Público:</span>
                        <p className="text-foreground/90 mt-1">{format.estrutura.publico}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Promessa:</span>
                        <p className="text-foreground/90 mt-1">{format.estrutura.promessa}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Entrega:</span>
                        <p className="text-foreground/90 mt-1">{format.estrutura.entrega}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Duração:</span>
                        <p className="text-foreground/90 mt-1">{format.estrutura.duracao}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Frequência:</span>
                        <p className="text-foreground/90 mt-1">{format.estrutura.frequencia}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Vagas:</span>
                        <p className="text-foreground/90 mt-1">{format.estrutura.vagas}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Entregáveis:</span>
                        <p className="text-foreground/90 mt-1">{format.estrutura.entregaveis}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Por que faz sentido */}
                <div className="mb-6 p-4 bg-accent/5 rounded-xl border-l-4 border-accent/30">
                  <h4 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    Por que faz sentido
                  </h4>
                  <p className="text-foreground/90 leading-relaxed">{format.porQueFazSentido}</p>
                </div>

                {/* Potencial Lucrativo */}
                <div className="mb-6 p-4 bg-gradient-to-r from-accent/10 to-transparent rounded-xl border border-accent/20">
                  <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-accent" />
                    Potencial Lucrativo
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-muted-foreground">Ticket sugerido:</span>
                      <span className="text-foreground font-semibold">{format.potencialLucrativo.ticketSugerido}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-muted-foreground">Cenário conservador:</span>
                      <span className="text-foreground">{format.potencialLucrativo.cenarioConservador}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-muted-foreground">Cenário otimista:</span>
                      <span className="text-foreground">{format.potencialLucrativo.cenarioOtimista}</span>
                    </div>
                  </div>
                </div>

                {/* Caminho para escala */}
                <div className="p-4 bg-card/50 rounded-xl">
                  <h4 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    Caminho para escala
                  </h4>
                  <p className="text-foreground/90 leading-relaxed">{format.caminhoParaEscala}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recommendation Section */}
      {data.recomendacao && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-10"
        >
          <div className="bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rounded-2xl p-8 border-2 border-accent/30 shadow-elegant">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-elegant">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Recomendação Estratégica Final
              </h2>
            </div>
            <p className="text-foreground/90 leading-relaxed text-lg">
              {data.recomendacao}
            </p>
          </div>
        </motion.div>
      )}

      {/* Next Steps Section */}
      {data.proximosPassos && data.proximosPassos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center shadow-elegant">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Próximos Passos
            </h2>
          </div>
          <div className="grid md:grid-cols-1 gap-4">
            {data.proximosPassos.map((passo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                className="bg-card/80 rounded-xl p-6 border border-border/50 hover:border-accent/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center font-bold text-accent text-lg">
                    {idx + 1}
                  </div>
                  <p className="text-foreground/90 leading-relaxed flex-1 text-lg">{passo}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Fallback component for markdown (backward compatibility)
function MarkdownFallback({ markdown }: { markdown: string }) {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-h1:text-2xl prose-h2:text-xl prose-h2:border-b prose-h2:border-border/50 prose-h2:pb-2 prose-h2:mb-4 prose-p:text-foreground prose-strong:text-foreground prose-li:text-foreground prose-ul:space-y-2 prose-a:text-accent hover:prose-a:text-accent/80">
      <pre className="whitespace-pre-wrap text-foreground/90 font-sans">{markdown}</pre>
    </div>
  );
}
