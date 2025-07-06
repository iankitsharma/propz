import React from 'react';
import { MessageCircle, Eye, Heart, UserPlus, Calendar, MapPin, Bell, CheckCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface ActivityItem {
  id: string;
  type: 'inquiry' | 'view' | 'favorite' | 'new_user' | 'meeting' | 'notification';
  title: string;
  description: string;
  time: string;
  avatar?: string;
  badge?: string;
  actionable?: boolean;
}

const ActivityItem: React.FC<{ activity: ActivityItem }> = ({ activity }) => {
  const getIcon = () => {
    switch (activity.type) {
      case 'inquiry':
        return <MessageCircle className="w-5 h-5 text-blue-600" />;
      case 'view':
        return <Eye className="w-5 h-5 text-emerald-600" />;
      case 'favorite':
        return <Heart className="w-5 h-5 text-red-600" />;
      case 'new_user':
        return <UserPlus className="w-5 h-5 text-purple-600" />;
      case 'meeting':
        return <Calendar className="w-5 h-5 text-orange-600" />;
      case 'notification':
        return <Bell className="w-5 h-5 text-yellow-600" />;
      default:
        return <CheckCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBadgeVariant = (): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gray' => {
    switch (activity.type) {
      case 'inquiry':
        return 'primary';
      case 'view':
        return 'success';
      case 'favorite':
        return 'danger';
      case 'new_user':
        return 'secondary';
      case 'meeting':
        return 'warning';
      default:
        return 'gray';
    }
  };

  return (
    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors group">
      <div className="flex-shrink-0 p-2 bg-gray-100 rounded-full group-hover:bg-white group-hover:shadow-sm transition-all">
        {getIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {activity.title}
          </p>
          {activity.badge && (
            <Badge variant={getBadgeVariant()} size="sm">
              {activity.badge}
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {activity.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {activity.time}
          </div>
          
          {activity.actionable && (
            <Button variant="ghost" size="sm" className="text-xs">
              View Details
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const ActivityFeed: React.FC = () => {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'inquiry',
      title: 'New inquiry from Rajesh Kumar',
      description: 'Interested in your Agricultural Land in Nashik. Wants to schedule a site visit.',
      time: '2 hours ago',
      badge: 'New',
      actionable: true
    },
    {
      id: '2',
      type: 'view',
      title: 'Property viewed 15 times',
      description: 'Your residential plot in Pune got 15 new views in the last 24 hours.',
      time: '4 hours ago',
      badge: 'Popular'
    },
    {
      id: '3',
      type: 'favorite',
      title: 'Property added to favorites',
      description: 'Priya Sharma added your commercial land to favorites and might contact soon.',
      time: '6 hours ago',
      actionable: true
    },
    {
      id: '4',
      type: 'meeting',
      title: 'Site visit scheduled',
      description: 'Meeting with potential buyer tomorrow at 2:00 PM for property inspection.',
      time: '1 day ago',
      badge: 'Tomorrow',
      actionable: true
    },
    {
      id: '5',
      type: 'new_user',
      title: 'New match found',
      description: 'A verified buyer matching your property criteria has joined the platform.',
      time: '2 days ago',
      actionable: true
    },
    {
      id: '6',
      type: 'notification',
      title: 'Premium subscription expiring',
      description: 'Your premium subscription will expire in 7 days. Renew to continue getting premium benefits.',
      time: '3 days ago',
      badge: 'Urgent',
      actionable: true
    }
  ];

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-0 flex items-center">
          <Bell className="w-5 h-5 mr-3 text-emerald-600" />
          Recent Activity Feed
        </h3>
        <Button variant="ghost" size="sm">View All</Button>
      </div>  
      
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
      
      {activities.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No recent activity</p>
        </div>
      )}
    </>
  );
};