import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OptionCardProps {
  value: string;
  label: string;
  icon?: string;
  selected: boolean;
  onClick: () => void;
  variant?: 'default' | 'large';
}

export function OptionCard({ 
  value, 
  label, 
  icon, 
  selected, 
  onClick,
  variant = 'default'
}: OptionCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative w-full text-left rounded-xl border-2 transition-all duration-200",
        "hover:border-accent hover:shadow-card",
        "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2",
        variant === 'large' ? "p-6" : "p-4",
        selected 
          ? "border-accent bg-accent/10 shadow-card" 
          : "border-border bg-card"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-4">
        {icon && (
          <span className={cn(
            "flex-shrink-0 flex items-center justify-center rounded-lg bg-secondary",
            variant === 'large' ? "w-14 h-14 text-2xl" : "w-10 h-10 text-xl"
          )}>
            {icon}
          </span>
        )}
        <span className={cn(
          "flex-1 font-medium",
          variant === 'large' ? "text-lg" : "text-base",
          selected ? "text-foreground" : "text-foreground/80"
        )}>
          {label}
        </span>
        {selected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
          >
            <Check className="w-4 h-4 text-accent-foreground" />
          </motion.span>
        )}
      </div>
    </motion.button>
  );
}
