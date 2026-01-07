import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ className, size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const textSizeClasses = {
    sm: { first: 'text-sm', second: 'text-xs' },
    md: { first: 'text-lg', second: 'text-sm' },
    lg: { first: 'text-xl', second: 'text-base' },
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <img
        src="/logo.png"
        alt="Instituto Global de Mentores"
        className={cn(sizeClasses[size], 'flex-shrink-0 object-contain')}
      />
      
      {showText && (
        <div className="flex flex-col">
          <span className={cn('font-bold text-foreground leading-tight', textSizeClasses[size].first)}>
            Instituto Global
          </span>
          <span className={cn('font-medium text-foreground/80 leading-tight', textSizeClasses[size].second)}>
            de Mentores
          </span>
        </div>
      )}
    </div>
  );
}
