import React from 'react';
import { TrendingUp, BarChart3, Users, Eye } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export const PerformanceChart: React.FC = () => {
  // Mock data for the chart
  const chartData = [
    { month: 'Jan', views: 120, inquiries: 8, conversions: 2 },
    { month: 'Feb', views: 180, inquiries: 12, conversions: 3 },
    { month: 'Mar', views: 250, inquiries: 18, conversions: 4 },
    { month: 'Apr', views: 320, inquiries: 25, conversions: 6 },
    { month: 'May', views: 280, inquiries: 22, conversions: 5 },
    { month: 'Jun', views: 420, inquiries: 35, conversions: 8 }
  ];

  const maxViews = Math.max(...chartData.map(d => d.views));
  const maxInquiries = Math.max(...chartData.map(d => d.inquiries));

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
          Performance Overview
        </h3>
        <div className="flex space-x-2">
          <Badge variant="success" size="sm">
            <TrendingUp className="w-3 h-3 mr-1" />
            +15% this month
          </Badge>
        </div>
      </div>

      {/* Chart Legend */}
      <div className="flex items-center justify-center space-x-6 mb-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Property Views</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Inquiries</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Conversions</span>
        </div>
      </div>

      {/* Simple Bar Chart */}
      <div className="space-y-4">
        {chartData.map((data, index) => (
          <div key={data.month} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{data.month}</span>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  {data.views}
                </span>
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {data.inquiries}
                </span>
              </div>
            </div>
            
            {/* Views Bar */}
            <div className="relative">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(data.views / maxViews) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 w-8">{data.views}</span>
              </div>
            </div>

            {/* Inquiries Bar */}
            <div className="relative">
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(data.inquiries / maxInquiries) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 w-8">{data.inquiries}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Performance Metrics */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">24%</div>
            <div className="text-xs text-gray-500">Avg. Response Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">12%</div>
            <div className="text-xs text-gray-500">Conversion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">2.3d</div>
            <div className="text-xs text-gray-500">Avg. Response Time</div>
          </div>
        </div>
      </div>
    </Card>
  );
};