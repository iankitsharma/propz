import React from 'react';
import { MapPin, Eye, MessageCircle, Calendar, Ruler, Heart, Phone, Mail, Star, CheckCircle, Maximize, Droplets, Zap, Map } from 'lucide-react';
import { Property } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface EnhancedPropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
}

export const EnhancedPropertyCard: React.FC<EnhancedPropertyCardProps> = ({ 
  property, 
  viewMode = 'grid' 
}) => {
  const { isAuthenticated } = useAuthStore();

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    return `₹${(price / 1000).toFixed(0)}K`;
  };

  const formatSize = (size: number, unit: string) => {
    return `${size} ${unit}`;
  };

  const getListingTypeBadge = () => {
    switch (property.listing_type) {
      case 'sale':
        return <Badge variant="primary">For Sale</Badge>;
      case 'rent':
        return <Badge variant="secondary">For Rent</Badge>;
      case 'both':
        return <Badge variant="success">Sale/Rent</Badge>;
      default:
        return null;
    }
  };

  if (viewMode === 'list') {
    return (
      <Card hover className="overflow-hidden" padding="none">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className="relative md:w-80 h-48 md:h-auto bg-gray-200 flex-shrink-0">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              {getListingTypeBadge()}
            </div>
            {property.featured && (
              <Badge className="absolute top-4 right-4" variant="warning">
                Featured
              </Badge>
            )}
            <button className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
              <Heart className="w-4 h-4 text-gray-400" />
            </button>
            <div className="absolute bottom-4 left-4 flex items-center bg-white rounded-full px-3 py-1 shadow-sm">
              <Eye className="w-3 h-3 text-gray-500 mr-1" />
              <span className="text-xs text-gray-600">{property.views}</span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 mr-2">
                    {property.title}
                  </h3>
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.location.area}, {property.location.district}</span>
                </div>
                <div className="flex items-center text-gray-600 mb-3">
                  <Maximize className="w-4 h-4 mr-1" />
                  <span className="text-sm">{formatSize(property.size, property.size_unit)}</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right ml-4">
                {property.sale_price && (
                  <div className="text-2xl font-bold text-emerald-600">
                    {formatPrice(property.sale_price)}
                  </div>
                )}
                {property.rent_price && (
                  <div className="text-lg font-semibold text-blue-600">
                    ₹{(property.rent_price / 1000).toFixed(0)}K/month
                  </div>
                )}
                {property.lease_terms?.deposit_amount && (
                  <div className="text-sm text-gray-500">
                    Deposit: ₹{(property.lease_terms.deposit_amount / 1000).toFixed(0)}K
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="gray" size="sm">{property.property_type}</Badge>
              {property.infrastructure.water && (
                <Badge variant="primary" size="sm">
                  <Droplets className="w-3 h-3 mr-1" />
                  Water
                </Badge>
              )}
              {property.infrastructure.electricity && (
                <Badge variant="secondary" size="sm">
                  <Zap className="w-3 h-3 mr-1" />
                  Electricity
                </Badge>
              )}
              {property.infrastructure.road_access && (
                <Badge variant="success" size="sm">
                  <Map className="w-3 h-3 mr-1" />
                  Road Access
                </Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {property.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Property Owner</div>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    <span className="text-xs text-gray-500">4.8</span>
                    <span className="text-xs text-gray-400 ml-2">
                      {new Date(property.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button variant="primary" size="sm">
                  <Mail className="w-4 h-4 mr-1" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card hover className="overflow-hidden" padding="none">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          {getListingTypeBadge()}
        </div>
        {property.featured && (
          <Badge className="absolute top-4 right-4" variant="warning">
            Featured
          </Badge>
        )}
        <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
          <Heart className="w-4 h-4 text-gray-400" />
        </button>
        <div className="absolute bottom-4 left-4 flex items-center bg-white rounded-full px-3 py-1 shadow-sm">
          <Eye className="w-3 h-3 text-gray-500 mr-1" />
          <span className="text-xs text-gray-600">{property.views}</span>
        </div>
      </div>

      {/* Content */}
      <Link to={`/property/${property.id}`} className="p-4 block">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
            {property.title}
          </h3>
          <CheckCircle className="w-5 h-5 text-emerald-500 ml-2 flex-shrink-0" />
        </div>

        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location.area}, {property.location.district}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <Maximize className="w-4 h-4 mr-1" />
          <span className="text-sm">{formatSize(property.size, property.size_unit)}</span>
        </div>

        {/* Price */}
        <div className="mb-3">
          {property.sale_price && (
            <div className="text-xl font-bold text-emerald-600">
              {formatPrice(property.sale_price)}
            </div>
          )}
          {property.rent_price && (
            <div className="text-lg font-semibold text-blue-600">
              ₹{(property.rent_price / 1000).toFixed(0)}K/month
            </div>
          )}
          {property.lease_terms?.deposit_amount && (
            <div className="text-sm text-gray-500">
              Deposit: ₹{(property.lease_terms.deposit_amount / 1000).toFixed(0)}K
            </div>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="gray" size="sm">{property.property_type}</Badge>
          {property.infrastructure.water && (
            <Badge variant="primary" size="sm">Water</Badge>
          )}
          {property.infrastructure.electricity && (
            <Badge variant="secondary" size="sm">Electricity</Badge>
          )}
          {property.infrastructure.road_access && (
            <Badge variant="success" size="sm">Road</Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-4">
          <div className="flex items-center">
            <div>
              {isAuthenticated ? (
                <>
                  <div className="text-sm font-medium text-gray-900">Property Owner</div>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    <span className="text-xs text-gray-500">4.8</span>
                    <span className="text-xs text-gray-400 ml-2">
                      {new Date(property.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm font-medium text-gray-500">Sign In Required</div>
                  <div className="text-xs text-gray-400">
                    Login to see owner details
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="px-4 pb-4">
        <div className="flex space-x-2">
          {isAuthenticated ? (
            <>
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-1" />
                Call
              </Button>
              <Button variant="primary" size="sm">
                <Mail className="w-4 h-4 mr-1" />
                Message
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" as={Link} to="/login">
                <Phone className="w-4 h-4 mr-1" />
                Login
              </Button>
              <Button variant="primary" size="sm" as={Link} to="/register">
                <Mail className="w-4 h-4 mr-1" />
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};