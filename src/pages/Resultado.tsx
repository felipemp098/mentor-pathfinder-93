import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Loader2, ArrowRight, RotateCcw, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CTA_URL } from '@/data/quizSlides';

export default function Resultado() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submissionId = searchParams.get('id');

  useEffect(() => {
    if (!submissionId) {
      navigate('/');
      return;
    }

    fetchResult();
  }, [submissionId]);

  const fetchResult = async () => {
    try {
      setLoading(true);
      
      // Try to fetch existing result first
      const { data: existingResult, error: fetchError } = await supabase
        .from('quiz_results')
        .select('result_markdown')
        .eq('submission_id', submissionId)
        .maybeSingle();

      if (existingResult) {
        setResult(existingResult.result_markdown);
        setLoading(false);
        return;
      }

      // If no result, call the edge function
      const { data, error: fnError } = await supabase.functions.invoke('generate-mentoria-result', {
        body: { submission_id: submissionId }
      });

      if (fnError) throw fnError;
      
      if (data?.result_markdown) {
        setResult(data.result_markdown);
      } else {
        throw new Error('Resultado não encontrado');
      }
    } catch (err) {
      console.error('Error fetching result:', err);
      setError('Não foi possível carregar o resultado. Por favor, tente novamente.');
      toast({
        title: "Erro",
        description: "Não foi possível carregar o resultado.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    localStorage.removeItem('quiz_progress');
    navigate('/');
  };

  const handleCTA = () => {
    window.open(CTA_URL, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando seu resultado...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <p className="text-destructive mb-4">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={fetchResult}>
              Tentar novamente
            </Button>
            <Button onClick={handleRestart}>
              Refazer diagnóstico
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-border/50 sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-display font-bold text-primary">
            Diagnóstico de Mentoria
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRestart}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4" />
            Novo diagnóstico
          </Button>
        </div>
      </header>

      {/* Result content */}
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Result header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-4">
              Resultado do Diagnóstico
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-4">
              Seu Plano Estratégico de Mentoria
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Baseado nas suas respostas, criamos uma análise personalizada do seu potencial como mentor.
            </p>
          </div>

          {/* Markdown result */}
          <div className="bg-card rounded-2xl p-6 md:p-8 lg:p-10 shadow-card border border-border/50 mb-10">
            <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-primary prose-h1:text-2xl prose-h2:text-xl prose-h2:border-b prose-h2:border-border prose-h2:pb-2 prose-h2:mb-4 prose-p:text-foreground/80 prose-strong:text-foreground prose-li:text-foreground/80 prose-ul:space-y-2">
              <ReactMarkdown>{result || ''}</ReactMarkdown>
            </article>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-navy rounded-2xl p-8 md:p-10 text-center shadow-elegant"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground mb-4">
              Pronto para dar o próximo passo?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Agende uma reunião estratégica gratuita para discutir como implementar esse modelo de mentoria no seu negócio.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleCTA}
                size="lg"
                className="gap-2 bg-gradient-gold text-accent-foreground hover:opacity-90 font-bold text-lg px-8 py-6"
              >
                <Calendar className="w-5 h-5" />
                SOLICITAR REUNIÃO ESTRATÉGICA
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border/50">
        © {new Date().getFullYear()} Diagnóstico de Mentoria. Todos os direitos reservados.
      </footer>
    </div>
  );
}
