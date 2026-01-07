import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuizState } from '@/hooks/useQuizState';
import { quizSlides } from '@/data/quizSlides';
import { ProgressBar } from './ProgressBar';
import { SlideWrapper } from './SlideWrapper';
import { ChoiceSlide } from './slides/ChoiceSlide';
import { IntroSlide } from './slides/IntroSlide';
import { QuestionSlide } from './slides/QuestionSlide';
import { LoadingSlide } from './slides/LoadingSlide';
import { QuizAnswers } from '@/types/quiz';

export function QuizWizard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentSlide, answers, setAnswer, nextSlide, prevSlide, resetQuiz, goToSlide } = useQuizState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentSlideConfig = quizSlides.find(s => s.id === currentSlide);
  const totalQuestions = quizSlides.filter(s => s.type === 'question').length + 1; // +1 for choice slide
  const currentQuestionNumber = currentSlide <= 1 ? 1 : Math.min(currentSlide - 1, totalQuestions);

  // Handle loading slide submission
  useEffect(() => {
    if (currentSlideConfig?.type === 'loading' && !isSubmitting) {
      submitQuiz();
    }
  }, [currentSlide, currentSlideConfig?.type]);

  const submitQuiz = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Insert submission
      const { data: submission, error: submitError } = await supabase
        .from('quiz_submissions')
        .insert([{ 
          answers: JSON.parse(JSON.stringify(answers)),
          status: 'pending'
        }])
        .select()
        .single();

      if (submitError) throw submitError;

      // Call edge function
      const { data: result, error: fnError } = await supabase.functions.invoke('generate-mentoria-result', {
        body: { submission_id: submission.id }
      });

      if (fnError) throw fnError;

      // Navigate to result
      navigate(`/resultado?id=${submission.id}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast({
        title: "Erro ao processar",
        description: "Ocorreu um erro. Por favor, tente novamente.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      goToSlide(14); // Go back to last question
    }
  };

  const handleNext = () => {
    nextSlide();
  };

  const handleBack = () => {
    prevSlide();
  };

  const handleReset = () => {
    resetQuiz();
  };

  const handleAnswer = (key: keyof QuizAnswers, value: string) => {
    setAnswer(key, value);
  };

  if (!currentSlideConfig) {
    return null;
  }

  const showProgress = currentSlideConfig.type !== 'loading';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-border/50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-display font-bold text-primary">
            Diagnóstico de Mentoria
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center px-4 py-8">
        <div className="w-full max-w-3xl mx-auto">
          {showProgress && (
            <ProgressBar current={currentQuestionNumber} total={totalQuestions} />
          )}

          <SlideWrapper slideKey={currentSlide}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-6 md:p-8 lg:p-10 shadow-card border border-border/50"
            >
              {currentSlideConfig.type === 'choice' && (
                <ChoiceSlide
                  slide={currentSlideConfig}
                  answers={answers}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                />
              )}
              {currentSlideConfig.type === 'intro' && (
                <IntroSlide
                  slide={currentSlideConfig}
                  onStart={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentSlideConfig.type === 'question' && (
                <QuestionSlide
                  slide={currentSlideConfig}
                  answers={answers}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                  onBack={handleBack}
                />
              )}
              {currentSlideConfig.type === 'loading' && (
                <LoadingSlide slide={currentSlideConfig} />
              )}
            </motion.div>
          </SlideWrapper>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Diagnóstico de Mentoria
      </footer>
    </div>
  );
}
