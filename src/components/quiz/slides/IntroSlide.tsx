import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SlideConfig } from '@/types/quiz';
import { Button } from '@/components/ui/button';

interface IntroSlideProps {
  slide: SlideConfig;
  onStart: () => void;
}

export function IntroSlide({ slide, onStart }: IntroSlideProps) {
  return (
    <div className="text-center py-8">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
        {slide.title}
      </h1>
      
      {slide.subtitle && (
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
          {slide.subtitle}
        </p>
      )}

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex justify-center"
      >
        <Button
          onClick={onStart}
          size="lg"
          className="gap-2 bg-gradient-gold text-white hover:opacity-90 font-bold text-lg px-8 py-6 animate-pulse-gold"
        >
          {slide.buttonText || 'Começar'}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );
}
