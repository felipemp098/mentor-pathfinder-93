import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationButtonsProps {
  onBack?: () => void;
  onNext?: () => void;
  showBack?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
  nextLabel?: string;
}

export function NavigationButtons({
  onBack,
  onNext,
  showBack = true,
  showNext = true,
  nextDisabled = false,
  nextLabel = 'Continuar',
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center gap-4 mt-8">
      {showBack ? (
        <motion.div whileHover={{ x: -2 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </Button>
        </motion.div>
      ) : (
        <div />
      )}
      
      {showNext && (
        <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onNext}
            disabled={nextDisabled}
            className="gap-2 bg-gradient-gold text-accent-foreground hover:opacity-90 disabled:opacity-50 font-semibold px-6"
          >
            {nextLabel}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
