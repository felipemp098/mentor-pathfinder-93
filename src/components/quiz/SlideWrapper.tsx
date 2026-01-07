import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideWrapperProps {
  children: ReactNode;
  slideKey: number | string;
}

export function SlideWrapper({ children, slideKey }: SlideWrapperProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slideKey}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
