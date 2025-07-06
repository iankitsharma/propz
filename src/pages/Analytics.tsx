import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, MessageCircle, Star, TrendingUp, Users, MapPin, Calendar, BarChart3, Award, Zap, Target } from 'lucide-react';
import { DashboardStats } from '../components/dashboard/DashboardStats';
import { PerformanceChart } from '../components/dashboard/PerformanceChart';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAuthStore } from '../store/authStore';

export const Analytics: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const quickStats = [
    { 
      icon: <Eye className="w-4 h-4 lg:w-5 lg:h-5" />, 
      label: 'Profile Views', 
      value: '2,340', 
      change: '+12%',
      color: 'text-blue-600 bg-blue-100'
    },
    { 
      icon: <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5" />, 
      label: 'New Messages', 
      value: '18', 
      change: '+5%',
      color: 'text-emerald-600 bg-emerald-100'
    },
    { 
      icon: <Star className="w-4 h-4 lg:w-5 lg:h-5" />, 
      label: 'Saved Properties', 
      value: '45', 
      change: '+8%',
      color: 'text-orange-600 bg-orange-100'
    },
    { 
      icon: <Target className="w-4 h-4 lg:w-5 lg:h-5" />, 
      label: 'Active Leads', 
      value: '12', 
      change: '+20%',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              icon={<ArrowLeft className="w-4 h-4" />}
              className="mb-2"
            >
              Back to Dashboard
            </Button>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Analytics & Insights
            </h1>
            <p className="text-gray-600">
              Track your performance and property market trends
            </p>
          </div>
          <Badge variant="gradient" size="lg" rounded glow>
            <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
            Premium Analytics
          </Badge>
        </div>
        
        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4 mb-8 lg:mb-10">
          {quickStats.map((stat, index) => (
            <Card key={index} hover shadow="md" className="text-center group">
              <div className={`w-8 h-8 lg:w-12 lg:h-12 ${stat.color} rounded-lg lg:rounded-xl flex items-center justify-center mx-auto mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <div className="text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs lg:text-sm text-gray-600 mb-1">{stat.label}</div>
              <div className="text-xs text-emerald-600 font-medium">{stat.change} this week</div>
            </Card>
          ))}
        </div>

        {/* Main Stats Grid */}
        <Card className="mb-8 lg:mb-10 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Performance Overview</h2>
            <Badge variant="primary" size="md">
              <Calendar className="w-3 h-3 mr-1" />
              Last 30 Days
            </Badge>
          </div>
          <DashboardStats />
        </Card>

        {/* Performance Chart */}
        <Card className="mb-8 lg:mb-10 p-6 lg:p-8">
          <PerformanceChart />
        </Card>

        {/* Market Insights */}
        <Card shadow="md" className="mb-8 lg:mb-10">
          <h3 className="text-xl lg:text-2xl font-semibold mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 mr-2 text-emerald-600" />
            Market Insights
          </h3>
          <div className="space-y-4 lg:space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm lg:text-base font-medium text-gray-700">Agricultural Land</span>
                <span className="text-sm lg:text-base text-emerald-600 font-medium">+8.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 lg:h-3">
                <div className="bg-emerald-500 h-2 lg:h-3 rounded-full" style={{width: '85%'}}></div>
              </div>
              <p className="text-xs lg:text-sm text-gray-500 mt-1">High demand in Maharashtra</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm lg:text-base font-medium text-gray-700">Residential Plots</span>
                <span className="text-sm lg:text-base text-blue-600 font-medium">+12.3%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 lg:h-3">
                <div className="bg-blue-500 h-2 lg:h-3 rounded-full" style={{width: '92%'}}></div>
              </div>
              <p className="text-xs lg:text-sm text-gray-500 mt-1">Strong growth in Pune</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm lg:text-base font-medium text-gray-700">Commercial Land</span>
                <span className="text-sm lg:text-base text-orange-600 font-medium">+5.2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 lg:h-3">
                <div className="bg-orange-500 h-2 lg:h-3 rounded-full" style={{width: '65%'}}></div>
              </div>
              <p className="text-xs lg:text-sm text-gray-500 mt-1">Moderate growth in Bangalore</p>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600">24%</div>
                <div className="text-xs text-gray-500">Avg. Response Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">12%</div>
                <div className="text-xs text-gray-500">Conversion Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">2.3d</div>
                <div className="text-xs text-gray-500">Avg. Response Time</div>
              </div>
            </div>
          </div>
          
          <Button variant="outline" size="sm" className="w-full mt-6">
            View Full Report
          </Button>
        </Card>

        {/* Property Performance Comparison */}
        <Card shadow="md" className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
              Property Performance
            </h3>
            <div className="flex space-x-2">
              <Badge variant="success" size="sm">Last 30 Days</Badge>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inquiries
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Conversion
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    Agricultural Land - Nashik
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 text-center">234</td>
                  <td className="px-4 py-4 text-sm text-gray-600 text-center">12</td>
                  <td className="px-4 py-4 text-sm text-emerald-600 font-medium text-center">5.1%</td>
                  <td className="px-4 py-4 text-sm text-emerald-600 text-right">+15%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    Residential Plot - Pune
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 text-center">156</td>
                  <td className="px-4 py-4 text-sm text-gray-600 text-center">8</td>
                  <td className="px-4 py-4 text-sm text-blue-600 font-medium text-center">5.1%</td>
                  <td className="px-4 py-4 text-sm text-blue-600 text-right">+8%</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">
                    Commercial Land - Bangalore
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 text-center">87</td>
                  <td className="px-4 py-4 text-sm text-gray-600 text-center">3</td>
                  <td className="px-4 py-4 text-sm text-red-600 font-medium text-center">3.4%</td>
                  <td className="px-4 py-4 text-sm text-red-600 text-right">-2%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};