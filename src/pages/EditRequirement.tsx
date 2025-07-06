import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useRequirementStore } from '../store/requirementStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

interface RequirementForm {
  purpose: string;
  transaction_type: 'buy' | 'rent' | 'lease';
  land_type: 'agricultural' | 'residential' | 'commercial' | 'industrial';
  state: string;
  district: string;
  area?: string;
  size_min: number;
  size_max: number;
  size_unit: 'acres' | 'sqft' | 'hectares';
  budget_min?: number;
  budget_max?: number;
  rent_min?: number;
  rent_max?: number;
  rent_duration?: 'monthly' | 'yearly';
  timeline: string;
  description: string;
  status: 'active' | 'fulfilled' | 'closed';
  water: boolean;
  electricity: boolean;
  road_access: boolean;
  soil_quality: boolean;
  proximity_highway: boolean;
  proximity_city: boolean;
}

export const EditRequirement: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const { requirements, updateRequirement, loading } = useRequirementStore();
  const [requirement, setRequirement] = useState<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<RequirementForm>();

  const watchedTransactionType = watch('transaction_type');

  useEffect(() => {
    const foundRequirement = requirements.find(r => r.id === id);
    if (foundRequirement) {
      if (foundRequirement.user_id !== user?.id) {
        toast.error('You can only edit your own requirements');
        navigate('/my-listings');
        return;
      }
      
      setRequirement(foundRequirement);
      
      // Populate form with existing data
      setValue('purpose', foundRequirement.purpose);
      setValue('transaction_type', foundRequirement.transaction_type);
      setValue('land_type', foundRequirement.land_type);
      setValue('state', foundRequirement.location.state);
      setValue('district', foundRequirement.location.district);
      setValue('area', foundRequirement.location.area);
      setValue('size_min', foundRequirement.size_range.min);
      setValue('size_max', foundRequirement.size_range.max);
      setValue('size_unit', foundRequirement.size_range.unit);
      setValue('budget_min', foundRequirement.budget_range?.min);
      setValue('budget_max', foundRequirement.budget_range?.max);
      setValue('rent_min', foundRequirement.rent_budget?.min);
      setValue('rent_max', foundRequirement.rent_budget?.max);
      setValue('rent_duration', foundRequirement.rent_budget?.duration);
      setValue('timeline', foundRequirement.timeline);
      setValue('description', foundRequirement.description);
      setValue('status', foundRequirement.status);
      
      // Set specific needs checkboxes
      setValue('water', foundRequirement.specific_needs.includes('Water Access'));
      setValue('electricity', foundRequirement.specific_needs.includes('Electricity Connection'));
      setValue('road_access', foundRequirement.specific_needs.includes('Good Road Access'));
      setValue('soil_quality', foundRequirement.specific_needs.includes('Good Soil Quality'));
      setValue('proximity_highway', foundRequirement.specific_needs.includes('Near Highway'));
      setValue('proximity_city', foundRequirement.specific_needs.includes('Near City/Town'));
    } else {
      toast.error('Requirement not found');
      navigate('/my-listings');
    }
  }, [id, requirements, user, navigate, setValue]);

  const onSubmit = async (data: RequirementForm) => {
    if (!id) return;
    
    try {
      const specificNeeds = [];
      if (data.water) specificNeeds.push('Water Access');
      if (data.electricity) specificNeeds.push('Electricity Connection');
      if (data.road_access) specificNeeds.push('Good Road Access');
      if (data.soil_quality) specificNeeds.push('Good Soil Quality');
      if (data.proximity_highway) specificNeeds.push('Near Highway');
      if (data.proximity_city) specificNeeds.push('Near City/Town');
      
      await updateRequirement(id, {
        purpose: data.purpose,
        transaction_type: data.transaction_type,
        land_type: data.land_type,
        location: {
          state: data.state,
          district: data.district,
          area: data.area
        },
        size_range: {
          min: data.size_min,
          max: data.size_max,
          unit: data.size_unit
        },
        budget_range: data.transaction_type === 'buy' ? {
          min: data.budget_min || 0,
          max: data.budget_max || 0
        } : undefined,
        rent_budget: data.transaction_type !== 'buy' ? {
          min: data.rent_min || 0,
          max: data.rent_max || 0,
          duration: data.rent_duration || 'monthly'
        } : undefined,
        timeline: data.timeline,
        specific_needs: specificNeeds,
        description: data.description,
        status: data.status
      });

      toast.success('Requirement updated successfully!');
      navigate('/my-listings');
    } catch (error) {
      toast.error('Failed to update requirement. Please try again.');
    }
  };

  if (!requirement) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading requirement details...</p>
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
              Edit Requirement
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Edit Land Requirement
          </h1>
          <p className="text-gray-600">
            Update your requirements to get better matches
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Basic Requirements */}
          <Card shadow="strong" className="mb-6">
            <h2 className="text-xl font-semibold mb-6">Basic Requirements</h2>
            
            <div className="space-y-6">
              <Input
                label="Purpose/Title"
                placeholder="e.g., Looking for Agricultural Land for Organic Farming"
                error={errors.purpose?.message}
                {...register('purpose', { required: 'Purpose is required' })}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Transaction Type
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    {...register('transaction_type', { required: 'Transaction type is required' })}
                  >
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                    <option value="lease">Lease</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Land Type
                  </label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    {...register('land_type', { required: 'Land type is required' })}
                  >
                    <option value="agricultural">Agricultural Land</option>
                    <option value="residential">Residential Plot</option>
                    <option value="commercial">Commercial Land</option>
                    <option value="industrial">Industrial Land</option>
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
                    <option value="fulfilled">Fulfilled</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Size Range
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Input
                    placeholder="Min size"
                    type="number"
                    error={errors.size_min?.message}
                    {...register('size_min', { 
                      required: 'Minimum size is required',
                      min: { value: 0.1, message: 'Size must be greater than 0' }
                    })}
                  />
                  <Input
                    placeholder="Max size"
                    type="number"
                    error={errors.size_max?.message}
                    {...register('size_max', { 
                      required: 'Maximum size is required',
                      min: { value: 0.1, message: 'Size must be greater than 0' }
                    })}
                  />
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    {...register('size_unit', { required: 'Size unit is required' })}
                  >
                    <option value="acres">Acres</option>
                    <option value="sqft">Sq Ft</option>
                    <option value="hectares">Hectares</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Location & Budget */}
          <Card shadow="strong" className="mb-6">
            <h2 className="text-xl font-semibold mb-6">Location & Budget</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <Input
                  label="Specific Area (Optional)"
                  placeholder="e.g., Dindori"
                  {...register('area')}
                />
              </div>

              {/* Budget based on transaction type */}
              {watchedTransactionType === 'buy' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget Range (₹)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      placeholder="Minimum budget"
                      type="number"
                      error={errors.budget_min?.message}
                      {...register('budget_min', { 
                        required: 'Minimum budget is required',
                        min: { value: 1, message: 'Budget must be greater than 0' }
                      })}
                    />
                    <Input
                      placeholder="Maximum budget"
                      type="number"
                      error={errors.budget_max?.message}
                      {...register('budget_max', { 
                        required: 'Maximum budget is required',
                        min: { value: 1, message: 'Budget must be greater than 0' }
                      })}
                    />
                  </div>
                </div>
              )}

              {(watchedTransactionType === 'rent' || watchedTransactionType === 'lease') && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rent Budget (₹)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Min rent"
                      type="number"
                      error={errors.rent_min?.message}
                      {...register('rent_min', { 
                        required: 'Minimum rent is required',
                        min: { value: 1, message: 'Rent must be greater than 0' }
                      })}
                    />
                    <Input
                      placeholder="Max rent"
                      type="number"
                      error={errors.rent_max?.message}
                      {...register('rent_max', { 
                        required: 'Maximum rent is required',
                        min: { value: 1, message: 'Rent must be greater than 0' }
                      })}
                    />
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      {...register('rent_duration', { required: 'Duration is required' })}
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                </div>
              )}

              <Input
                label="Timeline"
                placeholder="e.g., Immediate, Within 3 months, Flexible"
                error={errors.timeline?.message}
                {...register('timeline', { required: 'Timeline is required' })}
              />
            </div>
          </Card>

          {/* Preferences & Details */}
          <Card shadow="strong" className="mb-6">
            <h2 className="text-xl font-semibold mb-6">Specific Preferences</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Required Infrastructure & Features
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      {...register('water')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Water Access</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      {...register('electricity')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Electricity Connection</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      {...register('road_access')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Good Road Access</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      {...register('soil_quality')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Good Soil Quality</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      {...register('proximity_highway')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Near Highway</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      {...register('proximity_city')}
                    />
                    <span className="ml-2 text-sm text-gray-700">Near City/Town</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Details & Specific Requirements
                </label>
                <textarea
                  rows={6}
                  placeholder="Describe your specific requirements..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  {...register('description', { required: 'Description is required' })}
                />
                {errors.description && (
                  <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
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
              {loading ? 'Updating...' : 'Update Requirement'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};