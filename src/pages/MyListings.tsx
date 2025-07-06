import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, MapPin, Calendar, IndianRupee, BarChart3, MessageCircle, Star, Filter, Search, Grid, List } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';
import { usePropertyStore } from '../store/propertyStore';
import { useRequirementStore } from '../store/requirementStore';
import toast from 'react-hot-toast';

export const MyListings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { properties, deleteProperty } = usePropertyStore();
  const { requirements, deleteRequirement } = useRequirementStore();
  const [activeTab, setActiveTab] = useState<'properties' | 'requirements'>('properties');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter user's own listings
  const userProperties = properties.filter(p => p.user_id === user?.id);
  const userRequirements = requirements.filter(r => r.user_id === user?.id);

  // Search functionality
  const filteredProperties = userProperties.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRequirements = userRequirements.filter(r =>
    r.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.location.area?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(id);
        toast.success('Property deleted successfully');
      } catch (error) {
        toast.error('Failed to delete property');
      }
    }
  };

  const handleDeleteRequirement = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this requirement?')) {
      try {
        await deleteRequirement(id);
        toast.success('Requirement deleted successfully');
      } catch (error) {
        toast.error('Failed to delete requirement');
      }
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)}Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)}L`;
    return `₹${(price / 1000).toFixed(0)}K`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
              <p className="text-gray-600">Manage your properties and requirements</p>
            </div>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <Button
                variant="outline"
                onClick={() => navigate('/post-property')}
                icon={<Plus className="w-4 h-4" />}
              >
                Add Property
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/post-requirement')}
                icon={<Plus className="w-4 h-4" />}
              >
                Post Requirement
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card hover className="text-center">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{userProperties.length}</div>
            <div className="text-sm text-gray-600">Properties Listed</div>
          </Card>
          
          <Card hover className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{userRequirements.length}</div>
            <div className="text-sm text-gray-600">Requirements Posted</div>
          </Card>
          
          <Card hover className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {userProperties.reduce((total, p) => total + p.views, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Views</div>
          </Card>
          
          <Card hover className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {userProperties.reduce((total, p) => total + p.inquiries, 0) + 
               userRequirements.reduce((total, r) => total + r.responses, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Inquiries</div>
          </Card>
        </div>

        {/* Tabs and Controls */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('properties')}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  activeTab === 'properties'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Properties ({userProperties.length})
              </button>
              <button
                onClick={() => setActiveTab('requirements')}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  activeTab === 'requirements'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Requirements ({userRequirements.length})
              </button>
            </div>

            {/* Search and View Controls */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === 'list'
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div>
            {filteredProperties.length === 0 ? (
              <Card className="text-center py-12">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Listed</h3>
                <p className="text-gray-600 mb-6">Start by listing your first property to reach potential buyers.</p>
                <Button
                  variant="primary"
                  onClick={() => navigate('/post-property')}
                  icon={<Plus className="w-4 h-4" />}
                >
                  List Property
                </Button>
              </Card>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {filteredProperties.map((property) => (
                  <Card key={property.id} hover className="overflow-hidden">
                    {viewMode === 'grid' ? (
                      <>
                        {/* Grid View */}
                        <div className="relative h-48">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge variant={property.listing_type === 'sale' ? 'primary' : 'secondary'}>
                              {property.listing_type === 'sale' ? 'For Sale' : property.listing_type === 'rent' ? 'For Rent' : 'Sale/Rent'}
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4 flex space-x-2">
                            {property.featured && (
                              <Badge variant="warning" size="sm">Featured</Badge>
                            )}
                            <Badge variant={property.status === 'active' ? 'success' : 'gray'} size="sm">
                              {property.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            {property.title}
                          </h3>
                          
                          <div className="flex items-center text-gray-600 mb-3">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="text-sm">{property.location.area}, {property.location.district}</span>
                          </div>

                          <div className="flex justify-between items-center mb-4">
                            <div>
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
                            </div>
                            <div className="text-sm text-gray-500">
                              {property.size} {property.size_unit}
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {property.views}
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {property.inquiries}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(property.created_at).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/edit-property/${property.id}`)}
                              icon={<Edit className="w-4 h-4" />}
                              className="flex-1"
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteProperty(property.id)}
                              icon={<Trash2 className="w-4 h-4" />}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* List View */}
                        <div className="flex">
                          <div className="relative w-48 h-32 flex-shrink-0">
                            <img
                              src={property.images[0]}
                              alt={property.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge variant={property.listing_type === 'sale' ? 'primary' : 'secondary'} size="sm">
                                {property.listing_type === 'sale' ? 'Sale' : property.listing_type === 'rent' ? 'Rent' : 'Both'}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex-1 p-6">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                {property.title}
                              </h3>
                              <div className="flex space-x-2">
                                {property.featured && (
                                  <Badge variant="warning" size="sm">Featured</Badge>
                                )}
                                <Badge variant={property.status === 'active' ? 'success' : 'gray'} size="sm">
                                  {property.status}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="flex items-center text-gray-600 mb-3">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span className="text-sm">{property.location.area}, {property.location.district}</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-6">
                                <div>
                                  {property.sale_price && (
                                    <div className="text-lg font-bold text-emerald-600">
                                      {formatPrice(property.sale_price)}
                                    </div>
                                  )}
                                  {property.rent_price && (
                                    <div className="text-base font-semibold text-blue-600">
                                      ₹{(property.rent_price / 1000).toFixed(0)}K/month
                                    </div>
                                  )}
                                </div>
                                
                                <div className="text-sm text-gray-500">
                                  {property.size} {property.size_unit}
                                </div>
                                
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <Eye className="w-4 h-4 mr-1" />
                                    {property.views}
                                  </div>
                                  <div className="flex items-center">
                                    <MessageCircle className="w-4 h-4 mr-1" />
                                    {property.inquiries}
                                  </div>
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => navigate(`/edit-property/${property.id}`)}
                                  icon={<Edit className="w-4 h-4" />}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteProperty(property.id)}
                                  icon={<Trash2 className="w-4 h-4" />}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Requirements Tab */}
        {activeTab === 'requirements' && (
          <div>
            {filteredRequirements.length === 0 ? (
              <Card className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Requirements Posted</h3>
                <p className="text-gray-600 mb-6">Post your first requirement to connect with property owners.</p>
                <Button
                  variant="primary"
                  onClick={() => navigate('/post-requirement')}
                  icon={<Plus className="w-4 h-4" />}
                >
                  Post Requirement
                </Button>
              </Card>
            ) : (
              <div className="space-y-6">
                {filteredRequirements.map((requirement) => (
                  <Card key={requirement.id} hover>
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {requirement.purpose}
                          </h3>
                          <div className="flex space-x-2">
                            <Badge variant={requirement.status === 'active' ? 'success' : requirement.status === 'fulfilled' ? 'primary' : 'gray'}>
                              {requirement.status}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-gray-600">Transaction</div>
                            <div className="font-medium capitalize">{requirement.transaction_type}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Land Type</div>
                            <div className="font-medium capitalize">{requirement.land_type}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Location</div>
                            <div className="font-medium">{requirement.location.district}, {requirement.location.state}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">Size</div>
                            <div className="font-medium">
                              {requirement.size_range.min}-{requirement.size_range.max} {requirement.size_range.unit}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {requirement.responses} responses
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(requirement.created_at).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/edit-requirement/${requirement.id}`)}
                              icon={<Edit className="w-4 h-4" />}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteRequirement(requirement.id)}
                              icon={<Trash2 className="w-4 h-4" />}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};