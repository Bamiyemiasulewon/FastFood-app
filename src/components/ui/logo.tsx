
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
      'relative flex items-center justify-center rounded-full bg-gradient-to-br from-burgundy to-burgundy/80 shadow-xl',
      sizeClasses[size]
    )}>
      {/* Artistic background elements */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/30 to-transparent" />
      <div className="absolute top-1 left-1 w-2 h-2 bg-gold/60 rounded-full blur-sm" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-cream/80 rounded-full" />
      
      {/* PnD monogram */}
      <div className="relative z-10 font-display font-bold text-cream drop-shadow-lg">
        <span className={cn(
          'relative tracking-tight',
          size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-xl'
        )}>
          P
          <span className="relative mx-0.5">
            <span className="text-gold font-extrabold">n'</span>
          </span>
          D
        </span>
      </div>
      
      {/* Artistic palette knife accent */}
      <div className="absolute -bottom-1 -right-1 w-3 h-0.5 bg-gold rounded-full transform rotate-45 opacity-90 shadow-sm" />
    </div>
  );

  const LogoText = () => (
    <div className="flex flex-col">
      <h1 className={cn(
        'font-display font-bold text-burgundy leading-none tracking-wide drop-shadow-sm',
        textSizeClasses[size]
      )}>
        Pallette n' Drapes
      </h1>
      <p className={cn(
        'font-body text-burgundy/70 italic font-medium tracking-wider',
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
