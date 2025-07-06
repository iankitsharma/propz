import React, { useState } from 'react';
import { clsx } from 'clsx';

interface MorphCardProps {
  children: React.ReactNode;
  expandedContent?: React.ReactNode;
  className?: string;
  expandable?: boolean;
  defaultExpanded?: boolean;
  morphDuration?: number;
}

export const MorphCard: React.FC<MorphCardProps> = ({
  children,
  expandedContent,
  className,
  expandable = false,
  defaultExpanded = false,
  morphDuration = 500
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [isHovered, setIsHovered] = useState(false);

  const handleToggle = () => {
    if (expandable) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-2xl bg-white border border-gray-200',
        'transition-all duration-500 ease-out transform-gpu',
        'hover:shadow-strong hover:-translate-y-2',
        isExpanded && 'shadow-glow scale-[1.02]',
        expandable && 'cursor-pointer',
        className
      )}
      style={{ transitionDuration: `${morphDuration}ms` }}
      onClick={handleToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background morphing gradient */}
      <div 
        className={clsx(
          'absolute inset-0 opacity-0 transition-opacity duration-500',
          'bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50',
          (isHovered || isExpanded) && 'opacity-100'
        )}
      />
      
      {/* Content container */}
      <div className="relative z-10 p-6 lg:p-8">
        {/* Main content */}
        <div className={clsx(
          'transition-all duration-500',
          isExpanded && expandedContent && 'opacity-50 scale-95'
        )}>
          {children}
        </div>
        
        {/* Expanded content */}
        {expandable && expandedContent && (
          <div className={clsx(
            'transition-all duration-500 transform',
            isExpanded 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
          )}>
            <div className="mt-6 pt-6 border-t border-gray-200">
              {expandedContent}
            </div>
          </div>
        )}
      </div>
      
      {/* Morphing border effect */}
      <div className={clsx(
        'absolute inset-0 rounded-2xl',
        'bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500',
        'opacity-0 transition-opacity duration-500',
        'blur-sm',
        (isHovered || isExpanded) && 'opacity-20'
      )} />
    </div>
  );
};