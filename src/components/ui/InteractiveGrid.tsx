import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';

interface GridItem {
  id: string;
  content: React.ReactNode;
  className?: string;
}

interface InteractiveGridProps {
  items: GridItem[];
  columns?: number;
  gap?: number;
  className?: string;
  hoverEffect?: 'scale' | 'glow' | 'tilt' | 'morph';
  staggerAnimation?: boolean;
}

export const InteractiveGrid: React.FC<InteractiveGridProps> = ({
  items,
  columns = 3,
  gap = 6,
  className,
  hoverEffect = 'scale',
  staggerAnimation = true
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gridRef.current) {
        const rect = gridRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener('mousemove', handleMouseMove);
      return () => grid.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const getHoverEffectClasses = (itemId: string) => {
    const isHovered = hoveredItem === itemId;
    const isNeighbor = hoveredItem && hoveredItem !== itemId;

    switch (hoverEffect) {
      case 'scale':
        return clsx(
          'transition-all duration-300',
          isHovered && 'scale-105 shadow-strong z-10',
          isNeighbor && 'scale-95 opacity-70'
        );
      case 'glow':
        return clsx(
          'transition-all duration-300',
          isHovered && 'shadow-glow scale-[1.02] z-10',
          isNeighbor && 'opacity-80'
        );
      case 'tilt':
        return clsx(
          'transition-all duration-300',
          isHovered && 'rotate-1 scale-105 shadow-strong z-10',
          isNeighbor && 'scale-98 opacity-70'
        );
      case 'morph':
        return clsx(
          'transition-all duration-500',
          isHovered && 'scale-110 shadow-glow z-10 bg-gradient-to-br from-emerald-50 to-blue-50',
          isNeighbor && 'scale-95 opacity-60 blur-[1px]'
        );
      default:
        return '';
    }
  };

  return (
    <div
      ref={gridRef}
      className={clsx(
        'relative grid gap-6',
        `grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`,
        `gap-${gap}`,
        className
      )}
    >
      {/* Cursor follower */}
      {hoveredItem && (
        <div
          className="absolute w-20 h-20 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-xl pointer-events-none transition-all duration-300 z-0"
          style={{
            left: mousePosition.x - 40,
            top: mousePosition.y - 40,
          }}
        />
      )}

      {items.map((item, index) => (
        <div
          key={item.id}
          className={clsx(
            'relative bg-white rounded-2xl border border-gray-200 p-6 cursor-pointer',
            getHoverEffectClasses(item.id),
            staggerAnimation && 'animate-fade-in-up',
            item.className
          )}
          style={staggerAnimation ? { animationDelay: `${index * 0.1}s` } : undefined}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
        >
          {item.content}
          
          {/* Hover overlay */}
          <div className={clsx(
            'absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300',
            'bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5',
            hoveredItem === item.id && 'opacity-100'
          )} />
        </div>
      ))}
    </div>
  );
};