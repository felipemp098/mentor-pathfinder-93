import { SlideConfig, QuizAnswers } from '@/types/quiz';
import { OptionCard } from '../OptionCard';
import { NavigationButtons } from '../NavigationButtons';

interface QuestionSlideProps {
  slide: SlideConfig;
  answers: QuizAnswers;
  onAnswer: (key: keyof QuizAnswers, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function QuestionSlide({ slide, answers, onAnswer, onNext, onBack }: QuestionSlideProps) {
  const selectedValue = slide.answerKey ? answers[slide.answerKey] : undefined;

  const handleSelect = (value: string) => {
    if (slide.answerKey) {
      onAnswer(slide.answerKey, value);
    }
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-primary mb-8 text-center leading-tight">
        {slide.question}
      </h2>

      <div className="space-y-3 max-w-2xl mx-auto">
        {slide.options?.map((option) => (
          <OptionCard
            key={option.value}
            value={option.value}
            label={option.label}
            icon={option.icon}
            selected={selectedValue === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>

      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!selectedValue}
      />
    </div>
  );
}
