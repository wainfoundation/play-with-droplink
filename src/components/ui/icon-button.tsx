
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  className,
  iconClassName,
  size = 'md',
  disabled = false
}) => {
  const sizeClasses = {
    sm: 'w-20 h-20 text-xs',
    md: 'w-24 h-24 text-sm',
    lg: 'w-28 h-28 text-base'
  };

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-2xl font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        className
      )}
    >
      <Icon className={cn(iconSizes[size], iconClassName)} />
      <span className="leading-tight">{label}</span>
    </button>
  );
};

export default IconButton;
