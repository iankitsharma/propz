import React from 'react';
import { Search, Users, MessageCircle, CheckCircle, ArrowRight, Star, Shield, Zap, Clock, MapPin, Phone } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      title: 'Post Your Requirement',
      description: 'Tell us what kind of land you\'re looking for - location, size, budget, and specific needs.',
      icon: <Search className="w-8 h-8" />,
      color: 'from-emerald-500 to-emerald-600',
      features: [
        'Detailed requirement form',
        'Location preferences',
        'Budget range selection',
        'Specific criteria matching'
      ]
    },
    {
      number: 2,
      title: 'Get Connected',
      description: 'Our platform matches your requirements and property owners contact you directly.',
      icon: <Users className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
      features: [
        'Smart matching system',
        'Direct property owner contact',
        'Real-time notifications',
        'Quality connections'
      ]
    },
    {
      number: 3,
      title: 'Connect & Negotiate',
      description: 'Communicate directly with property owners, schedule visits, and negotiate the best deal.',
      icon: <MessageCircle className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
      features: [
        'Direct communication',
        'Platform messaging',
        'Video call scheduling',
        'Information sharing'
      ]
    },
    {
      number: 4,
      title: 'Complete Your Deal',
      description: 'Finalize your land purchase or rental agreement directly with the property owner.',
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
      features: [
        'Direct negotiations',
        'Independent agreements',
        'Your own legal support',
        'Complete ownership'
      ]
    }
  ];

  const benefits = [
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Quality Listings',
      description: 'Browse through thousands of land listings from property owners across India.',
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Direct Connections',
      description: 'Connect directly with property owners without intermediaries or hidden fees.',
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Fast Matching',
      description: 'Get matched with suitable properties within 24 hours of posting your requirement.',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '24/7 Platform',
      description: 'Access our marketplace anytime to browse properties and manage your requirements.',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Farmer',
      location: 'Nashik, Maharashtra',
      content: 'Found perfect agricultural land in just 2 weeks! The direct connection with owners was amazing.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      deal: '10 Acres Agricultural Land'
    },
    {
      name: 'Priya Sharma',
      role: 'Entrepreneur',
      location: 'Pune, Maharashtra',
      content: 'The platform made it so easy to find genuine sellers. No brokers, direct communication!',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      deal: 'Commercial Plot Purchase'
    },
    {
      name: 'Amit Patel',
      role: 'Builder',
      location: 'Surat, Gujarat',
      content: 'Professional marketplace with complete transparency. Saved months of searching time.',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
      deal: 'Residential Development'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="mb-6 bg-white/15 text-white border-white/30 backdrop-blur-sm" size="md">
              <MapPin className="w-4 h-4 mr-2" />
              How it Works
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Land Discovery Made
              <span className="block bg-gradient-to-r from-emerald-200 to-blue-200 bg-clip-text text-transparent">
                Simple & Direct
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              From posting your requirement to connecting with property owners - discover how our marketplace 
              makes land discovery transparent, fast, and direct.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-50 shadow-strong hover:shadow-strong hover:scale-105 transition-all duration-300"
                onClick={() => navigate('/register')}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Start Your Journey
              </Button>
              <Button
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                onClick={() => navigate('/properties')}
              >
                Browse Properties
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              4 Simple Steps to Your Dream Land
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our streamlined marketplace makes land discovery effortless and direct.
            </p>
          </div>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={step.number} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-6">
                    <Badge variant="gradient" size="lg" rounded glow className="mb-4">
                      Step {step.number}
                    </Badge>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {step.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center lg:justify-start">
                        <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button variant="outline" size="lg" className="group">
                    Learn More
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                </div>

                {/* Visual */}
                <div className="flex-1 max-w-lg">
                  <Card shadow="strong" className="bg-gradient-to-br from-white to-gray-50 relative overflow-hidden group">
                    <div className="text-center p-8">
                      <div className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-soft group-hover:shadow-medium group-hover:scale-110 transition-all duration-300`}>
                        <div className="text-white">
                          {step.icon}
                        </div>
                      </div>
                      
                      <div className="text-6xl font-bold text-gray-200 mb-4">
                        {step.number.toString().padStart(2, '0')}
                      </div>
                      
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="primary">Why Choose Us</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Benefits of Using LandConnect
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the advantages of our modern marketplace approach to land discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} hover shadow="md" className="text-center group">
                <div className={`w-16 h-16 ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="success">Success Stories</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Real People, Real Results
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how our marketplace has helped thousands find their perfect land match.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} hover shadow="md" className="group relative overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {testimonial.location}
                    </div>
                    <Badge variant="success" size="sm">
                      {testimonial.deal}
                    </Badge>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Star className="w-8 h-8 text-yellow-400 fill-current" />
                </div>
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Find Your Perfect Land?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-emerald-100 max-w-3xl mx-auto">
            Join thousands of satisfied users who found their dream properties through our marketplace.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-50 shadow-strong hover:shadow-strong hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/register')}
              icon={<Phone className="w-5 h-5" />}
            >
              Get Started Today
            </Button>
            <Button
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              onClick={() => navigate('/contact')}
            >
              Talk to Expert
            </Button>
          </div>
          
          <div className="mt-10 text-emerald-200 text-sm">
            No hidden fees • Direct connections • Free to start
          </div>
        </div>
      </section>
    </div>
  );
};