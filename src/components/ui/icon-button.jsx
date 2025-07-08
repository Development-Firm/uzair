import React from 'react';
import { cn } from '@/lib/utils'; // Utility function to combine classes

const IconButton = ({
  icon: Icon,
  onClick,
  size = 'medium',
  variant = 'default',
  tooltip = '',
  className,
  children,
  ...props
}) => {
  const sizes = {
    small: 'p-1 text-sm',
    medium: 'p-2 text-base',
    large: 'p-3 text-lg',
  };

  const variants = {
    default: 'text-primary-foreground bg-primary hover:bg-primary/70',
    primary: 'text-primary-foreground bg-primary hover:bg-primary/90',
    secondary: 'text-secondary-foreground bg-secondary hover:bg-secondary/90',
    danger: 'text-destructive-foreground bg-destructive hover:bg-destructive/90',
  };

  return (
    <div className="relative group">
      {tooltip && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-foreground bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
          {tooltip}
        </span>
      )}
      <button
        onClick={onClick}
        className={cn(
          'card-gradient inline-block items-center justify-center rounded-full transition duration-200',
          sizes[size],
          variants[variant],
          className
        )}
        {...props}
      >
        {Icon && <Icon className="w-5 h-5 mr-2" />}
        {children}
      </button>
    </div>
  );
};

export default IconButton;
