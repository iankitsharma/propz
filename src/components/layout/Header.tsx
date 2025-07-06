import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Bell, Plus, ChevronDown, Search, Edit } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 lg:space-x-3 group">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg lg:rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-sm lg:text-lg">LC</span>
            </div>
            <span className="text-lg lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent hidden sm:block">
              LandConnect
            </span>
          </Link>

          {/* Search Bar - Desktop Only */}
          <div className="hidden xl:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties, locations..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-full focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-200 text-sm"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link to="/properties" className="px-3 xl:px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition-all duration-200 text-sm xl:text-base">
              Properties
            </Link>
            <Link to="/requirements" className="px-3 xl:px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition-all duration-200 text-sm xl:text-base">
              Requirements
            </Link>
            <Link to="/pricing" className="px-3 xl:px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition-all duration-200 text-sm xl:text-base">
              Pricing
            </Link>
            
            {/* More Dropdown */}
            <div className="relative group">
              <button className="flex items-center px-3 xl:px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition-all duration-200 text-sm xl:text-base">
                More
                <ChevronDown className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-strong border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to="/how-it-works" className="block px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors text-sm">
                  How it Works
                </Link>
                <Link to="/about" className="block px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors text-sm">
                  About Us
                </Link>
                <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors text-sm">
                  Contact
                </Link>
              </div>
            </div>
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Mobile Search Button */}
            <button className="lg:hidden xl:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {isAuthenticated ? (
              <>
                {/* Post Property Button */}
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/post-property')}
                  className="hidden md:flex shadow-soft hover:shadow-medium text-xs lg:text-sm px-3 lg:px-4 py-2 lg:py-3"
                >
                  <Plus className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
                  <span className="hidden lg:inline">Post Property</span>
                  <span className="lg:hidden">Post</span>
                </Button>
                
                {/* Notifications */}
                <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="absolute top-1 right-1 lg:top-1.5 lg:right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </button>

                {/* User Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 lg:space-x-3 p-1 lg:p-2 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-200">
                      <User className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                    </div>
                    <div className="hidden lg:block text-left">
                      <div className="text-sm font-semibold text-gray-900">
                        {user?.name}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {user?.role}
                      </div>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 hidden lg:block group-hover:rotate-180 transition-transform duration-200" />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-56 lg:w-64 bg-white rounded-xl shadow-strong border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 capitalize">
                            {user?.subscription_tier} Plan
                          </span>
                        </div>
                      </div>
                      
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                      
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </Link>
                      
                      <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="hidden sm:flex text-xs lg:text-sm px-3 lg:px-4 py-2 lg:py-3"
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="shadow-soft hover:shadow-medium text-xs lg:text-sm px-3 lg:px-4 py-2 lg:py-3"
                >
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Join</span>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 animate-slide-down">
          {/* Mobile Search */}
          <div className="px-4 pt-4 pb-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="px-4 py-4 space-y-1">
            <Link
              to="/properties"
              className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Properties
            </Link>
            <Link
              to="/requirements"
              className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Requirements
            </Link>
            <Link
              to="/how-it-works"
              className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link to="/pricing" className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition-colors border-b border-gray-200 pb-4 mb-2" onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg font-medium transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            
            {isAuthenticated && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    navigate('/post-property');
                    setIsMenuOpen(false);
                  }}
                  className="w-full mb-2"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Post Property
                </Button>
              </div>
            )}
            
            {!isAuthenticated && (
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    navigate('/register');
                    setIsMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};