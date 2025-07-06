import React from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:active:scale-100';
  
  const variants = {
    primary: 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white focus:ring-emerald-500 shadow-soft hover:shadow-medium hover:-translate-y-0.5 flex items-center justify-center',
    secondary: 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white focus:ring-blue-500 shadow-soft hover:shadow-medium hover:-translate-y-0.5 flex items-center justify-center',
    outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white focus:ring-emerald-500 hover:shadow-soft hover:-translate-y-0.5 transition-all',
    ghost: 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500 hover:shadow-soft',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white focus:ring-red-500 shadow-soft hover:shadow-medium hover:-translate-y-0.5'
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-xs lg:text-sm h-8 lg:h-9 rounded-md lg:rounded-lg',
    md: 'px-4 py-2.5 lg:px-6 lg:py-3 text-sm lg:text-base h-9 lg:h-12 rounded-lg',
    lg: 'px-6 py-3 lg:px-8 lg:py-4 text-base lg:text-lg h-11 lg:h-14 rounded-lg lg:rounded-xl'
  };

  const iconSize = {
    sm: 'w-3 h-3 lg:w-4 lg:h-4', 
    md: 'w-4 h-4 lg:w-5 lg:h-5',
    lg: 'w-5 h-5 lg:w-6 lg:h-6'
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <svg className={`animate-spin -ml-1 mr-2 ${iconSize[size]}`} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </>
      );
    }

    return (
      <>
        {icon && iconPosition === 'left' && (
          <span className={`${children ? 'mr-1.5 lg:mr-2' : ''} ${iconSize[size]}`}>
            {icon}
          </span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className={`${children ? 'ml-1.5 lg:ml-2' : ''} ${iconSize[size]}`}>
            {icon}
          </span>
        )}
      </>
    );
  };
  return (
    <button
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        (disabled || loading) && 'opacity-60 cursor-not-allowed pointer-events-none flex items-center justify-center',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {renderContent()}
    </button>
  );
};