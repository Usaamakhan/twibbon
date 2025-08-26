'use client';

import ImagePlaceholder from './ImagePlaceholder';

export default function ImagePlaceholderDemo() {
  const variants = ['primary', 'secondary', 'success', 'warning', 'neutral', 'ocean', 'sunset', 'nature'];
  const sizes = ['small', 'default', 'large', 'avatar', 'square'];
  
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Image Placeholder System</h1>
        
        {/* Variants Showcase */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Gradient Variants</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {variants.map((variant) => (
              <div key={variant} className="text-center">
                <ImagePlaceholder
                  variant={variant}
                  size="default"
                  iconType="campaign"
                  className="mb-3"
                />
                <p className="text-sm font-medium text-gray-600 capitalize">{variant}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Size Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Size Variants</h2>
          <div className="flex flex-wrap items-end gap-6">
            {sizes.map((size) => (
              <div key={size} className="text-center">
                <ImagePlaceholder
                  variant="primary"
                  size={size}
                  iconType="campaign"
                  className="mb-3"
                />
                <p className="text-sm font-medium text-gray-600 capitalize">{size}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Icon Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Icon Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['campaign', 'user', 'frame', 'gallery'].map((iconType) => (
              <div key={iconType} className="text-center">
                <ImagePlaceholder
                  variant="secondary"
                  size="default"
                  iconType={iconType}
                  className="mb-3"
                />
                <p className="text-sm font-medium text-gray-600 capitalize">{iconType}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Loading States Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Loading States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <ImagePlaceholder
                variant="primary"
                size="default"
                iconType="campaign"
                className="mb-3"
              />
              <p className="text-sm font-medium text-gray-600">Loading State</p>
            </div>
            
            <div className="text-center">
              <ImagePlaceholder
                src="/api/placeholder/400/300"
                variant="success"
                size="default"
                iconType="campaign"
                className="mb-3"
              />
              <p className="text-sm font-medium text-gray-600">Successful Load</p>
            </div>
            
            <div className="text-center">
              <ImagePlaceholder
                src="invalid-url"
                variant="warning"
                size="default"
                iconType="campaign"
                className="mb-3"
              />
              <p className="text-sm font-medium text-gray-600">Error State</p>
            </div>
          </div>
        </section>

        {/* Real Usage Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Real Usage Examples</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Campaign Card Example */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <ImagePlaceholder
                src="/api/placeholder/400/240"
                variant="nature"
                size="default"
                iconType="campaign"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Save Our Planet</h3>
                <p className="text-sm text-gray-600">Join the global movement to protect our environment</p>
                <div className="flex items-center mt-3">
                  <ImagePlaceholder
                    src="/api/placeholder/32/32"
                    variant="neutral"
                    size="avatar"
                    iconType="user"
                    showIcon={false}
                    className="w-6 h-6 mr-2"
                  />
                  <span className="text-xs text-gray-600">GreenEarth Initiative</span>
                </div>
              </div>
            </div>

            {/* User Profile Example */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <ImagePlaceholder
                src="/api/placeholder/80/80"
                variant="secondary"
                size="avatar"
                iconType="user"
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="font-semibold text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-600">Campaign Creator</p>
            </div>

            {/* Gallery Item Example */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <ImagePlaceholder
                src="/api/placeholder/300/300"
                variant="ocean"
                size="square"
                iconType="gallery"
              />
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900">Gallery Item</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}