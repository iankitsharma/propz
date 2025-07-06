import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, User, Phone, Eye, EyeOff, MapPin, ArrowRight, Shield, Star, Users, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import toast from 'react-hot-toast';

interface RegisterForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'seeker' | 'owner' | 'broker' | 'professional';
  location: string;
  terms: boolean;
  newsletter: boolean;
}

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterForm>();

  const password = watch('password');
  const selectedRole = watch('role');

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        location: data.location
      });
      toast.success('🎉 Registration successful! Welcome to LandConnect.');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  const roleOptions = [
    {
      value: 'seeker',
      label: 'Land Seeker',
      description: 'Looking to buy or rent land',
      icon: <User className="w-4 h-4 lg:w-5 lg:h-5" />,
      color: 'text-emerald-600 bg-emerald-100'
    },
    {
      value: 'owner',
      label: 'Property Owner',
      description: 'Selling or renting out land',
      icon: <MapPin className="w-4 h-4 lg:w-5 lg:h-5" />,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      value: 'broker',
      label: 'Real Estate Broker',
      description: 'Facilitating land transactions',
      icon: <Users className="w-4 h-4 lg:w-5 lg:h-5" />,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      value: 'professional',
      label: 'Professional/Company',
      description: 'Business or institutional user',
      icon: <Star className="w-4 h-4 lg:w-5 lg:h-5" />,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-8 lg:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-8">
          <Link to="/" className="flex items-center justify-center space-x-2 lg:space-x-3 mb-4 lg:mb-6 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg lg:text-xl">LC</span>
            </div>
            <span className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              LandConnect
            </span>
          </Link>
          
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-3">
            Join LandConnect 🚀
          </h1>
          <p className="text-base lg:text-lg text-gray-600 mb-4 lg:mb-6">
            Start your journey to find the perfect land match
          </p>
          
          {/* Stats */}
          <div className="flex items-center justify-center space-x-6 lg:space-x-8 text-xs lg:text-sm text-gray-600 mb-6 lg:mb-8">
            <div className="text-center">
              <div className="text-xl lg:text-2xl font-bold text-emerald-600">25K+</div>
              <div>Properties</div>
            </div>
            <div className="text-center">
              <div className="text-xl lg:text-2xl font-bold text-blue-600">15K+</div>
              <div>Users</div>
            </div>
            <div className="text-center">
              <div className="text-xl lg:text-2xl font-bold text-purple-600">5K+</div>
              <div>Deals</div>
            </div>
          </div>
        </div>

        {/* Registration Card */}
        <Card shadow="strong" className="bg-white/80 backdrop-blur-sm border-white/50">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 flex items-center">
                <User className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-emerald-600" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  leftIcon={<User className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />}
                  error={errors.name?.message}
                  {...register('name', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  leftIcon={<Phone className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />}
                  error={errors.phone?.message}
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Please enter a valid 10-digit mobile number'
                    }
                  })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 mt-3 lg:mt-4">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  leftIcon={<Mail className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />}
                  error={errors.email?.message}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Please enter a valid email address'
                    }
                  })}
                />

                <Input
                  label="Location"
                  type="text"
                  placeholder="City, State"
                  leftIcon={<MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />}
                  error={errors.location?.message}
                  {...register('location', {
                    required: 'Location is required'
                  })}
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 flex items-center">
                <Users className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-emerald-600" />
                I am a...
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                {roleOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex items-center p-3 lg:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedRole === option.value
                        ? 'border-emerald-500 bg-emerald-50 shadow-soft'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      value={option.value}
                      className="sr-only"
                      {...register('role', { required: 'Please select your role' })}
                    />
                    <div className={`w-8 h-8 lg:w-10 lg:h-10 ${option.color} rounded-lg flex items-center justify-center mr-3`}>
                      {option.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm lg:text-base">{option.label}</div>
                      <div className="text-xs lg:text-sm text-gray-600">{option.description}</div>
                    </div>
                    {selectedRole === option.value && (
                      <CheckCircle2 className="absolute top-3 right-3 w-4 h-4 lg:w-5 lg:h-5 text-emerald-600" />
                    )}
                  </label>
                ))}
              </div>
              {errors.role && (
                <p className="mt-2 text-sm text-red-600">{errors.role.message}</p>
              )}
            </div>

            {/* Password Section */}
            <div>
              <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4 flex items-center">
                <Shield className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-emerald-600" />
                Create Password
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  leftIcon={<Lock className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" /> : <Eye className="w-4 h-4 lg:w-5 lg:h-5" />}
                    </button>
                  }
                  error={errors.password?.message}
                  hint="Minimum 8 characters with uppercase, lowercase, and number"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: 'Password must contain uppercase, lowercase, and number'
                    }
                  })}
                />

                <Input
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  leftIcon={<Lock className="w-4 h-4 lg:w-5 lg:h-5 text-gray-400" />}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4 lg:w-5 lg:h-5" /> : <Eye className="w-4 h-4 lg:w-5 lg:h-5" />}
                    </button>
                  }
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                />
              </div>
            </div>

            {/* Terms and Newsletter */}
            <div className="space-y-3 lg:space-y-4">
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-colors"
                  {...register('terms', { required: 'You must accept the terms and conditions' })}
                />
                <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-emerald-600 hover:text-emerald-500 font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-emerald-600 hover:text-emerald-500 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  id="newsletter"
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-colors"
                  {...register('newsletter')}
                />
                <label htmlFor="newsletter" className="ml-3 text-sm text-gray-700">
                  Subscribe to our newsletter for property updates and market insights
                </label>
              </div>
              
              {errors.terms && (
                <p className="text-sm text-red-600">{errors.terms.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full shadow-strong"
              icon={<ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />}
              iconPosition="right"
            >
              Create My Account
            </Button>
          </form>

          {/* Already have account */}
          <div className="mt-4 lg:mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </Card>

        {/* Benefits */}
        <div className="mt-6 lg:mt-8">
          <div className="text-center mb-4 lg:mb-6">
            <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
              Why choose LandConnect?
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
            <div className="text-center p-3 lg:p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">100% Secure</h4>
              <p className="text-xs lg:text-sm text-gray-600">Bank-level security for all transactions</p>
            </div>
            
            <div className="text-center p-3 lg:p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Verified Listings</h4>
              <p className="text-xs lg:text-sm text-gray-600">All properties are thoroughly verified</p>
            </div>
            
            <div className="text-center p-3 lg:p-4 bg-white/50 rounded-xl backdrop-blur-sm">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 text-sm lg:text-base">Expert Support</h4>
              <p className="text-xs lg:text-sm text-gray-600">24/7 customer support team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};