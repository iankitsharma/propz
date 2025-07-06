import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { TestimonialCard } from '../ui/TestimonialCard';
import { AnimatedButton } from '../ui/AnimatedButton';
import { RevealAnimation } from '../ui/RevealAnimation';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  content: string;
  rating: number;
  featured?: boolean;
}

interface EnhancedTestimonialsProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

export const EnhancedTestimonials: React.FC<EnhancedTestimonialsProps> = ({
  testimonials,
  autoPlay = true,
  interval = 5000,
  className
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isPlaying || testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, testimonials.length, interval]);

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  if (testimonials.length === 0) return null;

  return (
    <div className={className}>
      {/* Header */}
      <RevealAnimation animation="fade" delay={100}>
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-6">
            <Quote className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
            What Our Users Say
          </h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
            Real success stories from our growing community of land buyers and sellers
          </p>
        </div>
      </RevealAnimation>

      {/* Main testimonial display */}
      <div className="relative max-w-4xl mx-auto mb-12">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
              <RevealAnimation 
                animation="scale" 
                delay={index * 100}
              >
                <TestimonialCard
                  {...testimonial}
                  featured={index === currentIndex}
                  className="max-w-3xl mx-auto"
                />
              </RevealAnimation>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {testimonials.length > 1 && (
          <>
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-medium hover:shadow-strong transition-all duration-200 hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-medium hover:shadow-strong transition-all duration-200 hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </>
        )}
      </div>

      {/* Dots indicator */}
      {testimonials.length > 1 && (
        <div className="flex justify-center space-x-2 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-emerald-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* Autoplay controls */}
      {testimonials.length > 1 && (
        <div className="text-center">
          <AnimatedButton
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-gray-600"
          >
            {isPlaying ? 'Pause' : 'Play'} Auto-rotation
          </AnimatedButton>
        </div>
      )}
    </div>
  );
};