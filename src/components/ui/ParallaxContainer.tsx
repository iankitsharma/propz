import React, { useRef, useEffect, useState } from 'react';
import { clsx } from 'clsx';

interface ParallaxContainerProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  offset?: number;
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  speed = 0.5,
  direction = 'up',
  className,
  offset = 0
}) => {
  const [transform, setTransform] = useState('translate3d(0, 0, 0)');
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;

      const scrolled = window.pageYOffset;
      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrolled;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Check if element is in viewport
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const yPos = -(scrolled - elementTop + offset) * speed;
        
        let transformValue = '';
        switch (direction) {
          case 'up':
            transformValue = `translate3d(0, ${yPos}px, 0)`;
            break;
          case 'down':
            transformValue = `translate3d(0, ${-yPos}px, 0)`;
            break;
          case 'left':
            transformValue = `translate3d(${yPos}px, 0, 0)`;
            break;
          case 'right':
            transformValue = `translate3d(${-yPos}px, 0, 0)`;
            break;
        }
        
        setTransform(transformValue);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction, offset]);

  return (
    <div
      ref={elementRef}
      className={clsx('will-change-transform', className)}
      style={{ transform }}
    >
      {children}
    </div>
  );
};