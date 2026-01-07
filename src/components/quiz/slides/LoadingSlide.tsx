import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Brain, Sparkles, Target } from 'lucide-react';
import { SlideConfig } from '@/types/quiz';

interface LoadingSlideProps {
  slide: SlideConfig;
}

const loadingSteps = [
  { icon: Brain, text: 'Analisando seu perfil...' },
  { icon: Target, text: 'Identificando oportunidades...' },
  { icon: Sparkles, text: 'Gerando recomendações personalizadas...' },
];

export function LoadingSlide({ slide }: LoadingSlideProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = loadingSteps[currentStep].icon;

  return (
    <div className="text-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="relative w-32 h-32 mx-auto mb-8"
      >
        {/* Outer ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-accent/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner content */}
        <div className="absolute inset-4 rounded-full bg-gradient-gold flex items-center justify-center shadow-elegant">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentIcon className="w-12 h-12 text-accent-foreground" />
          </motion.div>
        </div>
      </motion.div>

      <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">
        {slide.title}
      </h2>
      
      <motion.p
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg text-muted-foreground"
      >
        {loadingSteps[currentStep].text}
      </motion.p>
      
      <div className="flex justify-center gap-2 mt-8">
        {loadingSteps.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentStep ? 'bg-accent' : 'bg-border'
            }`}
            animate={index === currentStep ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}
