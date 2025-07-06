import React, { useRef, useEffect, useState } from 'react';
import { clsx } from 'clsx';

interface RevealAnimationProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'flip';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
}

export const RevealAnimation: React.FC<RevealAnimationProps> = ({
  children,
  animation = 'fade',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className,
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, once]);

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all ease-out transform-gpu';
    
    if (!isVisible) {
      switch (animation) {
        case 'fade':
          return `${baseClasses} opacity-0`;
        case 'slide-up':
          return `${baseClasses} opacity-0 translate-y-8`;
        case 'slide-down':
          return `${baseClasses} opacity-0 -translate-y-8`;
        case 'slide-left':
          return `${baseClasses} opacity-0 translate-x-8`;
        case 'slide-right':
          return `${baseClasses} opacity-0 -translate-x-8`;
        case 'scale':
          return `${baseClasses} opacity-0 scale-95`;
        case 'flip':
          return `${baseClasses} opacity-0 rotateY-90`;
        default:
          return `${baseClasses} opacity-0`;
      }
    }

    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0`;
  };

  return (
    <div
      ref={elementRef}
      className={clsx(getAnimationClasses(), className)}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
};