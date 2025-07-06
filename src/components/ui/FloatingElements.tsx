import React from 'react';
import { clsx } from 'clsx';

interface FloatingShapeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'emerald' | 'blue' | 'purple' | 'orange' | 'pink';
  animation?: 'float' | 'pulse' | 'rotate' | 'bounce';
  blur?: boolean;
  opacity?: number;
}

export const FloatingShape: React.FC<FloatingShapeProps> = ({
  className,
  size = 'md',
  color = 'emerald',
  animation = 'float',
  blur = true,
  opacity = 0.1
}) => {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64'
  };

  const colors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    pink: 'bg-pink-500'
  };

  const animations = {
    float: 'animate-float',
    pulse: 'animate-pulse-slow',
    rotate: 'animate-rotate-slow',
    bounce: 'animate-bounce-gentle'
  };

  return (
    <div
      className={clsx(
        'absolute rounded-full',
        sizes[size],
        colors[color],
        animations[animation],
        blur && 'blur-3xl',
        className
      )}
      style={{ opacity }}
    />
  );
};

export const ParticleField: React.FC<{ count?: number; className?: string }> = ({
  count = 20,
  className
}) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    duration: Math.random() * 3 + 2
  }));

  return (
    <div className={clsx('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-white rounded-full opacity-20 animate-float"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`
          }}
        />
      ))}
    </div>
  );
};

export const GradientOrb: React.FC<{
  className?: string;
  size?: string;
  colors?: string[];
  animate?: boolean;
}> = ({
  className,
  size = 'w-96 h-96',
  colors = ['from-emerald-400', 'via-blue-500', 'to-purple-600'],
  animate = true
}) => {
  return (
    <div
      className={clsx(
        'absolute rounded-full blur-3xl opacity-20',
        animate && 'animate-pulse-slow',
        size,
        `bg-gradient-to-br ${colors.join(' ')}`,
        className
      )}
    />
  );
};