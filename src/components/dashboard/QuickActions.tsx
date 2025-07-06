import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, MessageCircle, BarChart3 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, title, description, color, onClick }) => (
  <Card 
    hover 
    className="cursor-pointer group relative overflow-hidden" 
    onClick={onClick}
  >
    <div className="flex items-center space-x-4">
      <div className={`${color} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <div className="flex-1 text-left">
        <h4 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
          {title}
        </h4>
        <p className="text-sm text-gray-600">
          {description}
        </p>
      </div>
      <div className="text-gray-400 group-hover:text-emerald-600 transition-colors">
        <Plus className="w-5 h-5 flex-shrink-0" />
      </div>
    </div>
    
    {/* Background gradient on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
  </Card>
);

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const actions = [
    {
      icon: <Plus className="w-8 h-8" />,
      title: 'Add New Property',
      description: 'List a new property with photos and details',
      color: 'text-emerald-600',
      onClick: () => navigate('/post-property')
    },
    {
      icon: <Plus className="w-8 h-8" />,
      title: 'Add New Requirement',
      description: 'Post your land requirement and find matches',
      color: 'text-blue-600',
      onClick: () => navigate('/post-requirement')
    },
    {
      icon: <Edit className="w-8 h-8" />,
      title: 'My Listings',
      description: 'Modify property details and pricing',
      color: 'text-orange-600',
      onClick: () => navigate('/my-listings')
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'View Messages',
      description: 'Check inquiries and respond to buyers',
      color: 'text-purple-600',
      onClick: () => navigate('/analytics')
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 flex items-center">
        <Plus className="w-5 h-5 mr-3 text-emerald-600" />
        Quick Actions for {user?.role === 'seeker' ? 'Land Seekers' : 'Property Owners'}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {actions.map((action, index) => (
          <QuickAction key={index} {...action} />
        ))}
      </div>
    </div>
  );
};