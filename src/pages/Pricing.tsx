import React, { useState } from 'react';
import { Check, Star, Zap, Shield, Award, ArrowRight, Users, Crown, Sparkles, X } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { RevealAnimation } from '../components/ui/RevealAnimation';
import { useAuthStore } from '../store/authStore';
import { AnimatedButton } from '../components/ui/AnimatedButton';

export const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started',
      monthly: 0,
      yearly: 0,
      icon: <Users className="w-6 h-6" />,
      color: 'from-gray-500 to-gray-600',
      popular: false,
      features: [
        '1 property requirement/month (live for 1 week)',
        'No contact with sellers',
        'Respond to 3 buyer requirements',
        'Basic search only',
        'Standard support'
      ],
      limitations: [
        'Limited premium features',
        'No priority support',
        'No advanced analytics'
      ]
    },
    {
      id: 'basic',
      name: 'Basic',
      description: 'For casual land seekers',
      monthly: 999,
      yearly: 10789, // ~10% discount
      icon: <Shield className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      popular: false,
      features: [
        '5 property requirements/month (live for 1 week)',
        'Contact up to 5 sellers/month',
        'List 3 properties',
        'Respond to 5 buyer requirements',
        'Email support'
      ],
      limitations: [],
      savings: billingCycle === 'yearly' ? 2199 : 0
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For serious land seekers',
      monthly: 3999,
      yearly: 39990, // ~16% discount
      icon: <Zap className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      popular: true,
      features: [
        '10 property requirements/month (live for 1 month)',
        'Contact up to 30 sellers/month',
        'List 10 properties',
        'Respond to 30 buyer requirements',
        'Priority support',
        'Featured listings',
        'Analytics dashboard access'
      ],
      limitations: [],
      savings: billingCycle === 'yearly' ? 7998 : 0
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For large organizations and brokers',
      monthly: 9999,
      yearly: 99990, // ~16% discount
      icon: <Crown className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      popular: false,
      features: [
        'Unlimited property requirements',
        'Unlimited seller contacts',
        'Unlimited property listings',
        'Unlimited requirement responses',
        'Dedicated account manager',
        'Bulk upload option',
        'Priority listings',
        'Advanced analytics'
      ],
      limitations: [],
      savings: billingCycle === 'yearly' ? 19998 : 0
    }
  ];

  const features = [
    {
      name: 'Property Requirements',
      free: '1/month (1 week)',
      basic: '5/month (1 week)',
      pro: '10/month (1 month)',
      enterprise: 'Unlimited'
    },
    {
      name: 'Seller Contacts',
      free: 'None',
      basic: '5/month',
      pro: '30/month',
      enterprise: 'Unlimited'
    },
    {
      name: 'Property Listings',
      free: 'None',
      basic: '3',
      pro: '10',
      enterprise: 'Unlimited'
    },
    {
      name: 'Requirement Responses',
      free: '3',
      basic: '5',
      pro: '30',
      enterprise: 'Unlimited'
    },
    {
      name: 'Support Level',
      free: 'Standard',
      basic: 'Email',
      pro: 'Priority',
      enterprise: 'Dedicated Manager'
    },
    {
      name: 'Featured Listings',
      free: false,
      basic: false,
      pro: true,
      enterprise: true
    },
    {
      name: 'Analytics Dashboard',
      free: false,
      basic: false,
      pro: true,
      enterprise: true
    },
    {
      name: 'Bulk Upload',
      free: false,
      basic: false,
      pro: false,
      enterprise: true
    }
  ];

  const faqs = [
    {
      question: 'Can I switch plans anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes, all paid plans come with a 14-day free trial. No credit card required to start your trial.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, net banking, UPI, and digital wallets like Paytm and PhonePe.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid plans if you\'re not satisfied with our service.'
    },
    {
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees! The pricing shown includes all features. We only charge a small transaction fee on successful deals.'
    },
    {
      question: 'Can I get a custom enterprise solution?',
      answer: 'Absolutely! Our enterprise plan is fully customizable. Contact our sales team to discuss your specific requirements.'
    }
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (plan.monthly === 0) return 'Free';
    const price = billingCycle === 'yearly' ? plan.yearly / 12 : plan.monthly;
    return `₹${Math.round(price).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-600 text-white overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="mb-6 bg-white/15 text-white border-white/30 backdrop-blur-sm" size="md">
              <Sparkles className="w-4 h-4 mr-2" />
              Pricing Plans
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Simple, Transparent
              <span className="block bg-gradient-to-r from-emerald-200 to-blue-200 bg-clip-text text-transparent mt-1">
                Pricing
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your land buying or selling journey. 
              Start free and upgrade as you grow.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-1 flex items-center">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    billingCycle === 'monthly'
                      ? 'bg-white text-emerald-600 shadow-soft'
                      : 'text-white hover:text-emerald-200'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-200 relative ${
                    billingCycle === 'yearly'
                      ? 'bg-white text-emerald-600 shadow-soft'
                      : 'text-white hover:text-emerald-200'
                  }`}
                >
                  Yearly
                  <Badge className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900" size="sm">
                    Save 17%
                  </Badge>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <RevealAnimation animation="fade" delay={100}>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="relative">
              <div className="flex flex-no-wrap overflow-x-auto pb-8 px-4 md:px-0 scroll-smooth snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
                {plans.map((plan, index) => (
                  <div key={plan.id} className={`snap-center flex-shrink-0 w-full md:w-auto px-4 md:px-0 ${index > 0 ? 'ml-8 md:ml-0' : ''}`}>
                    <RevealAnimation animation="slide-up" delay={index * 150}>
                      <Card 
                        className={`relative text-center ${
                          plan.popular 
                            ? 'ring-2 ring-emerald-500 scale-105 shadow-strong z-10' 
                            : 'shadow-md hover:shadow-strong'
                        } ${plan.popular ? '' : 'hover:scale-105'} transition-all duration-500`}
                        shadow={plan.popular ? "strong" : "md"}
                      >
                        {plan.popular && (
                          <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-soft" size="md">
                            <Star className="w-4 h-4 mr-1" />
                            Most Popular
                          </Badge>
                        )}
                        
                        <div className="p-8">
                          <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft`}>
                            <div className="text-white">
                              {plan.icon}
                            </div>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                          <p className="text-gray-600 mb-6">{plan.description}</p>
                          
                          <div className="mb-6">
                            <div className="text-5xl font-bold text-gray-900 mb-2">
                              {getPrice(plan)}
                              {plan.monthly > 0 && (
                                <span className="text-lg text-gray-500 font-normal">
                                  /{billingCycle === 'yearly' ? 'month' : 'month'}
                                </span>
                              )}
                            </div>
                            {billingCycle === 'yearly' && plan.savings > 0 && (
                              <div className="text-emerald-600 text-sm font-medium">
                                Save ₹{plan.savings.toLocaleString()} yearly
                              </div>
                            )}
                            {billingCycle === 'yearly' && plan.yearly > 0 && (
                              <div className="text-gray-500 text-sm">
                                Billed yearly: ₹{plan.yearly.toLocaleString()}
                              </div>
                            )}
                            <p className="text-xs text-gray-500 mt-3">
                              No setup fees • Cancel anytime
                            </p>
                          </div>
                          
                          <ul className="space-y-3 mb-8 text-left">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                                <span className="text-gray-700 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <AnimatedButton
                            variant={plan.popular ? 'primary' : 'outline'}
                            className="w-full flex items-center justify-center"
                            size="lg"
                            onClick={() => navigate(isAuthenticated ? '/subscription' : '/register')}
                            glow={plan.popular}
                          > 
                            {plan.id === 'free' ? 'Get Started Free' : 'Choose Plan'}
                          </AnimatedButton>                  
                        </div>
                      </Card>
                    </RevealAnimation>
                  </div>
                ))}
              </div>
              
              {/* Scroll indicators (only for mobile) */}
              <div className="flex justify-center mt-6 space-x-2 md:hidden">
                {plans.map((_, index) => (
                  <div 
                    key={index} 
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === 0 ? 'bg-emerald-500 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </RevealAnimation>

      {/* Feature Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Compare Plans & Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Detailed comparison of features across all our plans.
            </p>
          </div>

          <Card shadow="strong" className="bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Features</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">Free</th>
                    <th className="text-center py-4 px-6 font-semibold text-blue-600">Basic</th>
                    <th className="text-center py-4 px-6 font-semibold text-emerald-600">Pro</th>
                    <th className="text-center py-4 px-6 font-semibold text-purple-600">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-4 px-6 font-medium text-gray-900">{feature.name}</td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.free === 'boolean' ? (
                          feature.free ? <Check className="w-5 h-5 text-emerald-600 mx-auto" /> : <X className="w-5 h-5 text-gray-400 mx-auto" />
                        ) : (
                          <span className="text-gray-700">{feature.free}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.basic === 'boolean' ? (
                          feature.basic ? <Check className="w-5 h-5 text-emerald-600 mx-auto" /> : <X className="w-5 h-5 text-gray-400 mx-auto" />
                        ) : (
                          <span className="text-gray-700">{feature.basic}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.pro === 'boolean' ? (
                          feature.pro ? <Check className="w-5 h-5 text-emerald-600 mx-auto" /> : <X className="w-5 h-5 text-gray-400 mx-auto" />
                        ) : (
                          <span className="text-gray-700">{feature.pro}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.enterprise === 'boolean' ? (
                          feature.enterprise ? <Check className="w-5 h-5 text-emerald-600 mx-auto" /> : <X className="w-5 h-5 text-gray-400 mx-auto" />
                        ) : (
                          <span className="text-gray-700">{feature.enterprise}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">FAQ</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <Card key={index} hover shadow="md" className="group">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
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
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-emerald-100 max-w-3xl mx-auto">
            Join thousands of users finding their perfect land match every day.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <AnimatedButton
              size="lg"
              onClick={() => navigate('/register')} 
              glow
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right" 
              className="flex items-center justify-center bg-white text-emerald-600 hover:bg-gray-50 shadow-strong hover:shadow-strong hover:scale-105 transition-all duration-300"
              variant="primary"
            > 
              <span>Get Started</span>
            </AnimatedButton>
            <AnimatedButton
              size="lg"
              onClick={() => navigate('/contact')}
              variant="outline"
              className="flex items-center justify-center border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <span>Contact Sales</span>
            </AnimatedButton>
          </div>
          
          <div className="mt-10 text-emerald-200 text-sm">
            No setup fees • Cancel anytime • Monthly and yearly billing options
          </div>
        </div>
      </section>
    </div>
  );
};