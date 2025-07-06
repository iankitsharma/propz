import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Users, Shield, Star, ArrowRight, Check, TrendingUp, Award, Clock, Phone, Sparkles } from 'lucide-react';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { EnhancedCard } from '../components/ui/EnhancedCard';
import { GlassCard } from '../components/ui/GlassCard';
import { MorphCard } from '../components/ui/MorphCard';
import { InteractiveGrid } from '../components/ui/InteractiveGrid';
import { ParallaxContainer } from '../components/ui/ParallaxContainer';
import { RevealAnimation } from '../components/ui/RevealAnimation';
import { Badge } from '../components/ui/Badge';
import { HeroSection } from '../components/enhanced/HeroSection';
import { FloatingShape } from '../components/ui/FloatingElements';
import { useAuthStore } from '../store/authStore';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: <Search className="w-6 h-6 lg:w-8 lg:h-8" />,
      title: 'Smart Matching',
      description: 'AI-powered algorithm matches your requirements with perfect properties in real-time',
      color: 'text-emerald-600'
    },
    {
      icon: <MapPin className="w-6 h-6 lg:w-8 lg:h-8" />,
      title: 'Location-Based',
      description: 'Find properties in your preferred location with interactive maps and precise coordinates',
      color: 'text-blue-600'
    },
    {
      icon: <Users className="w-6 h-6 lg:w-8 lg:h-8" />,
      title: 'Verified Users',
      description: 'All users undergo thorough verification for safe and secure land transactions',
      color: 'text-purple-600'
    },
    {
      icon: <Shield className="w-6 h-6 lg:w-8 lg:h-8" />,
      title: 'Secure Platform',
      description: 'Bank-level security with end-to-end encryption protects your data and transactions',
      color: 'text-orange-600'
    }
  ];

  const stats = [
    { icon: <TrendingUp className="w-6 h-6 lg:w-8 lg:h-8" />, value: '25K+', label: 'Properties Listed' },
    { icon: <Users className="w-6 h-6 lg:w-8 lg:h-8" />, value: '15K+', label: 'Active Users' },
    { icon: <Award className="w-6 h-6 lg:w-8 lg:h-8" />, value: '5K+', label: 'Successful Deals' },
    { icon: <MapPin className="w-6 h-6 lg:w-8 lg:h-8" />, value: '28+', label: 'States Covered' }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Land Seeker',
      location: 'Mumbai, Maharashtra',
      content: 'Found the perfect agricultural land for my farming project within 2 weeks. The platform made the entire process seamless and transparent!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Priya Sharma',
      role: 'Property Owner',
      location: 'Pune, Maharashtra',
      content: 'Sold my residential plot quickly through LandConnect. The buyers were genuine and the entire transaction was hassle-free.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Amit Patel',
      role: 'Real Estate Broker',
      location: 'Nashik, Maharashtra',
      content: 'As a broker, this platform has revolutionized how I connect with serious buyers and sellers. My business has grown 3x!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: 0,
      description: 'Perfect for getting started',
      features: [
        '2 requirements/month',
        'Contact 5 sellers',
        'Basic search',
        '3 property listings',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Seeker Premium',
      price: 1499,
      description: 'For serious land seekers',
      features: [
        '10 active requirements',
        'Unlimited contacts',
        'Advanced search',
        'Priority listing',
        'Email & SMS alerts',
        'Priority support',
        'Property analytics'
      ],
      popular: true
    },
    {
      name: 'Seller Premium',
      price: 2999,
      description: 'For property owners',
      features: [
        '25 property listings',
        'Featured listings',
        'Analytics dashboard',
        'Professional badge',
        'Priority support',
        'Marketing tools',
        'Lead management'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <FloatingShape className="top-10 left-10" size="sm" color="emerald" opacity={0.05} />
        <FloatingShape className="bottom-10 right-10" size="md" color="blue" opacity={0.05} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ParallaxContainer speed={0.3}>
            <InteractiveGrid
              items={stats.map((stat, index) => ({
                id: `stat-${index}`,
                content: (
                  <GlassCard intensity="medium" tint="emerald" hover className="text-center h-full">
                    <div className="text-emerald-600 mb-3 lg:mb-4 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-1 lg:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 font-medium text-sm lg:text-base">{stat.label}</div>
                  </GlassCard>
                )
              }))}
              columns={4}
              hoverEffect="glow"
              staggerAnimation
            />
          </ParallaxContainer>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 lg:py-20 bg-gray-50 relative overflow-hidden">
        {/* Background Elements */}
        <FloatingShape className="top-20 right-20" size="lg" color="purple" opacity={0.03} />
        <FloatingShape className="bottom-20 left-20" size="md" color="orange" opacity={0.03} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation animation="fade" delay={100}>
            <div className="text-center mb-12 lg:mb-16">
              <Badge className="mb-4" variant="primary">Features</Badge>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
                Why Choose LandConnect?
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Experience the future of land transactions with our cutting-edge platform designed for modern buyers and sellers.
              </p>
            </div>
          </RevealAnimation>
          
          <InteractiveGrid
            items={features.map((feature, index) => ({
              id: `feature-${index}`,
              content: (
                <MorphCard className="text-center h-full">
                  <div className={`${feature.color} mb-4 lg:mb-6 flex justify-center`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3 lg:mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    {feature.description}
                  </p>
                </MorphCard>
              )
            }))}
            columns={4}
            hoverEffect="morph"
            staggerAnimation
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 lg:py-20 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <FloatingShape className="top-1/4 left-10" size="sm" color="pink" opacity={0.04} />
        <FloatingShape className="bottom-1/4 right-10" size="md" color="emerald" opacity={0.04} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation animation="fade" delay={100}>
            <div className="text-center mb-12 lg:mb-16">
              <Badge className="mb-4" variant="secondary">Process</Badge>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
                How It Works
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                Simple steps to find your perfect land match
              </p>
            </div>
          </RevealAnimation>

          <ParallaxContainer speed={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {/* Connection Lines - Hidden on mobile */}
            <div className="hidden lg:block absolute top-8 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-emerald-300 to-blue-300 animate-shimmer"></div>
            <div className="hidden lg:block absolute top-8 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-blue-300 to-orange-300 animate-shimmer" style={{animationDelay: '0.5s'}}></div>
            
            {[
              { 
                number: 1, 
                title: 'Post Your Requirement',
                description: 'Describe your land requirements including location, size, budget, and specific needs. Our smart form guides you through the process.',
                gradient: 'from-emerald-500 to-emerald-600',
                hoverColor: 'group-hover:text-emerald-600'
              },
              { 
                number: 2, 
                title: 'Get Matched',
                description: 'Our AI-powered algorithm matches you with suitable properties and verified sellers contact you within 24 hours.',
                gradient: 'from-blue-500 to-blue-600',
                hoverColor: 'group-hover:text-blue-600'
              },
              { 
                number: 3, 
                title: 'Close the Deal',
                description: 'Communicate directly with sellers, schedule site visits, and complete your land transaction with our secure platform.',
                gradient: 'from-orange-500 to-orange-600',
                hoverColor: 'group-hover:text-orange-600'
              }
            ].map((step, index) => (
              <RevealAnimation 
                key={step.number}
                animation="slide-up"
                delay={index * 200}
              >
                <GlassCard intensity="strong" tint="emerald" hover className="text-center h-full">
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-soft`}>
                    <span className="text-white text-xl lg:text-2xl font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3 lg:mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                    {step.description}
                  </p>
                </GlassCard>
              </RevealAnimation>
            ))}
            </div>
          </ParallaxContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation animation="fade" delay={100}>
            <div className="text-center mb-12 lg:mb-16">
              <Badge className="mb-4" variant="success">Testimonials</Badge>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
                What Our Users Say
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                Real success stories from our growing community of land buyers and sellers
              </p>
            </div>
          </RevealAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <RevealAnimation 
                key={index} 
                animation="scale"
                delay={index * 200}
              >
                <GlassCard intensity="medium" hover className="relative overflow-hidden group h-full">
                  <div className="flex items-center mb-4 lg:mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-400 fill-current hover:animate-bounce" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 lg:mb-6 text-base lg:text-lg leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-10 h-10 lg:w-12 lg:h-12 rounded-full mr-3 lg:mr-4 object-cover"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 text-base lg:text-lg">{testimonial.name}</div>
                      <div className="text-xs lg:text-sm text-gray-500">{testimonial.role}</div>
                      <div className="text-xs lg:text-sm text-emerald-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-60 group-hover:animate-pulse transition-all duration-500">
                    <Star className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600 group-hover:animate-spin" />
                  </div>
                </GlassCard>
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>
      
      {/* Interactive Demo Section */}
      <section className="py-12 lg:py-20 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation animation="fade" delay={100}>
            <div className="text-center mb-12 lg:mb-16">
              <Badge className="mb-4 bg-white/15 text-white border-white/30" variant="gradient">
                <Sparkles className="w-4 h-4 mr-2" />
                Experience the Platform
              </Badge>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
                See LandConnect in Action
              </h2>
              <p className="text-lg lg:text-xl text-emerald-100 max-w-2xl mx-auto">
                Take a virtual tour of our platform and discover how easy land transactions can be.
              </p>
            </div>
          </RevealAnimation>

          <ParallaxContainer speed={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <RevealAnimation animation="slide-right" delay={200}>
                <GlassCard intensity="strong" className="p-8 lg:p-10">
                  <h3 className="text-2xl font-bold text-white mb-6">Interactive Demo</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-emerald-100">Smart property matching algorithm</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-emerald-100">Real-time communication tools</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mr-4">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-emerald-100">Secure transaction management</span>
                    </div>
                  </div>
                  <AnimatedButton
                    variant="secondary"
                    size="lg"
                    glow
                    className="w-full bg-white text-emerald-600 hover:bg-gray-50"
                  >
                    Start Interactive Demo
                  </AnimatedButton>
                </GlassCard>
              </RevealAnimation>

              <RevealAnimation animation="slide-left" delay={400}>
                <div className="relative">
                  <GlassCard intensity="medium" className="p-2">
                    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-gray-400 text-sm">landconnect.com</span>
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 bg-emerald-600 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-600 rounded w-2/3"></div>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="h-12 bg-gray-700 rounded"></div>
                          <div className="h-12 bg-gray-700 rounded"></div>
                          <div className="h-12 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                  
                  {/* Floating interaction points */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-emerald-500 rounded-full animate-pulse flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute top-1/2 -left-4 w-6 h-6 bg-blue-500 rounded-full animate-bounce flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
              </RevealAnimation>
            </div>
          </ParallaxContainer>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-600 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealAnimation animation="scale" delay={100}>
            <h2 className="text-3xl lg:text-4xl xl:text-6xl font-bold mb-4 lg:mb-6">
              Ready to Find Your Perfect Land?
            </h2>
            <p className="text-lg lg:text-xl xl:text-2xl mb-8 lg:mb-10 text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Join thousands of users finding their dream land across India through our trusted platform
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <AnimatedButton
                variant="secondary"
                size="xl"
                glow
                className="bg-white text-emerald-600 hover:bg-gray-50 shadow-strong hover:shadow-strong hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                icon={<Phone className="w-4 h-4 lg:w-5 lg:h-5" />}
                onClick={() => navigate(isAuthenticated ? '/post-requirement' : '/register')}
              >
                Post Requirement
              </AnimatedButton>
              <AnimatedButton
                variant="secondary"
                size="xl"
                className="w-full sm:w-auto"
                icon={<MapPin className="w-4 h-4 lg:w-5 lg:h-5" />} 
                onClick={() => navigate('/properties')}
              >
                Browse Properties
              </AnimatedButton>
            </div>
          </RevealAnimation>
        </div>
      </section>

      {/* Extra Call-to-Action Section */}
      <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
        <FloatingShape className="top-20 left-20" size="sm" color="emerald" opacity={0.03} />
        <FloatingShape className="bottom-20 right-20" size="md" color="blue" opacity={0.03} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation animation="fade" delay={100}>
            <div className="text-center mb-10">
              <Badge className="mb-4" variant="primary">Ready?</Badge>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
                Begin Your Land Journey Today
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                Create an account to start posting requirements or browse available properties across India.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <AnimatedButton
                  variant="primary"
                  size="lg"
                  glow
                  onClick={() => navigate('/register')}
                >
                  Create Account
                </AnimatedButton>
                <AnimatedButton
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/pricing')}
                >
                  View Pricing
                </AnimatedButton>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </section>
    </div>
  );
};