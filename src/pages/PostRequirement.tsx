import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Search, MapPin, Target, ArrowLeft, Send, CheckCircle, Info, Sparkles } from 'lucide-react';
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
  water: boolean;
  electricity: boolean;
  road_access: boolean;
  soil_quality: boolean;
  proximity_highway: boolean;
  proximity_city: boolean;
}

export const PostRequirement: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addRequirement, loading } = useRequirementStore();
  const [currentStep, setCurrentStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RequirementForm>();

  const watchedTransactionType = watch('transaction_type');

  const onSubmit = async (data: RequirementForm) => {
    try {
      const specificNeeds = [];
      if (data.water) specificNeeds.push('Water Access');
      if (data.electricity) specificNeeds.push('Electricity Connection');
      if (data.road_access) specificNeeds.push('Good Road Access');
      if (data.soil_quality) specificNeeds.push('Good Soil Quality');
      if (data.proximity_highway) specificNeeds.push('Near Highway');
      if (data.proximity_city) specificNeeds.push('Near City/Town');
      
      await addRequirement({
        user_id: user?.id || '1',
        transaction_type: data.transaction_type,
        land_type: data.land_type,
        purpose: data.purpose,
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
        status: 'active'
      });
      
      toast.success('🎉 Requirement posted successfully! Sellers will contact you soon.');
      navigate('/requirements');
    } catch (error) {
      toast.error('Failed to post requirement. Please try again.');
    }
  };

  const steps = [
    { number: 1, title: 'Basic Requirements', icon: <Target className="w-5 h-5" /> },
    { number: 2, title: 'Location & Budget', icon: <MapPin className="w-5 h-5" /> },
    { number: 3, title: 'Preferences & Details', icon: <Sparkles className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/requirements')}
              className="mr-4"
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Requirements
            </Button>
            <Badge variant="gradient" size="md">
              <Search className="w-4 h-4 mr-2" />
              Post Requirement
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post Your Land Requirement
          </h1>
          <p className="text-gray-600">
            Tell us what you're looking for and let verified sellers come to you
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= step.number
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="ml-2 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-emerald-600' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-12 sm:w-24 h-0.5 ml-4 ${
                    currentStep > step.number ? 'bg-emerald-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Basic Requirements */}
          {currentStep === 1 && (
            <Card shadow="strong" className="mb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2 text-emerald-600" />
                What are you looking for?
              </h2>
              
              <div className="space-y-6">
                <Input
                  label="Purpose/Title"
                  placeholder="e.g., Looking for Agricultural Land for Organic Farming"
                  error={errors.purpose?.message}
                  {...register('purpose', { required: 'Purpose is required' })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Transaction Type
                    </label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      {...register('transaction_type', { required: 'Transaction type is required' })}
                    >
                      <option value="">Select transaction type</option>
                      <option value="buy">Buy</option>
                      <option value="rent">Rent</option>
                      <option value="lease">Lease</option>
                    </select>
                    {errors.transaction_type && (
                      <p className="mt-2 text-sm text-red-600">{errors.transaction_type.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Land Type
                    </label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      {...register('land_type', { required: 'Land type is required' })}
                    >
                      <option value="">Select land type</option>
                      <option value="agricultural">Agricultural Land</option>
                      <option value="residential">Residential Plot</option>
                      <option value="commercial">Commercial Land</option>
                      <option value="industrial">Industrial Land</option>
                    </select>
                    {errors.land_type && (
                      <p className="mt-2 text-sm text-red-600">{errors.land_type.message}</p>
                    )}
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
                      <option value="">Unit</option>
                      <option value="acres">Acres</option>
                      <option value="sqft">Sq Ft</option>
                      <option value="hectares">Hectares</option>
                    </select>
                  </div>
                  {(errors.size_min || errors.size_max || errors.size_unit) && (
                    <p className="mt-2 text-sm text-red-600">Please fill all size fields</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setCurrentStep(2)}
                  disabled={!watch('purpose') || !watch('transaction_type') || !watch('land_type') || !watch('size_min') || !watch('size_max') || !watch('size_unit')}
                >
                  Next: Location & Budget
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Location & Budget */}
          {currentStep === 2 && (
            <Card shadow="strong" className="mb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                Location & Budget Preferences
              </h2>
              
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
                        <option value="">Duration</option>
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

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setCurrentStep(3)}
                  disabled={!watch('state') || !watch('district') || !watch('timeline')}
                >
                  Next: Preferences
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Preferences & Details */}
          {currentStep === 3 && (
            <Card shadow="strong" className="mb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-emerald-600" />
                Specific Preferences
              </h2>
              
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
                    placeholder="Describe your specific requirements, intended use, any special preferences, or questions you have..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    {...register('description', { required: 'Description is required' })}
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  className="shadow-strong"
                  icon={<Send className="w-4 h-4" />}
                >
                  {loading ? 'Posting...' : 'Post Requirement'}
                </Button>
              </div>
            </Card>
          )}
        </form>

        {/* Help Card */}
        <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-100">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How it works</h3>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• Post your detailed land requirement</li>
                <li>• Verified property owners will contact you directly</li>
                <li>• Review proposals and negotiate the best deal</li>
                <li>• Complete your transaction securely</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};