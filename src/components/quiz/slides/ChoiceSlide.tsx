import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideConfig, QuizAnswers } from '@/types/quiz';
import { OptionCard } from '../OptionCard';

interface ChoiceSlideProps {
  slide: SlideConfig;
  answers: QuizAnswers;
  onAnswer: (key: keyof QuizAnswers, value: string) => void;
}

export function ChoiceSlide({ slide, answers, onAnswer }: ChoiceSlideProps) {
  const selectedValue = slide.answerKey ? answers[slide.answerKey] : undefined;
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelect = (value: string) => {
    if (slide.answerKey && !isAnimating) {
      setIsAnimating(true);
      onAnswer(slide.answerKey, value);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
        {slide.title}
      </h1>
      {slide.subtitle && (
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          {slide.subtitle}
        </p>
      )}
      
      {slide.question && (
        <p className="text-xl font-semibold text-foreground mb-6">
          {slide.question}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
        <AnimatePresence mode="wait">
          {slide.options?.map((option, index) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <OptionCard
                value={option.value}
                label={option.label}
                icon={option.icon}
                selected={selectedValue === option.value}
                onClick={() => handleSelect(option.value)}
                variant="large"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
