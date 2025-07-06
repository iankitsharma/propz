import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gray' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  rounded?: boolean;
  glow?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gray',
  size = 'md',
  className,
  rounded = false,
  glow = false
}) => {
  const variants = {
    primary: 'bg-emerald-100 text-emerald-800 ring-emerald-600/20',
    secondary: 'bg-blue-100 text-blue-800 ring-blue-600/20',
    success: 'bg-green-100 text-green-800 ring-green-600/20',
    warning: 'bg-yellow-100 text-yellow-800 ring-yellow-600/20',
    danger: 'bg-red-100 text-red-800 ring-red-600/20',
    gray: 'bg-gray-100 text-gray-800 ring-gray-600/20',
    gradient: 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg'
  };

  const sizes = {
    sm: 'px-2 py-0.5 lg:px-2.5 lg:py-1 text-xs',
    md: 'px-2.5 py-1 lg:px-3 lg:py-1.5 text-xs lg:text-sm',
    lg: 'px-3 py-1.5 lg:px-4 lg:py-2 text-sm lg:text-base'
  };

  const baseClasses = clsx(
    'inline-flex items-center font-medium transition-all duration-200',
    rounded ? 'rounded-full' : 'rounded-md lg:rounded-lg',
    variant !== 'gradient' && 'ring-1 ring-inset',
    glow && variant === 'gradient' && 'shadow-emerald-500/25',
    variants[variant],
    sizes[size],
    className
  );

  return (
    <span className={baseClasses}>
      {children}
    </span>
  );
};