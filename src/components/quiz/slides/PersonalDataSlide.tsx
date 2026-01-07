import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Instagram } from 'lucide-react';
import { SlideConfig, QuizAnswers } from '@/types/quiz';
import { cn } from '@/lib/utils';

interface PersonalDataSlideProps {
  slide: SlideConfig;
  answers: QuizAnswers;
  onAnswer: (key: keyof QuizAnswers, value: string) => void;
}

// Format phone number to (00) 00000-0000
function formatPhoneNumber(value: string): string {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}

// Format Instagram handle (add @ if not present)
function formatInstagram(value: string): string {
  if (!value) return '';
  // Remove @ if already present to avoid duplicates
  const cleaned = value.replace(/^@+/, '');
  return cleaned ? `@${cleaned}` : '';
}

export function PersonalDataSlide({ slide, answers, onAnswer }: PersonalDataSlideProps) {
  // Initialize with formatted values
  const getInitialWhatsapp = () => {
    if (!answers.whatsapp) return '';
    // If already formatted, use it; otherwise format it
    return answers.whatsapp.includes('(') ? answers.whatsapp : formatPhoneNumber(answers.whatsapp);
  };

  const getInitialInstagram = () => {
    if (!answers.instagram) return '';
    // If already has @, use it; otherwise add it
    return answers.instagram.startsWith('@') ? answers.instagram : `@${answers.instagram}`;
  };

  const [formData, setFormData] = useState({
    nome: answers.nome || '',
    email: answers.email || '',
    whatsapp: getInitialWhatsapp(),
    instagram: getInitialInstagram(),
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    let formattedValue = value;
    let rawValue = value;
    
    if (field === 'whatsapp') {
      // Remove all non-digits for processing
      const numbers = value.replace(/\D/g, '');
      formattedValue = formatPhoneNumber(numbers);
      rawValue = numbers; // Save only numbers
    } else if (field === 'instagram') {
      // Remove @ if present to avoid duplicates, remove spaces and special chars
      const cleaned = value.replace(/^@+/, '').replace(/\s/g, '').replace(/[^a-zA-Z0-9._]/g, '');
      formattedValue = cleaned ? `@${cleaned}` : '';
      rawValue = cleaned; // Save without @
    } else {
      rawValue = value;
    }
    
    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    onAnswer(field as keyof QuizAnswers, rawValue);
  };


  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-bold text-foreground mb-4 text-center leading-tight">
        {slide.title || 'Dados Pessoais'}
      </h2>
      
      {slide.subtitle && (
        <p className="text-muted-foreground text-center mb-8">
          {slide.subtitle}
        </p>
      )}

      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            className={cn(
              "relative w-full rounded-xl border-2 transition-all duration-200",
              "hover:border-accent hover:shadow-card hover:bg-card/50",
              "focus-within:border-accent focus-within:shadow-card",
              formData.nome 
                ? "border-accent bg-accent/10 shadow-card" 
                : "border-border/50 bg-card/80"
            )}
            whileHover={{ scale: 1.01 }}
          >
            <div className="p-4">
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 flex items-center justify-center rounded-lg bg-secondary w-10 h-10">
                  <User className="w-5 h-5 text-foreground" />
                </span>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  className={cn(
                    "flex-1 bg-transparent border-0 outline-none text-base font-medium",
                    "placeholder:text-muted-foreground",
                    formData.nome ? "text-foreground" : "text-foreground/80"
                  )}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className={cn(
              "relative w-full rounded-xl border-2 transition-all duration-200",
              "hover:border-accent hover:shadow-card hover:bg-card/50",
              "focus-within:border-accent focus-within:shadow-card",
              formData.email 
                ? "border-accent bg-accent/10 shadow-card" 
                : "border-border/50 bg-card/80"
            )}
            whileHover={{ scale: 1.01 }}
          >
            <div className="p-4">
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 flex items-center justify-center rounded-lg bg-secondary w-10 h-10">
                  <Mail className="w-5 h-5 text-foreground" />
                </span>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={cn(
                    "flex-1 bg-transparent border-0 outline-none text-base font-medium",
                    "placeholder:text-muted-foreground",
                    formData.email ? "text-foreground" : "text-foreground/80"
                  )}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className={cn(
              "relative w-full rounded-xl border-2 transition-all duration-200",
              "hover:border-accent hover:shadow-card hover:bg-card/50",
              "focus-within:border-accent focus-within:shadow-card",
              formData.whatsapp 
                ? "border-accent bg-accent/10 shadow-card" 
                : "border-border/50 bg-card/80"
            )}
            whileHover={{ scale: 1.01 }}
          >
            <div className="p-4">
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 flex items-center justify-center rounded-lg bg-secondary w-10 h-10">
                  <Phone className="w-5 h-5 text-foreground" />
                </span>
                <input
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={formData.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  maxLength={15}
                  className={cn(
                    "flex-1 bg-transparent border-0 outline-none text-base font-medium",
                    "placeholder:text-muted-foreground",
                    formData.whatsapp ? "text-foreground" : "text-foreground/80"
                  )}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className={cn(
              "relative w-full rounded-xl border-2 transition-all duration-200",
              "hover:border-accent hover:shadow-card hover:bg-card/50",
              "focus-within:border-accent focus-within:shadow-card",
              formData.instagram 
                ? "border-accent bg-accent/10 shadow-card" 
                : "border-border/50 bg-card/80"
            )}
            whileHover={{ scale: 1.01 }}
          >
            <div className="p-4">
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 flex items-center justify-center rounded-lg bg-secondary w-10 h-10">
                  <Instagram className="w-5 h-5 text-foreground" />
                </span>
                <input
                  type="text"
                  placeholder="@seuinstagram"
                  value={formData.instagram}
                  onChange={(e) => handleChange('instagram', e.target.value)}
                  className={cn(
                    "flex-1 bg-transparent border-0 outline-none text-base font-medium",
                    "placeholder:text-muted-foreground",
                    formData.instagram ? "text-foreground" : "text-foreground/80"
                  )}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
