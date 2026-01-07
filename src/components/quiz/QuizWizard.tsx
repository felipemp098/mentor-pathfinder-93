import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
import { PersonalDataSlide } from './slides/PersonalDataSlide';
import { QuizAnswers } from '@/types/quiz';
import { Logo } from '@/components/Logo';

export function QuizWizard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentSlide, answers, setAnswer, nextSlide, prevSlide, resetQuiz, goToSlide } = useQuizState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentSlideConfig = quizSlides.find(s => s.id === currentSlide);
  const totalQuestions = quizSlides.filter(s => s.type === 'question').length + 1; // +1 for choice slide
  const currentQuestionNumber = currentSlide <= 1 ? 1 : Math.min(currentSlide - 1, totalQuestions);

  // Removed auto-submit - user must click button to generate result

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

  // Auto-submit when loading slide appears
  useEffect(() => {
    if (currentSlideConfig?.type === 'loading' && !isSubmitting) {
      // Wait a bit to show loading animation, then submit
      const timer = setTimeout(() => {
        submitQuiz();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, currentSlideConfig?.type, isSubmitting]);

  const handleBack = () => {
    prevSlide();
  };


  const handleAnswer = (key: keyof QuizAnswers, value: string) => {
    setAnswer(key, value);
    // Auto-advance after a short delay for animation (except for personal_data, loading, and last question)
    if (currentSlideConfig?.type !== 'loading' && 
        currentSlideConfig?.type !== 'personal_data' && 
        !isLastQuestion) {
      setTimeout(() => {
        nextSlide();
      }, 500);
    }
  };

  if (!currentSlideConfig) {
    return null;
  }

  const showProgress = currentSlideConfig.type !== 'loading';
  const isFirstSlide = currentSlide === 1;
  const isLastQuestion = currentSlide === 15; // Last question (id 15) before loading
  const isIntroSlide = currentSlideConfig.type === 'intro';
  const isChoiceSlide = currentSlideConfig.type === 'choice';
  const isQuestionSlide = currentSlideConfig.type === 'question';
  const isPersonalDataSlide = currentSlideConfig.type === 'personal_data';
  const isLoadingSlide = currentSlideConfig.type === 'loading';
  
  // Check if current question has an answer
  const currentAnswer = currentSlideConfig.answerKey 
    ? answers[currentSlideConfig.answerKey] 
    : undefined;
  
  // For personal data slide, check if all fields are filled
  const isPersonalDataComplete = isPersonalDataSlide 
    ? answers.nome && answers.email && answers.whatsapp && answers.instagram
    : false;
  
  const canProceed = isIntroSlide || isPersonalDataComplete || currentAnswer !== undefined;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full py-4 px-4 border-b border-border/50">
        <div className="max-w-4xl mx-auto flex justify-center items-center">
          <Logo size="sm" />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center px-4 py-8 pb-32">
        <div className="w-full max-w-3xl mx-auto">
          {showProgress && (
            <ProgressBar current={currentQuestionNumber} total={totalQuestions} />
          )}

          <SlideWrapper slideKey={currentSlide}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-6 md:p-8 lg:p-10 shadow-card border border-border/80"
            >
              {currentSlideConfig.type === 'personal_data' && (
                <PersonalDataSlide
                  slide={currentSlideConfig}
                  answers={answers}
                  onAnswer={handleAnswer}
                />
              )}
              {currentSlideConfig.type === 'choice' && (
                <ChoiceSlide
                  slide={currentSlideConfig}
                  answers={answers}
                  onAnswer={handleAnswer}
                />
              )}
              {currentSlideConfig.type === 'intro' && (
                <IntroSlide
                  slide={currentSlideConfig}
                  onStart={handleNext}
                />
              )}
              {currentSlideConfig.type === 'question' && (
                <QuestionSlide
                  slide={currentSlideConfig}
                  answers={answers}
                  onAnswer={handleAnswer}
                />
              )}
              {currentSlideConfig.type === 'loading' && (
                <LoadingSlide 
                  slide={currentSlideConfig}
                />
              )}
            </motion.div>
          </SlideWrapper>
        </div>
      </main>

      {/* Fixed Footer with Navigation */}
      {!isLoadingSlide && (
        <footer className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border/50 py-4 px-4 z-50">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center gap-4">
              <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={isFirstSlide || isChoiceSlide}
                  className="gap-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Voltar
                </Button>
              </motion.div>
              
              {!isIntroSlide && (
                <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="gap-2 bg-gradient-gold text-white hover:opacity-90 disabled:opacity-50 font-semibold px-6"
                  >
                    {isLastQuestion ? 'Gerar Resultado' : 'Continuar'}
                    {isLastQuestion ? null : <ChevronRight className="w-4 h-4" />}
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </footer>
      )}

      {/* Copyright Footer */}
      <footer className="py-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Instituto Global de Mentores
      </footer>
    </div>
  );
}
