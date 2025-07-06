import React from 'react';
import { TrendingUp, Users, Award, MapPin, Eye, MessageCircle, Star, Building } from 'lucide-react';
import { StatCard } from '../ui/StatCard';
import { InteractiveGrid } from '../ui/InteractiveGrid';
import { RevealAnimation } from '../ui/RevealAnimation';
import { FloatingShape } from '../ui/FloatingElements';

interface Stat {
  icon: React.ComponentType<any>;
  value: string;
  label: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  color?: 'emerald' | 'blue' | 'purple' | 'orange';
}

interface StatsSectionProps {
  title?: string;
  subtitle?: string;
  stats?: Stat[];
  className?: string;
  animated?: boolean;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  title = "Our Impact in Numbers",
  subtitle = "Trusted by thousands of users across India",
  stats = [
    {
      icon: TrendingUp,
      value: '25K+',
      label: 'Properties Listed',
      change: { value: 15, type: 'increase' },
      color: 'emerald'
    },
    {
      icon: Users,
      value: '15K+',
      label: 'Active Users',
      change: { value: 8, type: 'increase' },
      color: 'blue'
    },
    {
      icon: Award,
      value: '5K+',
      label: 'Successful Deals',
      change: { value: 12, type: 'increase' },
      color: 'purple'
    },
    {
      icon: MapPin,
      value: '28+',
      label: 'States Covered',
      change: { value: 3, type: 'increase' },
      color: 'orange'
    }
  ],
  className,
  animated = true
}) => {
  return (
    <section className={`py-12 lg:py-20 bg-white relative overflow-hidden ${className}`}>
      {/* Background Elements */}
      <FloatingShape className="top-10 left-10" size="sm" color="emerald" opacity={0.05} />
      <FloatingShape className="bottom-10 right-10" size="md" color="blue" opacity={0.05} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <RevealAnimation animation="fade" delay={100}>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">
              {title}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        </RevealAnimation>

        {/* Stats Grid */}
        <InteractiveGrid
          items={stats.map((stat, index) => ({
            id: `stat-${index}`,
            content: (
              <StatCard
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                change={stat.change}
                color={stat.color}
                animated={animated}
              />
            )
          }))}
          columns={4}
          hoverEffect="glow"
          staggerAnimation={animated}
        />
      </div>
    </section>
  );
};