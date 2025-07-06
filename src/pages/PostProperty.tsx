import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MapPin, Home, Upload, Save, Eye, ArrowLeft, Camera, FileText, CheckCircle, Info, AlertCircle } from 'lucide-react';
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
}

export const PostProperty: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addProperty, loading } = usePropertyStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<PropertyForm>();

  const watchedListingType = watch('listing_type');

  const onSubmit = async (data: PropertyForm) => {
    try {
      await addProperty({
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
        images: uploadedImages.length > 0 ? uploadedImages : ['https://images.pexels.com/photos/1382394/pexels-photo-1382394.jpeg?auto=compress&cs=tinysrgb&w=800'],
        availability: data.availability,
        description: data.description,
        status: 'active',
        featured: false,
        user_id: user?.id || '1'
      });

      toast.success('🎉 Property listed successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to list property. Please try again.');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Simulate image upload - in real app, you'd upload to cloud storage
      const newImages = Array.from(files).map((file, index) => 
        `https://images.pexels.com/photos/${1382394 + index}/pexels-photo-${1382394 + index}.jpeg?auto=compress&cs=tinysrgb&w=800`
      );
      setUploadedImages(prev => [...prev, ...newImages]);
      toast.success(`${files.length} image(s) uploaded successfully!`);
    }
  };

  const steps = [
    { number: 1, title: 'Basic Details', icon: <Home className="w-5 h-5" /> },
    { number: 2, title: 'Location & Size', icon: <MapPin className="w-5 h-5" /> },
    { number: 3, title: 'Pricing & Legal', icon: <FileText className="w-5 h-5" /> },
    { number: 4, title: 'Images & Description', icon: <Camera className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="mr-4"
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Dashboard
            </Button>
            <Badge variant="gradient" size="md">
              <Home className="w-4 h-4 mr-2" />
              List Property
            </Badge>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            List Your Property
          </h1>
          <p className="text-gray-600">
            Reach thousands of verified buyers and get the best price for your property
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
          {/* Step 1: Basic Details */}
          {currentStep === 1 && (
            <Card shadow="strong" className="mb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Home className="w-5 h-5 mr-2 text-emerald-600" />
                Basic Property Details
              </h2>
              
              <div className="space-y-6">
                <Input
                  label="Property Title"
                  placeholder="e.g., Premium Agricultural Land in Nashik"
                  error={errors.title?.message}
                  {...register('title', { required: 'Property title is required' })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Property Type
                    </label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      {...register('property_type', { required: 'Property type is required' })}
                    >
                      <option value="">Select property type</option>
                      <option value="agricultural">Agricultural Land</option>
                      <option value="residential">Residential Plot</option>
                      <option value="commercial">Commercial Land</option>
                      <option value="industrial">Industrial Land</option>
                    </select>
                    {errors.property_type && (
                      <p className="mt-2 text-sm text-red-600">{errors.property_type.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Listing Type
                    </label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      {...register('listing_type', { required: 'Listing type is required' })}
                    >
                      <option value="">Select listing type</option>
                      <option value="sale">For Sale</option>
                      <option value="rent">For Rent</option>
                      <option value="both">Both Sale & Rent</option>
                    </select>
                    {errors.listing_type && (
                      <p className="mt-2 text-sm text-red-600">{errors.listing_type.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setCurrentStep(2)}
                  disabled={!watch('title') || !watch('property_type') || !watch('listing_type')}
                >
                  Next: Location & Size
                </Button>
              </div>
            </Card>
          )}

          {/* Step 2: Location & Size */}
          {currentStep === 2 && (
            <Card shadow="strong" className="mb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                Location & Size Details
              </h2>
              
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
                      <option value="">Select unit</option>
                      <option value="acres">Acres</option>
                      <option value="sqft">Square Feet</option>
                      <option value="hectares">Hectares</option>
                    </select>
                    {errors.size_unit && (
                      <p className="mt-2 text-sm text-red-600">{errors.size_unit.message}</p>
                    )}
                  </div>
                </div>
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
                  disabled={!watch('state') || !watch('district') || !watch('area') || !watch('size')}
                >
                  Next: Pricing & Legal
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Pricing & Legal */}
          {currentStep === 3 && (
            <Card shadow="strong" className="mb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-emerald-600" />
                Pricing & Legal Information
              </h2>
              
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
                      <option value="">Select legal status</option>
                      <option value="clear">Clear Title</option>
                      <option value="disputed">Under Dispute</option>
                      <option value="under_loan">Under Loan</option>
                    </select>
                    {errors.legal_status && (
                      <p className="mt-2 text-sm text-red-600">{errors.legal_status.message}</p>
                    )}
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

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                >
                  Previous
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  onClick={() => setCurrentStep(4)}
                >
                  Next: Images & Description
                </Button>
              </div>
            </Card>
          )}

          {/* Step 4: Images & Description */}
          {currentStep === 4 && (
            <Card shadow="strong" className="mb-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Camera className="w-5 h-5 mr-2 text-emerald-600" />
                Images & Description
              </h2>
              
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-emerald-500 transition-colors">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <div className="text-sm text-gray-600 mb-4">
                      <label className="cursor-pointer text-emerald-600 hover:text-emerald-500">
                        <span>Upload images</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                      <span> or drag and drop</span>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                  </div>
                  
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      {uploadedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Property ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Property Description
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Describe your property in detail. Include location advantages, nearby facilities, soil quality, etc."
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

              <div className="flex justify-between mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(3)}
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  className="shadow-strong"
                  icon={<Save className="w-4 h-4" />}
                >
                  {loading ? 'Publishing...' : 'Publish Property'}
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
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-3">
                Our team is here to help you list your property effectively and reach the right buyers.
              </p>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};