import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart, ExternalLink, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'How it Works', href: '/how-it-works' },
      { name: 'Careers', href: '/careers' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'Blog', href: '/blog' }
    ],
    services: [
      { name: 'Browse Properties', href: '/properties' },
      { name: 'Post Requirements', href: '/requirements' },
      { name: 'Premium Services', href: '/premium' },
      { name: 'Verification', href: '/verification' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Community Forum', href: '/forum' },
      { name: 'API Documentation', href: '/api-docs' },
      { name: 'Status Page', href: '/status' }
    ],
    legal: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR Compliance', href: '/gdpr' },
      { name: 'Dispute Resolution', href: '/disputes' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/landconnect', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/landconnect', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/landconnect', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/landconnect', color: 'hover:text-blue-700' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-6 lg:py-8 border-b border-gray-700">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-3 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              Stay Updated with Land Opportunities
            </h3>
            <p className="text-base lg:text-lg text-gray-300 mb-4 lg:mb-6 px-4">
              Get the latest property listings, market insights, and exclusive deals delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-3 max-w-md mx-auto px-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-3 lg:px-4 py-2 lg:py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-sm"
              />
              <button className="px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg shadow-soft hover:shadow-medium transition-all duration-200 flex items-center justify-center group text-sm">
                Subscribe
                <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 ml-1 lg:ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 lg:mt-3 px-4">
              Join 15,000+ subscribers. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center space-x-2 lg:space-x-3 mb-4 lg:mb-6 group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-lg lg:text-xl">LC</span>
                </div>
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  LandConnect
                </span>
              </Link>
              
              <p className="text-gray-300 text-base lg:text-lg mb-4 lg:mb-6 leading-relaxed">
                India's most trusted land marketplace connecting verified buyers with genuine sellers. 
                Making land transactions transparent, secure, and hassle-free.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 lg:space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs lg:text-sm">Email us at</p>
                    <a href="mailto:support@landconnect.in" className="text-white hover:text-emerald-400 font-medium transition-colors text-sm lg:text-base">
                      support@landconnect.in
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs lg:text-sm">Call us at</p>
                    <a href="tel:+911800123456" className="text-white hover:text-blue-400 font-medium transition-colors text-sm lg:text-base">
                      +91 1800 123 4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs lg:text-sm">Headquarters</p>
                    <p className="text-white font-medium text-sm lg:text-base">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Link Sections */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {/* Company */}
              <div>
                <h4 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6 text-white">Company</h4>
                <ul className="space-y-2 lg:space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group text-sm lg:text-base"
                      >
                        {link.name}
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6 text-white">Services</h4>
                <ul className="space-y-2 lg:space-y-3">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group text-sm lg:text-base"
                      >
                        {link.name}
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6 text-white">Support</h4>
                <ul className="space-y-2 lg:space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group text-sm lg:text-base"
                      >
                        {link.name}
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-base lg:text-lg font-semibold mb-4 lg:mb-6 text-white">Legal</h4>
                <ul className="space-y-2 lg:space-y-3">
                  {footerLinks.legal.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href} 
                        className="text-gray-300 hover:text-emerald-400 transition-colors duration-200 flex items-center group text-sm lg:text-base"
                      >
                        {link.name}
                        <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 text-gray-400 text-center lg:text-left">
              <span className="text-sm lg:text-base">© {currentYear} LandConnect. All rights reserved.</span>
              <span className="text-red-500 hidden sm:inline">•</span>
              <span className="flex items-center text-sm lg:text-base">
                Made with <Heart className="w-3 h-3 lg:w-4 lg:h-4 mx-1 text-red-500" fill="currentColor" /> in India
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              <span className="text-gray-400 text-xs lg:text-sm">Follow us:</span>
              <div className="flex space-x-3 lg:space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-8 h-8 lg:w-10 lg:h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} hover:bg-gray-700 transition-all duration-200 hover:scale-110 hover:shadow-lg group`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-4 h-4 lg:w-5 lg:h-5" />
                      <ExternalLink className="w-2 h-2 lg:w-3 lg:h-3 opacity-0 group-hover:opacity-100 absolute translate-x-2 -translate-y-2" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-gray-700">
            <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8 text-gray-400 text-xs lg:text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-blue-500 rounded-full"></div>
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-emerald-500 rounded-full"></div>
                <span>ISO 27001 Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 lg:w-3 lg:h-3 bg-purple-500 rounded-full"></div>
                <span>RERA Registered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};