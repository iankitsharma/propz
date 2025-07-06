import React, { useState } from 'react';
import { Search, Book, MessageCircle, Phone, Mail, ChevronDown, ChevronRight, HelpCircle, ExternalLink } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    {
      icon: <Book className="w-6 h-6" />,
      title: 'Getting Started',
      description: 'Learn the basics of using LandConnect',
      color: 'text-emerald-600 bg-emerald-100',
      articles: 12
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Property Search',
      description: 'Tips for finding the perfect property',
      color: 'text-blue-600 bg-blue-100',
      articles: 8
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Communication',
      description: 'How to connect with buyers and sellers',
      color: 'text-purple-600 bg-purple-100',
      articles: 6
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Account & Billing',
      description: 'Manage your account and subscription',
      color: 'text-orange-600 bg-orange-100',
      articles: 10
    }
  ];

  const popularArticles = [
    {
      title: 'How to post a property requirement',
      category: 'Getting Started',
      readTime: '3 min read',
      views: '15.2K views'
    },
    {
      title: 'Verifying property documents',
      category: 'Property Search',
      readTime: '5 min read',
      views: '12.8K views'
    },
    {
      title: 'Understanding pricing plans',
      category: 'Account & Billing',
      readTime: '4 min read',
      views: '10.5K views'
    },
    {
      title: 'How to contact property owners',
      category: 'Communication',
      readTime: '2 min read',
      views: '9.3K views'
    },
    {
      title: 'Tips for first-time land buyers',
      category: 'Property Search',
      readTime: '7 min read',
      views: '8.7K views'
    },
    {
      title: 'Setting up notifications',
      category: 'Getting Started',
      readTime: '3 min read',
      views: '7.9K views'
    }
  ];

  const faqs = [
    {
      question: 'How do I create an account on LandConnect?',
      answer: 'Creating an account is simple! Click the "Get Started" button on our homepage, fill in your basic details including name, email, phone number, and choose your role (buyer, seller, broker, or professional). Verify your email and phone number, and you\'re ready to start using LandConnect.'
    },
    {
      question: 'How can I post a property requirement?',
      answer: 'After logging in, go to your dashboard and click "Post Requirement". Fill in details like property type, location preferences, budget range, size requirements, and any specific needs. Our AI will then match you with suitable properties and verified sellers will contact you directly.'
    },
    {
      question: 'Are all properties verified?',
      answer: 'Yes, we have a comprehensive verification process. All properties undergo document verification, ownership checks, and where possible, physical site verification. We also verify property owners through government ID, phone, and email verification.'
    },
    {
      question: 'What are the fees for using LandConnect?',
      answer: 'Basic listing and browsing is free. We offer premium plans starting at ₹1,499/month for advanced features. We only charge a small transaction fee (1-2%) on successful deals. There are no hidden charges - everything is transparent.'
    },
    {
      question: 'How do I contact property owners?',
      answer: 'Once you find a property you\'re interested in, click on the property card to view details. You\'ll see contact options including phone, email, and in-app messaging. Premium users get unlimited contacts, while free users have a monthly limit.'
    },
    {
      question: 'Is my personal information safe?',
      answer: 'Absolutely! We use bank-level security with SSL encryption. Your personal information is never shared without your consent. Property owners only see your contact details when you initiate contact or express interest in their property.'
    },
    {
      question: 'Can I edit or delete my property listing?',
      answer: 'Yes, you can edit or delete your listings anytime from your dashboard. Go to "My Properties", select the property you want to modify, and click edit. Changes are reflected immediately on the platform.'
    },
    {
      question: 'How do I upgrade my subscription?',
      answer: 'Visit your account settings and click on "Subscription". Choose your preferred plan and payment method. You can upgrade anytime and the new features are activated immediately. Downgrades take effect at the next billing cycle.'
    }
  ];

  const quickActions = [
    {
      title: 'Contact Support',
      description: 'Get help from our expert team',
      action: 'Start Chat',
      icon: <MessageCircle className="w-5 h-5" />,
      color: 'bg-emerald-500 hover:bg-emerald-600'
    },
    {
      title: 'Call Us',
      description: '24/7 phone support available',
      action: 'Call Now',
      icon: <Phone className="w-5 h-5" />,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Email Support',
      description: 'Send us a detailed message',
      action: 'Send Email',
      icon: <Mail className="w-5 h-5" />,
      color: 'bg-purple-500 hover:bg-purple-600'
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
              <HelpCircle className="w-4 h-4 mr-2" />
              Help Center
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              How can we
              <span className="block bg-gradient-to-r from-emerald-200 to-blue-200 bg-clip-text text-transparent">
                help you?
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Find answers to your questions, learn how to use our platform, 
              or get in touch with our support team.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles, guides, FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 bg-white/95 backdrop-blur-sm border-0 rounded-full text-gray-900 placeholder-gray-500 text-lg focus:ring-2 focus:ring-emerald-300 focus:bg-white transition-all duration-200 shadow-soft"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} hover className="text-center group cursor-pointer">
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white transition-all duration-200 group-hover:scale-110`}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-gray-600 mb-4">{action.description}</p>
                <Button variant="outline" size="sm" className="group-hover:border-emerald-500 group-hover:text-emerald-600">
                  {action.action}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the information you need organized by topic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Card key={index} hover shadow="md" className="text-center group cursor-pointer">
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <span>{category.articles} articles</span>
                  <ChevronRight className="w-4 h-4 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="primary">Popular</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Most Read Articles
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with these helpful guides and tutorials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularArticles.map((article, index) => (
              <Card key={index} hover shadow="md" className="group cursor-pointer">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="gray" size="sm">
                      {article.category}
                    </Badge>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{article.readTime}</span>
                    <span>{article.views}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">FAQ</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about LandConnect.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} shadow="sm" className="overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`} />
                  </div>
                </button>
                
                {expandedFaq === index && (
                  <div className="px-6 pb-6 animate-slide-down">
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-24 bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Still Need Help?
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-emerald-100 max-w-3xl mx-auto">
            Our support team is here to help you 24/7. Get personalized assistance for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-50 shadow-strong hover:shadow-strong hover:scale-105 transition-all duration-300"
              icon={<MessageCircle className="w-5 h-5" />}
            >
              Start Live Chat
            </Button>
            <Button
              size="lg"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              icon={<Phone className="w-5 h-5" />}
            >
              Call Support
            </Button>
          </div>
          
          <div className="mt-10 text-emerald-200 text-sm">
            Average response time: 2 minutes • Available 24/7 • Free support
          </div>
        </div>
      </section>
    </div>
  );
};