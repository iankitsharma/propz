import React, { useState } from 'react';
import { clsx } from 'clsx';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glow?: boolean;
  ripple?: boolean;
  shake?: boolean;
  pulse?: boolean;
  children: React.ReactNode;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  glow = false,
  ripple = true,
  shake = false,
  pulse = false,
  className,
  children,
  disabled,
  onClick,
  ...props
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    // Ripple effect
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const newRipple = { id: Date.now(), x, y };
      setRipples(prev => [...prev, newRipple]);
      
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    // Click animation
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);

    if (onClick) {
      onClick(e);
    }
  };

  const baseClasses = 'relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden transform-gpu disabled:cursor-not-allowed';
  
  const variants = {
    primary: clsx(
      'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white focus:ring-emerald-500',
      'shadow-soft hover:shadow-strong hover:-translate-y-1 active:translate-y-0',
      glow && 'hover:shadow-glow'
    ),
    secondary: clsx(
      'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white focus:ring-blue-500',
      'shadow-soft hover:shadow-strong hover:-translate-y-1 active:translate-y-0'
    ),
    outline: clsx(
      'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white focus:ring-emerald-500',
      'hover:shadow-soft hover:-translate-y-0.5 active:translate-y-0 transition-all'
    ),
    ghost: clsx(
      'text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
      'hover:shadow-soft hover:-translate-y-0.5 active:translate-y-0'
    ),
    danger: clsx(
      'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white focus:ring-red-500',
      'shadow-soft hover:shadow-strong hover:-translate-y-1 active:translate-y-0'
    ),
    success: clsx(
      'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white focus:ring-green-500',
      'shadow-soft hover:shadow-strong hover:-translate-y-1 active:translate-y-0'
    )
  };
  
  const sizes = {
    sm: 'px-4 py-2.5 text-sm h-9 text-sm',
    md: 'px-6 py-3 text-base h-11',
    lg: 'px-8 py-4 text-lg h-12',
    xl: 'px-10 py-5 text-xl h-14'
  };

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-7 h-7'
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
          <span className={clsx(
            children ? 'mr-2' : '', 
            iconSize[size],
            'transition-transform duration-200',
            isClicked && 'scale-90'
          )}>
            {icon}
          </span>
        )}
        <span className={clsx(
          'transition-transform duration-200',
          isClicked && 'scale-95'
        )}>
          {children}
        </span>
        {icon && iconPosition === 'right' && (
          <span className={clsx(
            children ? 'ml-2' : '', 
            iconSize[size],
            'transition-transform duration-200',
            isClicked && 'scale-90'
          )}>
            {icon}
          </span>
        )}
      </>
    );
  };

  return (
    <button
      className={clsx(
        `${baseClasses} flex items-center justify-center`,
        variants[variant],
        sizes[size],
        (disabled || loading) && 'opacity-60 cursor-not-allowed hover:translate-y-0 hover:shadow-soft',
        shake && 'animate-wiggle',
        pulse && 'animate-pulse-fast',
        isClicked && 'scale-95',
        className
      )}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 100,
            height: 100,
          }}
        />
      ))}
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center">
        {renderContent()}
      </div>
    </button>
  );
};