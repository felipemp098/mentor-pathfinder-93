import { useState, useEffect, useCallback } from 'react';
import { QuizAnswers } from '@/types/quiz';

const STORAGE_KEY = 'quiz_progress';

interface QuizState {
  currentSlide: number;
  answers: QuizAnswers;
}

export function useQuizState() {
  const [state, setState] = useState<QuizState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Invalid data, reset
        }
      }
    }
    return { currentSlide: 1, answers: {} };
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setAnswer = useCallback((key: keyof QuizAnswers, value: string) => {
    setState(prev => ({
      ...prev,
      answers: { ...prev.answers, [key]: value },
    }));
  }, []);

  const goToSlide = useCallback((slide: number) => {
    setState(prev => ({ ...prev, currentSlide: slide }));
  }, []);

  const nextSlide = useCallback(() => {
    setState(prev => ({ ...prev, currentSlide: prev.currentSlide + 1 }));
  }, []);

  const prevSlide = useCallback(() => {
    setState(prev => ({ ...prev, currentSlide: Math.max(1, prev.currentSlide - 1) }));
  }, []);

  const resetQuiz = useCallback(() => {
    setState({ currentSlide: 1, answers: {} });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    currentSlide: state.currentSlide,
    answers: state.answers,
    setAnswer,
    goToSlide,
    nextSlide,
    prevSlide,
    resetQuiz,
  };
}
