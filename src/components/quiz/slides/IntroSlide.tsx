import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SlideConfig } from '@/types/quiz';
import { Button } from '@/components/ui/button';

interface IntroSlideProps {
  slide: SlideConfig;
  onStart: () => void;
  onBack: () => void;
}

export function IntroSlide({ slide, onStart, onBack }: IntroSlideProps) {
  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-elegant"
      >
        <Sparkles className="w-10 h-10 text-accent-foreground" />
      </motion.div>

      <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary mb-6 leading-tight">
        {slide.title}
      </h1>
      
      {slide.subtitle && (
        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
          {slide.subtitle}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-muted-foreground"
        >
          ← Voltar
        </Button>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={onStart}
            size="lg"
            className="gap-2 bg-gradient-gold text-accent-foreground hover:opacity-90 font-bold text-lg px-8 py-6 animate-pulse-gold"
          >
            {slide.buttonText || 'Começar'}
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
