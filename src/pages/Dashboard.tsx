import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, MessageCircle, Award, Zap, Star } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { QuickActions } from '../components/dashboard/QuickActions';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        {/* Welcome Header */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between">
            <div className="mb-4 xl:mb-0">
              <h1 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 lg:mb-3">
                {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-3 lg:mb-4">
                {user?.role === 'seeker' 
                  ? "Ready to find your perfect land match today?" 
                  : "Let's boost your property business performance."}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <Badge variant="gradient" size="md" rounded glow>
                  <Award className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  {user?.subscription_tier?.replace('_', ' ').toUpperCase()} Member
                </Badge>
                <Badge variant="success" size="md" rounded>
                  <Zap className="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" />
                  Profile: 95% Complete
                </Badge>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                size="md"
                onClick={() => window.open('/help', '_blank')}
                className="w-full sm:w-auto text-sm lg:text-base"
              >
                <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Need Help
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate(user?.role === 'seeker' ? '/post-requirement' : '/post-property')}
                className="w-full sm:w-auto shadow-strong text-sm lg:text-base"
              >
                <Plus className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                {user?.role === 'seeker' ? 'Post Requirement' : 'Add Property'}
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions - Full Width */}
        <div className="mb-8 lg:mb-12">
          <QuickActions />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity - Left Column */}
          <div>
            <Card className="h-full">
              <ActivityFeed />
            </Card>
          </div>

          {/* Subscription Status - Right Column */}
          <div>
            <Card shadow="md" className="h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg lg:text-xl font-semibold flex items-center">
                  <Star className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-yellow-600" />
                  Subscription
                </h3>
                <Badge variant={user?.subscription_tier === 'free' ? 'gray' : 'gradient'} size="md" rounded>
                  {user?.subscription_tier?.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
              
              {user?.subscription_tier === 'free' ? (
                <div className="bg-gradient-to-br from-emerald-50 to-blue-50 p-4 lg:p-6 rounded-xl border border-emerald-100">
                  <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-2 flex items-center">
                    <Zap className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-emerald-600" />
                    Upgrade to Premium
                  </h4>
                  <p className="text-gray-600 mb-3 lg:mb-4 text-sm lg:text-base">
                    Unlock unlimited listings, advanced analytics, and priority support.
                  </p>
                  <ul className="space-y-1 lg:space-y-2 mb-4 lg:mb-6">
                    <li className="flex items-center text-xs lg:text-sm text-gray-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                      Unlimited property listings
                    </li>
                    <li className="flex items-center text-xs lg:text-sm text-gray-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                      Advanced search filters
                    </li>
                    <li className="flex items-center text-xs lg:text-sm text-gray-600">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                      Priority customer support
                    </li>
                  </ul>
                  <Button variant="primary" size="md" className="w-full">
                    <Link to="/subscription" className="flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      Upgrade Now
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 lg:p-6 rounded-xl border border-green-100">
                  <h4 className="text-base lg:text-lg font-semibold text-green-900 mb-2 flex items-center">
                    <Award className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-green-600" />
                    Premium Active
                  </h4>
                  <p className="text-green-700 mb-3 lg:mb-4 text-sm lg:text-base">
                    Your premium subscription is active. Enjoy all the benefits!
                  </p>
                  <div className="flex items-center justify-between text-xs lg:text-sm text-green-600">
                    <span>Next billing: March 15, 2024</span>
                    <Button variant="outline" size="sm">
                      Manage Plan
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};