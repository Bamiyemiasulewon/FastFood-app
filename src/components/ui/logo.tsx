
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  variant = 'full', 
  className 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  const LogoIcon = () => (
    <div className={cn(
      'relative flex items-center justify-center rounded-full bg-gradient-premium shadow-lg',
      sizeClasses[size]
    )}>
      {/* Artistic background elements */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-burgundy/20 to-gold/20" />
      <div className="absolute top-1 left-1 w-2 h-2 bg-gold/40 rounded-full blur-sm" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-cream/60 rounded-full" />
      
      {/* PnD monogram */}
      <div className="relative z-10 font-display font-bold text-cream">
        <span className={cn(
          'relative',
          size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-xl'
        )}>
          P
          <span className="relative">
            <span className="text-gold">n</span>
          </span>
          D
        </span>
      </div>
      
      {/* Artistic palette knife accent */}
      <div className="absolute -bottom-1 -right-1 w-3 h-0.5 bg-gold rounded-full transform rotate-45 opacity-80" />
    </div>
  );

  const LogoText = () => (
    <div className="flex flex-col">
      <h1 className={cn(
        'font-display font-semibold text-gradient-premium leading-none',
        textSizeClasses[size]
      )}>
        Pallette n' Drapes
      </h1>
      <p className={cn(
        'font-body text-muted-foreground italic',
        size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
      )}>
        Culinary Artistry
      </p>
    </div>
  );

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  if (variant === 'text') {
    return <LogoText />;
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <LogoIcon />
      <LogoText />
    </div>
  );
};
