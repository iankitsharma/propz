import React, { useState } from 'react';
import { Users, Target, Award, Globe, Heart, Shield, Zap, TrendingUp, MapPin, CheckCircle } from 'lucide-react';
import { FeatureCard } from '../components/ui/FeatureCard';
import { TestimonialCard } from '../components/ui/TestimonialCard';
import { EnhancedTestimonials } from '../components/enhanced/EnhancedTestimonials';
import { StatsSection } from '../components/enhanced/StatsSection';
import { RevealAnimation } from '../components/ui/RevealAnimation';
import { ParallaxContainer } from '../components/ui/ParallaxContainer';
import { FloatingShape, GradientOrb } from '../components/ui/FloatingElements';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const About: React.FC = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'We provide a transparent platform where buyers and sellers can connect directly. All communication and negotiations happen between users.',
      color: 'emerald' as const
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. We strive to provide the best marketplace experience for land transactions.',
      color: 'pink' as const
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously innovate to make land discovery and connections simpler and more efficient through technology.',
      color: 'blue' as const
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We are committed to excellence in our platform design, user experience, and customer support.',
      color: 'purple' as const
    }
  ];

  const team = [
    {
      name: 'Rajesh Sharma',
      role: 'CEO & Founder',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      bio: '15+ years in real estate technology. Former VP at PropTech Solutions.',
      linkedin: '#'
    },
    {
      name: 'Priya Patel',
      role: 'CTO',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      bio: 'Tech visionary with 12+ years in building scalable platforms. Former Lead at TechCorp.',
      linkedin: '#'
    },
    {
      name: 'Amit Kumar',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      bio: 'Operations expert with deep understanding of Indian real estate market dynamics.',
      linkedin: '#'
    },
    {
      name: 'Sneha Reddy',
      role: 'VP Marketing',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      bio: 'Brand strategist with 10+ years building market-leading products in PropTech.',
      linkedin: '#'
    }
  ];

  const testimonials = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      role: 'Land Seeker',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      content: 'Found the perfect agricultural land for my farming project within 2 weeks. The platform made connecting with sellers so easy!',
      rating: 5,
      featured: true
    },
    {
      id: '2',
      name: 'Priya Sharma',
      role: 'Property Owner',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      content: 'Connected with serious buyers quickly through LandConnect. The platform helped me reach the right audience.',
      rating: 5
    },
    {
      id: '3',
      name: 'Amit Patel',
      role: 'Real Estate Broker',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      content: 'As a broker, this platform has revolutionized how I connect with serious buyers and sellers. Great marketplace!',
      rating: 5
    }
  ];

  const milestones = [
    { year: '2020', title: 'Company Founded', description: 'Started with a vision to create India\'s best land marketplace platform' },
    { year: '2021', title: 'Series A Funding', description: 'Raised ₹50 Crores in Series A to expand operations across major cities' },
    { year: '2022', title: '10K Users', description: 'Reached 10,000 active users connecting through our marketplace' },
    { year: '2023', title: 'National Expansion', description: 'Expanded to 25+ states with enhanced search and matching features' },
    { year: '2024', title: 'Market Leader', description: 'Became India\'s #1 land marketplace with 25K+ users and growing community' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-600 text-white overflow-hidden min-h-[80vh] flex items-center">
        {/* Background Elements */}
        <GradientOrb className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" colors={['from-white', 'to-white']} />
        <GradientOrb className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" colors={['from-white', 'to-white']} />
        <FloatingShape className="top-20 left-20" size="sm" color="blue" />
        <FloatingShape className="bottom-20 right-20" size="md" color="purple" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <RevealAnimation animation="fade" delay={100}>
              <Badge className="mb-6 lg:mb-8 bg-white/15 text-white border-white/30 backdrop-blur-sm" size="md">
                <Heart className="w-4 h-4 mr-2 text-red-300" />
                About LandConnect
              </Badge>
            </RevealAnimation>
            
            <RevealAnimation animation="slide-up" delay={200}>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 lg:mb-8 leading-tight">
                India's Leading
                <span className="block bg-gradient-to-r from-emerald-200 to-blue-200 bg-clip-text text-transparent">
                  Land Marketplace
                </span>
              </h1>
            </RevealAnimation>
            
            <RevealAnimation animation="slide-up" delay={300}>
              <p className="text-lg lg:text-xl xl:text-2xl mb-8 lg:mb-10 text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                We're on a mission to connect land buyers and sellers across India through our 
                innovative marketplace platform, making land discovery simple and efficient.
              </p>
            </RevealAnimation>
            
            <RevealAnimation animation="fade" delay={400}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-8 text-emerald-200">
                <div className="flex items-center text-sm lg:text-base">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-emerald-300" />
                  <span>Founded in 2020</span>
                </div>
                <div className="flex items-center text-sm lg:text-base">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-emerald-300" />
                  <span>25K+ Active Users</span>
                </div>
                <div className="flex items-center text-sm lg:text-base">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-emerald-300" />
                  <span>Marketplace Platform</span>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation animation="fade" delay={100}>
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
                Our Mission & Vision
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                Building India's most trusted land marketplace platform.
              </p>
            </div>
          </RevealAnimation>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <RevealAnimation animation="slide-right" delay={200}>
              <FeatureCard
                icon={Target}
                title="Our Mission"
                description="To create India's most comprehensive land marketplace where buyers and sellers can connect directly, discover opportunities, and make informed decisions through our platform."
                color="emerald"
                variant="gradient"
                className="h-full"
              />
            </RevealAnimation>
            
            <RevealAnimation animation="slide-left" delay={300}>
              <FeatureCard
                icon={Globe}
                title="Our Vision"
                description="To become India's go-to platform for land discovery and connections, empowering millions to find their perfect land match through technology and innovation."
                color="blue"
                variant="gradient"
                className="h-full"
              />
            </RevealAnimation>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white relative overflow-hidden">
        <FloatingShape className="top-10 right-10" size="sm" color="emerald" opacity={0.03} />
        <FloatingShape className="bottom-10 left-10" size="md" color="blue" opacity={0.03} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation animation="fade" delay={100}>
            <div className="text-center mb-12 lg:mb-16">
              <Badge className="mb-4" variant="primary">Our Values</Badge>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
                What Drives Us Forward
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
                Our core values guide every decision we make and define how we serve our marketplace community.
              </p>
            </div>
          </RevealAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <RevealAnimation key={index} animation="slide-up" delay={index * 100 + 200}>
                <FeatureCard
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                  color={value.color}
                  variant="glass"
                  animated={true}
                />
              </RevealAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EnhancedTestimonials
            testimonials={testimonials}
            autoPlay={true}
            interval={6000}
          />
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealAnimation animation="fade" delay={100}>
            <div className="text-center mb-12 lg:mb-16">
              <Badge className="mb-4" variant="secondary">Our Journey</Badge>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
                Milestones & Achievements
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
                From a startup idea to India's leading land marketplace - here's our story.
              </p>
            </div>
          </RevealAnimation>

          <ParallaxContainer speed={0.1}>
            <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full"></div>
            
            <div className="space-y-8 lg:space-y-12">
              {milestones.map((milestone, index) => (
                <RevealAnimation key={index} animation="slide-up" delay={index * 200}>
                  <div className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-4 lg:pr-8 text-right' : 'pl-4 lg:pl-8 text-left'}`}>
                      <FeatureCard
                        icon={Award}
                        title={`${milestone.year} - ${milestone.title}`}
                        description={milestone.description}
                        color="emerald"
                        variant="glass"
                        animated={true}
                      />
                    </div>
                    
                    {/* Timeline Dot */}
                    <div className="relative z-10 w-4 h-4 lg:w-6 lg:h-6 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full border-4 border-white shadow-soft"></div>
                    
                    <div className="w-1/2"></div>
                  </div>
                </RevealAnimation>
              ))}
            </div>
            </div>
          </ParallaxContainer>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="success">Our Team</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet the Visionaries
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A passionate team of experts dedicated to building India's best land marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} hover shadow="md" className="text-center group">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover shadow-soft group-hover:shadow-medium transition-all duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-soft">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-emerald-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <Button variant="outline" size="sm" className="w-full">
                  View Profile
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealAnimation animation="scale" delay={100}>
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
              Ready to Join Our Marketplace?
            </h2>
            <p className="text-lg lg:text-xl xl:text-2xl mb-8 lg:mb-10 text-emerald-100 max-w-3xl mx-auto">
              Be part of India's growing land marketplace community. Start your journey with LandConnect today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <AnimatedButton
                variant="secondary"
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-50 w-full sm:w-auto"
                glow
              >
                Get Started Today
              </AnimatedButton>
              <AnimatedButton
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto"
              >
                Contact Us
              </AnimatedButton>
            </div>
          </RevealAnimation>
        </div>
      </section>
    </div>
  );
};