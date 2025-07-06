import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Shield, CheckCircle, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import toast from 'react-hot-toast';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password);
      toast.success('Welcome back! Login successful.');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center py-8 lg:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-md w-full">
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
            Welcome Back! 👋
          </h1>
          <p className="text-base lg:text-lg text-gray-600 mb-4 lg:mb-6">
            Sign in to continue your land journey
          </p>
          
          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-4 lg:space-x-6 text-xs lg:text-sm text-gray-500 mb-6 lg:mb-8">
            <div className="flex items-center">
              <Shield className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-emerald-600" />
              <span>Secure Login</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-blue-600" />
              <span>Verified Platform</span>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <Card shadow="strong" className="bg-white/80 backdrop-blur-sm border-white/50">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 lg:space-y-6">
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
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
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
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded transition-colors"
                  {...register('rememberMe')}
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700 font-medium">
                  Remember me
                </label>
              </div>

              <Link
                to="/forgot-password"
                className="text-sm text-emerald-600 hover:text-emerald-500 font-medium transition-colors"
              >
                Forgot password?
              </Link>
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
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-4 lg:mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500 font-medium">
                  New to LandConnect?
                </span>
              </div>
            </div>

            <div className="mt-4 lg:mt-6 text-center">
              <Link
                to="/register"
                className="inline-flex items-center text-emerald-600 hover:text-emerald-500 font-medium transition-colors group text-sm lg:text-base"
              >
                Create your free account
                <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </Card>

        {/* Benefits Section */}
        <div className="mt-6 lg:mt-8 text-center">
          <div className="grid grid-cols-3 gap-3 lg:gap-4">
            <div className="text-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Zap className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600" />
              </div>
              <p className="text-xs font-medium text-gray-600">Instant Access</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <p className="text-xs font-medium text-gray-600">100% Secure</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
              </div>
              <p className="text-xs font-medium text-gray-600">Verified Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};