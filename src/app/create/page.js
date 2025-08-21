'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CreateCampaignPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    hashtag: '',
    category: '',
    startDate: '',
    endDate: '',
    instructions: '',
    bannerImage: null,
    frameImage: null
  });

  const categories = [
    'Environment',
    'Health',
    'Education',
    'Community',
    'Social Justice',
    'Technology',
    'Sports',
    'Arts & Culture',
    'Politics',
    'Other'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          [field]: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit to your API
    console.log('Campaign data:', formData);
    alert('Campaign created successfully! It will be reviewed before going live.');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.description && formData.hashtag && formData.category;
      case 2:
        return formData.bannerImage && formData.frameImage;
      case 3:
        return formData.startDate && formData.endDate;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Create New Campaign
          </h1>
          <p className="text-lg text-gray-600">
            Share your message with the world through beautiful frame campaigns
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                <div className="ml-2 text-sm font-medium text-gray-600">
                  {step === 1 && 'Basic Info'}
                  {step === 2 && 'Images'}
                  {step === 3 && 'Schedule'}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 ml-4 ${
                    step < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Campaign Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., World Environment Day 2024"
                  className="input-field"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.title.length}/100 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your campaign and its purpose..."
                  rows={4}
                  className="input-field"
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hashtag *
                  </label>
                  <input
                    type="text"
                    value={formData.hashtag}
                    onChange={(e) => {
                      let value = e.target.value;
                      if (!value.startsWith('#') && value.length > 0) {
                        value = '#' + value;
                      }
                      handleInputChange('hashtag', value);
                    }}
                    placeholder="#YourHashtag"
                    className="input-field"
                    maxLength={50}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Participation Instructions
                </label>
                <textarea
                  value={formData.instructions}
                  onChange={(e) => handleInputChange('instructions', e.target.value)}
                  placeholder="Tell users how to participate in your campaign..."
                  rows={3}
                  className="input-field"
                  maxLength={300}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.instructions.length}/300 characters</p>
              </div>
            </div>
          )}

          {/* Step 2: Images */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Campaign Images</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Banner Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Banner Image *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                    {formData.bannerImage ? (
                      <div className="space-y-4">
                        <img
                          src={formData.bannerImage}
                          alt="Banner preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => handleInputChange('bannerImage', null)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div>
                        <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-600 mb-2">Upload banner image</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('bannerImage', e.target.files[0])}
                          className="hidden"
                          id="banner-upload"
                        />
                        <label htmlFor="banner-upload" className="btn-primary cursor-pointer">
                          Choose File
                        </label>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Recommended: 800x400px, JPG or PNG</p>
                </div>

                {/* Frame Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frame Image *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                    {formData.frameImage ? (
                      <div className="space-y-4">
                        <img
                          src={formData.frameImage}
                          alt="Frame preview"
                          className="w-32 h-32 object-cover rounded-lg mx-auto"
                        />
                        <button
                          onClick={() => handleInputChange('frameImage', null)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div>
                        <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-600 mb-2">Upload frame overlay</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload('frameImage', e.target.files[0])}
                          className="hidden"
                          id="frame-upload"
                        />
                        <label htmlFor="frame-upload" className="btn-primary cursor-pointer">
                          Choose File
                        </label>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Required: PNG with transparency, 300x300px recommended
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Image Guidelines:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Banner images should be high-quality and represent your campaign</li>
                  <li>• Frame images must be PNG format with transparent background</li>
                  <li>• Ensure frame designs leave space for profile pictures</li>
                  <li>• Test your frame with different image types before publishing</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 3: Schedule */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Campaign Schedule</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="input-field"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    End Date *
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="input-field"
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Campaign Preview */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Preview</h3>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start space-x-4">
                    {formData.bannerImage && (
                      <img
                        src={formData.bannerImage}
                        alt="Campaign banner"
                        className="w-24 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{formData.title || 'Campaign Title'}</h4>
                      <p className="text-sm text-gray-600 mt-1">{formData.description || 'Campaign description...'}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                          {formData.hashtag || '#hashtag'}
                        </span>
                        <span className="text-xs text-gray-500">{formData.category || 'Category'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">Before You Submit:</h4>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>• Review all information for accuracy</li>
                  <li>• Make sure your images meet the quality guidelines</li>
                  <li>• Your campaign will be reviewed before going live</li>
                  <li>• You'll receive an email notification once approved</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`btn-secondary ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`btn-primary ${!isStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!isStepValid()}
                className={`btn-primary ${!isStepValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Create Campaign
              </button>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}