import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Eye, MessageCircle, Heart, Share2, Calendar, Ruler, Clock, User, Check, AlertCircle, Phone, Mail, Star, ArrowLeft, ExternalLink, Droplets, Zap, Map, Maximize, Shield, LogIn, UserPlus } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { GlassCard } from '../components/ui/GlassCard';
import { usePropertyStore } from '../store/propertyStore';
import { useAuthStore } from '../store/authStore';
import { useSupabase } from '../hooks/useSupabase';
import toast from 'react-hot-toast';

export const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { properties } = usePropertyStore();
  const { isAuthenticated, user } = useAuthStore();
  const { trackUserActivity } = useSupabase();
  
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [contactInfo, setContactInfo] = useState({ visible: false, loading: false });
  
  useEffect(() => {
    if (id) {
      // Find property in store
      const foundProperty = properties.find(p => p.id === id);
      if (foundProperty) {
        setProperty(foundProperty);
        setLoading(false);
        
        // Track view activity
        if (isAuthenticated && user?.id) {
          trackUserActivity(foundProperty.id, 'view');
        }
      } else {
        toast.error('Property not found');
        navigate('/properties');
      }
    }
  }, [id, properties, navigate, isAuthenticated, user, trackUserActivity]);
  
  const handleNextImage = () => {
    if (!property) return;
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };
  
  const handlePrevImage = () => {
    if (!property) return;
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1));
  };
  
  const toggleLike = () => {
    if (!isAuthenticated) {
      toast.error('Please login to save this property');
      return;
    }
    
    setIsLiked(!isLiked);
    if (!isLiked) {
      toast.success('Property added to favorites');
      trackUserActivity(property.id, 'favorite');
    } else {
      toast.success('Property removed from favorites');
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };
  
  const handleContact = () => {
    if (!isAuthenticated) {
      toast.error('Please login to contact the owner');
      return;
    }
    
    setContactInfo(prev => ({ ...prev, visible: true }));
    
    // Track inquiry activity
    if (!contactInfo.visible) {
      trackUserActivity(property.id, 'inquiry');
    }
  };
  
  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    return `₹${(price / 1000).toFixed(0)}K`;
  };
  
  if (loading || !property) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-32 sm:h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/properties')}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Properties
          </Button>
        </div>
        
        {/* Property Title Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-gray-600 text-sm sm:text-base">
              <MapPin className="w-5 h-5 mr-1 text-emerald-600" />
              <span className="lg:text-lg line-clamp-2">
                {property.location.address}, {property.location.area}, {property.location.district}
              </span>
            </div>
          </div>
          
          <div className="mt-4 lg:mt-0">
            <div className="flex flex-col items-end">
              {property.sale_price && (
                <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-1">
                  {formatPrice(property.sale_price)}
                </div>
              )}
              {property.rent_price && (
                <div className="text-xl font-semibold text-blue-600">
                  ₹{(property.rent_price / 1000).toFixed(0)}K/month
                </div>
              )}
              <div className="flex items-center mt-2">
                <Badge variant={property.status === 'active' ? 'success' : 'gray'} size="md">
                  {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                </Badge> 
                {property.featured && (
                  <Badge variant="warning" size="md" className="ml-2">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden p-0" shadow="md">
              <div className="relative h-64 sm:h-96 bg-gray-200">
                {property.images.length > 0 ? (
                  <>
                    <img
                      src={property.images[currentImageIndex]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePrevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-800" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all duration-200 shadow-md"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-800" />
                        </button>
                        
                        {/* Image indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                          {property.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImageIndex ? 'bg-white w-4' : 'bg-white/60'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                    
                    {/* Action buttons */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={toggleLike}
                        className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200"
                      >
                        <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-800'}`} />
                      </button>
                      <button
                        onClick={handleShare}
                        className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-all duration-200"
                      >
                        <Share2 className="w-5 h-5 text-gray-800" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gray-200">
                    <div className="text-gray-400 text-center">
                      <img
                        src="https://via.placeholder.com/800x600?text=No+Image+Available"
                        alt="No image available"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Thumbnail navigation - for desktop */}
              {property.images.length > 1 && (
                <div className="hidden sm:grid grid-cols-6 gap-2 p-2">
                  {property.images.map((image, index) => (
                    <div
                      key={index}
                      className={`h-16 cursor-pointer rounded overflow-hidden border-2 ${
                        index === currentImageIndex
                          ? 'border-emerald-500 shadow-md'
                          : 'border-transparent'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </Card>
            
            {/* Property Stats */}
            <Card className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
              <div className="text-center p-4">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Maximize className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">{property.size} {property.size_unit}</div>
                <div className="text-xs text-gray-600">Land Size</div>
              </div>
              
              <div className="text-center p-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">{property.location.district}</div>
                <div className="text-xs text-gray-600">Location</div>
              </div>
              
              <div className="text-center p-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-lg font-bold text-gray-900">{property.availability}</div>
                <div className="text-xs text-gray-600">Availability</div>
              </div>
              
              <div className="text-center p-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-5 h-5 text-orange-600" />
                </div>
                <div className="text-lg font-bold text-gray-900 capitalize">{property.legal_status.replace('_', ' ')}</div>
                <div className="text-xs text-gray-600">Legal Status</div>
              </div>
            </Card>
            
            {/* Property Description */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
              
              {property.soil_type && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-md font-semibold text-gray-900 mb-2">Soil Type</h3>
                  <p className="text-gray-700">{property.soil_type}</p>
                </div>
              )}
            </Card>
            
            {/* Infrastructure & Features */}
            <Card>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Infrastructure & Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-md font-semibold text-gray-900 mb-3">Infrastructure</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                        property.infrastructure.water ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {property.infrastructure.water ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Water Supply</div>
                        {property.infrastructure.water && (
                          <div className="text-xs text-gray-600">Available on property</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                        property.infrastructure.electricity ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {property.infrastructure.electricity ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Electricity</div>
                        {property.infrastructure.electricity && (
                          <div className="text-xs text-gray-600">Connection available</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                        property.infrastructure.road_access ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {property.infrastructure.road_access ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Road Access</div>
                        {property.infrastructure.road_access && (
                          <div className="text-xs text-gray-600">Good connectivity</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-md font-semibold text-gray-900 mb-3">Property Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Badge variant="primary" size="sm" className="mr-2">
                        <Droplets className="w-3 h-3 mr-1" />
                        {property.infrastructure.water ? 'Water Available' : 'No Water Supply'}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="secondary" size="sm" className="mr-2">
                        <Zap className="w-3 h-3 mr-1" />
                        {property.infrastructure.electricity ? 'Electricity Available' : 'No Electricity'}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="success" size="sm" className="mr-2">
                        <Map className="w-3 h-3 mr-1" />
                        {property.infrastructure.road_access ? 'Good Road Access' : 'Limited Road Access'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Right Column - Contact and Maps */}
          <div className="space-y-6">
            {/* Contact Card */}
            <GlassCard intensity="medium" hover className="relative">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-400 rounded-full opacity-5 transform translate-x-5 -translate-y-5"></div>
              
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-emerald-600" />
                Contact Owner
              </h3>
              
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                  <User className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">Property Owner</div>
                  <div className="text-sm text-emerald-600 flex items-center">
                    <Shield className="w-4 h-4 mr-1" />
                    Listed on Platform
                  </div>
                </div>
              </div>
              
              {isAuthenticated ? (
                <>
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{property.views} people viewed</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-500" />
                        <span>Listed {new Date(property.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MessageCircle className="w-4 h-4 mr-1 text-gray-500" />
                      <span>Connect directly through our platform</span>
                    </div>
                  </div>
                  
                  {contactInfo.visible ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-emerald-600" />
                          Call Owner
                        </h4>
                        <a 
                          href="tel:+918567123456" 
                          className="text-lg font-semibold text-emerald-600 flex items-center"
                        >
                          +91 8567 123456
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </div>
                      
                      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                        <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-emerald-600" />
                          Email Owner
                        </h4>
                        <a 
                          href="mailto:owner@example.com" 
                          className="text-base font-semibold text-emerald-600 flex items-center"
                        >
                          owner@example.com
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </div>
                      
                      <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Note:</strong> All negotiations and agreements are directly between you and the property owner. LandConnect is a marketplace platform only.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <AnimatedButton
                        variant="primary"
                        size="lg"
                        className="w-full"
                        glow
                        onClick={handleContact}
                        icon={<Phone className="w-5 h-5" />}
                      >
                        Contact Owner
                      </AnimatedButton>
                      
                      <AnimatedButton
                        variant="outline"
                        size="lg"
                        className="w-full"
                        onClick={handleContact}
                        icon={<MessageCircle className="w-5 h-5" />}
                      >
                        Send Message
                      </AnimatedButton>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-6">
                  <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">Owner Contact Hidden</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Sign in to view owner details and contact information
                    </p>
                  </div>
                
                  <div className="grid grid-cols-2 gap-3">
                    <AnimatedButton 
                      variant="outline" 
                      as={Link} 
                      to="/login"
                      icon={<LogIn className="w-4 h-4" />}
                    >
                      Sign In
                    </AnimatedButton>
                    
                    <AnimatedButton 
                      variant="primary" 
                      as={Link} 
                      to="/register"
                      glow
                      icon={<UserPlus className="w-4 h-4" />}
                    >
                      Register
                    </AnimatedButton>
                  </div>
                </div>
              )}
            </GlassCard>
            
            {/* Location Map */}
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                Location
              </h3>
              
              {/* Map placeholder - in a real app, this would be a Google Maps or Mapbox integration */}
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden mb-4 relative">
                <img 
                  src="https://maps.googleapis.com/maps/api/staticmap?center=Mumbai,India&zoom=12&size=600x400&key=YOUR_API_KEY" 
                  alt="Map Location"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-3 rounded-lg shadow-md">
                    <p className="text-sm font-medium">Map integration coming soon</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Address</div>
                    <div className="text-gray-600 text-sm">{property.location.address}</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Map className="w-5 h-5 text-gray-500 mr-2 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Nearby</div>
                    <div className="text-gray-600 text-sm">
                      Schools, Hospitals, Markets nearby
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Similar Properties */}
            <Card>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Similar Properties</h3>
              <p className="text-gray-600 text-sm">
                Looking for alternatives? Check out these similar properties.
              </p>
              
              <div className="mt-4 space-y-4">
                {properties
                  .filter(p => p.id !== property.id && p.property_type === property.property_type)
                  .slice(0, 2)
                  .map((p) => (
                    <Link key={p.id} to={`/property/${p.id}`} className="block group">
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                            {p.title}
                          </h4>
                          <p className="text-xs text-gray-600 mb-1">
                            {p.location.area}, {p.location.district}
                          </p>
                          <div className="text-sm font-semibold text-emerald-600">
                            {p.sale_price ? formatPrice(p.sale_price) : `₹${(p.rent_price / 1000).toFixed(0)}K/month`}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                
                <AnimatedButton
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/properties')}
                  className="w-full"
                >
                  View More Properties
                </AnimatedButton>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};