import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideConfig, QuizAnswers } from '@/types/quiz';
import { OptionCard } from '../OptionCard';

interface QuestionSlideProps {
  slide: SlideConfig;
  answers: QuizAnswers;
  onAnswer: (key: keyof QuizAnswers, value: string) => void;
}

export function QuestionSlide({ slide, answers, onAnswer }: QuestionSlideProps) {
  const selectedValue = slide.answerKey ? answers[slide.answerKey] : undefined;
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelect = (value: string) => {
    if (slide.answerKey && !isAnimating) {
      setIsAnimating(true);
      onAnswer(slide.answerKey, value);
    }
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-foreground mb-8 text-center leading-tight">
        {slide.question}
      </h2>

      <div className="space-y-3 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {slide.options?.map((option, index) => (
            <motion.div
              key={option.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <OptionCard
                value={option.value}
                label={option.label}
                icon={option.icon}
                selected={selectedValue === option.value}
                onClick={() => handleSelect(option.value)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
