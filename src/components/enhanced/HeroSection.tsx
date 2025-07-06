import React from 'react';
import { ArrowRight, Search, Star, Check, Shield, Clock, Phone, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AnimatedButton } from '../ui/AnimatedButton';
import { Badge } from '../ui/Badge';
import { FloatingShape, GradientOrb, ParticleField } from '../ui/FloatingElements';
import { useAuthStore } from '../../store/authStore';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-600 text-white overflow-hidden min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <GradientOrb 
          className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" 
          colors={['from-white', 'to-white']}
        />
        <GradientOrb 
          className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" 
          colors={['from-white', 'to-white']}
        />
        <GradientOrb 
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
          size="w-64 h-64"
          colors={['from-white', 'to-white']}
        />
        
        {/* Floating Shapes */}
        <FloatingShape 
          className="top-20 left-20" 
          size="sm" 
          color="blue" 
          animation="float" 
        />
        <FloatingShape 
          className="bottom-20 right-20" 
          size="md" 
          color="purple" 
          animation="pulse" 
        />
        <FloatingShape 
          className="top-1/3 right-1/3" 
          size="sm" 
          color="pink" 
          animation="rotate" 
        />
        
        {/* Particle Field */}
        <ParticleField count={30} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 xl:py-28 z-10">
        <div className="text-center">
          {/* Badge with Animation */}
          <div className="animate-fade-in-down">
            <Badge 
              className="mb-6 lg:mb-8 bg-white/15 text-white border-white/30 backdrop-blur-sm shadow-soft hover:bg-white/20 transition-all duration-300 transform hover:scale-105" 
              size="md"
            >
              <Star className="w-4 h-4 mr-2 text-yellow-400 animate-pulse" />
              India's #1 Land Marketplace
            </Badge>
          </div>
          
          {/* Main Heading with Staggered Animation */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 lg:mb-8 leading-tight">
            <span className="block animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Find Your Perfect
            </span>
            <span className="block bg-gradient-to-r from-emerald-200 to-blue-200 bg-clip-text text-transparent animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Land Match
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 lg:mb-10 text-emerald-100 max-w-4xl mx-auto leading-relaxed animate-fade-in-up px-4" style={{ animationDelay: '0.3s' }}>
            India's most trusted land marketplace connecting buyers with sellers. 
            Post your requirements and let property owners come to you.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 animate-fade-in-up px-4" style={{ animationDelay: '0.4s' }}>
            <AnimatedButton
              variant="secondary"
              size="lg"
              glow
              className="bg-white text-emerald-600 hover:bg-gray-50 w-full sm:w-auto flex items-center justify-center"
              onClick={() => navigate(isAuthenticated ? '/post-requirement' : '/register')}
              icon={<ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />}
              iconPosition="right"
            >
              <span>Post Your Requirement</span>
            </AnimatedButton>
            
            <AnimatedButton
              variant="outline"
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto flex items-center justify-center"
              onClick={() => navigate('/properties')}
              icon={<Search className="w-4 h-4 lg:w-5 lg:h-5" />}
            >
              <span>Browse Properties</span>
            </AnimatedButton>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-8 lg:mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-emerald-200 animate-fade-in-up px-4" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center text-sm lg:text-base group hover:text-white transition-colors">
              <Check className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-emerald-300 group-hover:animate-bounce" />
              <span>25,000+ Listed Properties</span>
            </div>
            <div className="flex items-center text-sm lg:text-base group hover:text-white transition-colors">
              <Shield className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-emerald-300 group-hover:animate-pulse" />
              <span>Trusted Marketplace</span>
            </div>
            <div className="flex items-center text-sm lg:text-base group hover:text-white transition-colors">
              <Clock className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-emerald-300 group-hover:animate-spin" />
              <span>24/7 Platform Access</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};