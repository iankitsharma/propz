import React from 'react';
import { clsx } from 'clsx';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  company?: string;
  avatar: string;
  content: string;
  rating: number;
  featured?: boolean;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  company,
  avatar,
  content,
  rating,
  featured = false,
  className
}) => {
  return (
    <div className={clsx(
      'relative p-6 lg:p-8 rounded-2xl border transition-all duration-300 group overflow-hidden',
      featured 
        ? 'bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200 shadow-glow' 
        : 'bg-white border-gray-200 shadow-soft hover:shadow-strong',
      'hover:-translate-y-2 hover:scale-[1.02]',
      className
    )}>
      {/* Quote icon */}
      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <Quote className="w-12 h-12 lg:w-16 lg:h-16 text-emerald-600" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Rating */}
        <div className="flex items-center mb-4 lg:mb-6">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={clsx(
                'w-4 h-4 lg:w-5 lg:h-5 transition-all duration-200',
                i < rating 
                  ? 'text-yellow-400 fill-yellow-400 hover:scale-110' 
                  : 'text-gray-300'
              )}
            />
          ))}
        </div>

        {/* Testimonial text */}
        <blockquote className="text-gray-700 text-base lg:text-lg leading-relaxed mb-6 lg:mb-8 italic">
          "{content}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center">
          <img 
            src={avatar}
            alt={name}
            className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover ring-2 ring-white shadow-soft mr-4"
          />
          <div>
            <div className="font-semibold text-gray-900 text-base lg:text-lg group-hover:text-emerald-600 transition-colors">
              {name}
            </div>
            <div className="text-sm lg:text-base text-gray-600">
              {role}{company && ` at ${company}`}
            </div>
          </div>
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-blue-50/30" />
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};