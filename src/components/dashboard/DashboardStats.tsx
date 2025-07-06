import React from 'react';
import { TrendingUp, TrendingDown, Eye, MessageCircle, Heart, Star, Users, MapPin } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color, trend }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-emerald-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return null;
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-emerald-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <Card hover shadow="md" className="relative overflow-hidden group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
            {value}
          </p>
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="ml-1 whitespace-nowrap">
                {change > 0 ? '+' : ''}{change}% from last month
              </span>
            </div>
          )}
        </div>
        <div className={`${color} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 rounded-full transform translate-x-8 -translate-y-8`}></div>
    </Card>
  );
};

export const DashboardStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Properties',
      value: '12',
      change: 15,
      icon: <MapPin className="w-8 h-8" />,
      color: 'text-blue-600',
      trend: 'up' as const
    },
    {
      title: 'Total Views',
      value: '2,456',
      change: 8,
      icon: <Eye className="w-8 h-8" />,
      color: 'text-emerald-600',
      trend: 'up' as const
    },
    {
      title: 'Inquiries',
      value: '89',
      change: -3,
      icon: <MessageCircle className="w-8 h-8" />,
      color: 'text-orange-600',
      trend: 'down' as const
    },
    {
      title: 'Favorites',
      value: '234',
      change: 12,
      icon: <Heart className="w-8 h-8" />,
      color: 'text-red-600',
      trend: 'up' as const
    },
    {
      title: 'Profile Rating',
      value: '4.8',
      change: 5,
      icon: <Star className="w-8 h-8" />,
      color: 'text-yellow-600',
      trend: 'up' as const
    },
    {
      title: 'Active Leads',
      value: '23',
      change: 18,
      icon: <Users className="w-8 h-8" />,
      color: 'text-purple-600',
      trend: 'up' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};