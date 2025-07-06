import React from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones, Building } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import toast from 'react-hot-toast';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  type: 'general' | 'support' | 'business' | 'feedback';
}

export const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    reset();
  };

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      description: 'Speak directly with our team',
      value: '+91 1800 123 4567',
      action: 'tel:+911800123456',
      color: 'text-emerald-600 bg-emerald-100',
      available: '24/7 Support'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      description: 'Send us a detailed message',
      value: 'support@landconnect.in',
      action: 'mailto:support@landconnect.in',
      color: 'text-blue-600 bg-blue-100',
      available: 'Response within 2 hours'
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'Live Chat',
      description: 'Get instant help',
      value: 'Start Chat',
      action: '#',
      color: 'text-purple-600 bg-purple-100',
      available: 'Available 9 AM - 9 PM'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      description: 'Meet us in person',
      value: 'Mumbai Office',
      action: '#',
      color: 'text-orange-600 bg-orange-100',
      available: 'Mon-Fri, 10 AM - 6 PM'
    }
  ];

  const offices = [
    {
      city: 'Mumbai',
      address: '12th Floor, One World Center, Senapati Bapat Marg, Elphinstone Road, Mumbai 400013',
      phone: '+91 22 6789 1234',
      email: 'mumbai@landconnect.in',
      timing: 'Mon-Fri: 10 AM - 6 PM'
    },
    {
      city: 'Bangalore',
      address: '3rd Floor, Prestige Tech Park, Kadubeesanahalli, Bangalore 560103',
      phone: '+91 80 4567 8901',
      email: 'bangalore@landconnect.in',
      timing: 'Mon-Fri: 10 AM - 6 PM'
    },
    {
      city: 'Delhi',
      address: '8th Floor, Cyber Hub, DLF Phase II, Sector 24, Gurugram 122002',
      phone: '+91 11 2345 6789',
      email: 'delhi@landconnect.in',
      timing: 'Mon-Fri: 10 AM - 6 PM'
    }
  ];

  const faqs = [
    {
      question: 'How do I list my property?',
      answer: 'You can list your property by creating an account and using our simple property listing form. All listings are verified within 24 hours.'
    },
    {
      question: 'Are all properties verified?',
      answer: 'Yes, we verify all property listings through our comprehensive verification process including document checks and site visits.'
    },
    {
      question: 'What are the charges for using LandConnect?',
      answer: 'Basic listing is free. We offer premium plans with additional features. Commission is charged only on successful transactions.'
    },
    {
      question: 'How can I contact property owners?',
      answer: 'You can contact property owners directly through our platform using phone, email, or in-app messaging after creating an account.'
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
              <Headphones className="w-4 h-4 mr-2" />
              Contact Us
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              Get in Touch
              <span className="block bg-gradient-to-r from-emerald-200 to-blue-200 bg-clip-text text-transparent">
                We're Here to Help
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-10 text-emerald-100 max-w-3xl mx-auto leading-relaxed">
              Have questions about our platform? Need help with your property search? 
              Our expert team is ready to assist you 24/7.
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-emerald-200">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-emerald-300" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2 text-emerald-300" />
                <span>Live Chat</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-emerald-300" />
                <span>Instant Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the most convenient way to get in touch with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} hover shadow="md" className="text-center group cursor-pointer">
                <div className={`w-16 h-16 ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <p className="font-semibold text-gray-900 mb-2">{method.value}</p>
                <p className="text-sm text-emerald-600">{method.available}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card shadow="strong" className="bg-white">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Send className="w-6 h-6 mr-2 text-emerald-600" />
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter your name"
                    error={errors.name?.message}
                    {...register('name', { required: 'Name is required' })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    error={errors.phone?.message}
                    {...register('phone', { required: 'Phone number is required' })}
                  />
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                      {...register('type', { required: 'Please select inquiry type' })}
                    >
                      <option value="">Select type</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="business">Business Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                </div>

                <Input
                  label="Subject"
                  placeholder="Brief subject of your message"
                  error={errors.subject?.message}
                  {...register('subject', { required: 'Subject is required' })}
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us more about your inquiry..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
                    {...register('message', { required: 'Message is required' })}
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full shadow-strong"
                  icon={<Send className="w-5 h-5" />}
                >
                  Send Message
                </Button>
              </form>
            </Card>

            {/* Office Locations */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Building className="w-6 h-6 mr-2 text-emerald-600" />
                  Our Offices
                </h3>
                
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <Card key={index} shadow="md" className="group hover:bg-gradient-to-br hover:from-emerald-50 hover:to-blue-50">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <MapPin className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                            {office.city} Office
                          </h4>
                          <p className="text-gray-600 mb-3">{office.address}</p>
                          <div className="space-y-1 text-sm">
                            <p className="flex items-center text-gray-600">
                              <Phone className="w-4 h-4 mr-2 text-emerald-600" />
                              {office.phone}
                            </p>
                            <p className="flex items-center text-gray-600">
                              <Mail className="w-4 h-4 mr-2 text-emerald-600" />
                              {office.email}
                            </p>
                            <p className="flex items-center text-gray-600">
                              <Clock className="w-4 h-4 mr-2 text-emerald-600" />
                              {office.timing}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h3>
                
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index} shadow="sm" className="group">
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {faq.question}
                      </h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};