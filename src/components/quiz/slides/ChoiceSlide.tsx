import { SlideConfig, QuizAnswers } from '@/types/quiz';
import { OptionCard } from '../OptionCard';
import { NavigationButtons } from '../NavigationButtons';

interface ChoiceSlideProps {
  slide: SlideConfig;
  answers: QuizAnswers;
  onAnswer: (key: keyof QuizAnswers, value: string) => void;
  onNext: () => void;
}

export function ChoiceSlide({ slide, answers, onAnswer, onNext }: ChoiceSlideProps) {
  const selectedValue = slide.answerKey ? answers[slide.answerKey] : undefined;

  const handleSelect = (value: string) => {
    if (slide.answerKey) {
      onAnswer(slide.answerKey, value);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-primary mb-4 leading-tight">
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
        {slide.options?.map((option) => (
          <OptionCard
            key={option.value}
            value={option.value}
            label={option.label}
            icon={option.icon}
            selected={selectedValue === option.value}
            onClick={() => handleSelect(option.value)}
            variant="large"
          />
        ))}
      </div>

      <NavigationButtons
        showBack={false}
        onNext={onNext}
        nextDisabled={!selectedValue}
      />
    </div>
  );
}
