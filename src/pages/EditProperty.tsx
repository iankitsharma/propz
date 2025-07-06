import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { usePropertyStore } from '../store/propertyStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

interface PropertyForm {
  title: string;
  property_type: 'agricultural' | 'residential' | 'commercial' | 'industrial';
  listing_type: 'sale' | 'rent' | 'both';
  state: string;
  district: string;
  area: string;
  address: string;
  size: number;
  size_unit: 'acres' | 'sqft' | 'hectares';
  sale_price?: number;
  rent_price?: number;
  minimum_duration?: string;
  deposit_amount?: number;
  legal_status: 'clear' | 'disputed' | 'under_loan';
  water: boolean;
  electricity: boolean;
  road_access: boolean;
  soil_type?: string;
  availability: string;
  description: string;
  status: 'active' | 'sold' | 'rented' | 'inactive';
}

export const EditProperty: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const { properties, updateProperty, loading } = usePropertyStore();
  const [property, setProperty] = useState<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<PropertyForm>();

  const watchedListingType = watch('listing_type');

  useEffect(() => {
    const foundProperty = properties.find(p => p.id === id);
    if (foundProperty) {
      if (foundProperty.user_id !== user?.id) {
        toast.error('You can only edit your own properties');
        navigate('/my-listings');
        return;
      }
      
      setProperty(foundProperty);
      
      // Populate form with existing data
      setValue('title', foundProperty.title);
      setValue('property_type', foundProperty.property_type);
      setValue('listing_type', foundProperty.listing_type);
      setValue('state', foundProperty.location.state);
      setValue('district', foundProperty.location.district);
      setValue('area', foundProperty.location.area);
      setValue('address', foundProperty.location.address);
      setValue('size', foundProperty.size);
      setValue('size_unit', foundProperty.size_unit);
      setValue('sale_price', foundProperty.sale_price);
      setValue('rent_price', foundProperty.rent_price);
      setValue('minimum_duration', foundProperty.lease_terms?.minimum_duration);
      setValue('deposit_amount', foundProperty.lease_terms?.deposit_amount);
      setValue('legal_status', foundProperty.legal_status);
      setValue('water', foundProperty.infrastructure.water);
      setValue('electricity', foundProperty.infrastructure.electricity);
      setValue('road_access', foundProperty.infrastructure.road_access);
      setValue('soil_type', foundProperty.soil_type);
      setValue('availability', foundProperty.availability);
      setValue('description', foundProperty.description);
      setValue('status', foundProperty.status);
    } else {
      toast.error('Property not found');
      navigate('/my-listings');
    }
  }, [id, properties, user, navigate, setValue]);

  const onSubmit = async (data: PropertyForm) => {
    if (!id) return;
    
    try {
      await updateProperty(id, {
        title: data.title,
        property_type: data.property_type,
        listing_type: data.listing_type,
        location: {
          state: data.state,
          district: data.district,
          area: data.area,
          address: data.address
        },
        size: data.size,
        size_unit: data.size_unit,
        sale_price: data.sale_price,
        rent_price: data.rent_price,
        lease_terms: data.minimum_duration ? {
          minimum_duration: data.minimum_duration,
          deposit_amount: data.deposit_amount || 0
        } : undefined,
        legal_status: data.legal_status,
        infrastructure: {
          water: data.water,
          electricity: data.electricity,
          road_access: data.road_access
        },
        soil_type: data.soil_type,
        availability: data.availability,
        description: data.description,
        status: data.status
      });

      toast.success('Property updated successfully!');
      navigate('/my-listings');
    } catch (error) {
      toast.error('Failed to update property. Please try again.');
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/my-listings')}
              className="mr-4"
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to My Listings
            </Button>
            <Badge variant="gradient" size="md">
              Edit Property
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Property Details
          </h1>
          <p className="text-gray-600">
            Update your property information to attract more buyers
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Details */}
          <Card shadow="strong" className="mb-6">
            <h2 className="text-xl font-semibold mb-6">Basic Details</h2>
            
            <div className="space-y-6">
              <Input
                label="Property Title"
                placeholder="e.g., Premium Agricultural Land in Nashik"
                error={errors.title?.message}
                {...register('title', { required: 'Property title is required' })}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Type
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    {...register('property_type', { required: 'Property type is required' })}
                  >
                    <option value="agricultural">Agricultural Land</option>
                    <option value="residential">Residential Plot</option>
                    <option value="commercial">Commercial Land</option>
                    <option value="industrial">Industrial Land</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Listing Type
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    {...register('listing_type', { required: 'Listing type is required' })}
                  >
                    <option value="sale">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="both">Both Sale & Rent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    {...register('status', { required: 'Status is required' })}
                  >
                    <option value="active">Active</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Location Details */}
          <Card shadow="strong" className="mb-6">
            <h2 className="text-xl font-semibold mb-6">Location Details</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="State"
                  placeholder="e.g., Maharashtra"
                  error={errors.state?.message}
                  {...register('state', { required: 'State is required' })}
                />
                <Input
                  label="District"
                  placeholder="e.g., Nashik"
                  error={errors.district?.message}
                  {...register('district', { required: 'District is required' })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Area/Locality"
                  placeholder="e.g., Dindori"
                  error={errors.area?.message}
                  {...register('area', { required: 'Area is required' })}
                />
                <Input
                  label="Complete Address"
                  placeholder="Full address with pincode"
                  error={errors.address?.message}
                  {...register('address', { required: 'Address is required' })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Property Size"
                  type="number"
                  placeholder="e.g., 5"
                  error={errors.size?.message}
                  {...register('size', { 
                    required: 'Size is required',
                    min: { value: 0.1, message: 'Size must be greater than 0' }
                  })}
                />
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Size Unit
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    {...register('size_unit', { required: 'Size unit is required' })}
                  >
                    <option value="acres">Acres</option>
                    <option value="sqft">Square Feet</option>
                    <option value="hectares">Hectares</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Pricing Details */}
          <Card shadow="strong" className="mb-6">
            <h2 className="text-xl font-semibold mb-6">Pricing & Legal Information</h2>
            
            <div className="space-y-6">
              {(watchedListingType === 'sale' || watchedListingType === 'both') && (
                <Input
                  label="Sale Price (₹)"
                  type="number"
                  placeholder="e.g., 2500000"
                  error={errors.sale_price?.message}
                  {...register('sale_price', {
                    required: watchedListingType !== 'rent' ? 'Sale price is required' : false,
                    min: { value: 1, message: 'Price must be greater than 0' }
                  })}
                />
              )}

              {(watchedListingType === 'rent' || watchedListingType === 'both') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Monthly Rent (₹)"
                    type="number"
                    placeholder="e.g., 25000"
                    error={errors.rent_price?.message}
                    {...register('rent_price', {
                      required: watchedListingType !== 'sale' ? 'Rent price is required' : false,
                      min: { value: 1, message: 'Rent must be greater than 0' }
                    })}
                  />
                  <Input
                    label="Security Deposit (₹)"
                    type="number"
                    placeholder="e.g., 150000"
                    {...register('deposit_amount')}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Legal Status
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    {...register('legal_status', { required: 'Legal status is required' })}
                  >
                    <option value="clear">Clear Title</option>
                    <option value="disputed">Under Dispute</option>
                    <option value="under_loan">Under Loan</option>
                  </select>
                </div>
                <Input
                  label="Availability"
                  placeholder="e.g., Immediate, After 3 months"
                  {...register('availability')}
                />
              </div>

              {/* Infrastructure */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Available Infrastructure
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      {...register('water')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Water Supply</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      {...register('electricity')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Electricity</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      {...register('road_access')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Road Access</span>
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Description */}
          <Card shadow="strong" className="mb-6">
            <h2 className="text-xl font-semibold mb-6">Property Description</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Description
                </label>
                <textarea
                  rows={6}
                  placeholder="Describe your property in detail..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  {...register('description', { required: 'Description is required' })}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <Input
                label="Soil Type (Optional)"
                placeholder="e.g., Black cotton soil, Red soil"
                {...register('soil_type')}
              />
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/my-listings')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              className="shadow-strong"
              icon={<Save className="w-4 h-4" />}
            >
              {loading ? 'Updating...' : 'Update Property'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};