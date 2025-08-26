'use client';

import { useState, useEffect, useCallback } from 'react';

export default function ImagePlaceholder({ 
  src, 
  alt = "Campaign image", 
  size = "default",
  variant = "primary",
  className = "",
  showIcon = true,
  iconType = "campaign",
  onLoad,
  onError,
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Size variants
  const sizeClasses = {
    small: "w-16 h-16",
    default: "w-full h-48",
    large: "w-full h-64",
    xl: "w-full h-80",
    avatar: "w-10 h-10 rounded-full",
    square: "w-full aspect-square"
  };

  // Gradient variants
  const gradientVariants = {
    primary: "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600",
    secondary: "bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500",
    success: "bg-gradient-to-br from-green-400 via-green-500 to-emerald-600",
    warning: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500",
    neutral: "bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500",
    ocean: "bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600",
    sunset: "bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600",
    nature: "bg-gradient-to-br from-green-400 via-teal-500 to-blue-500"
  };

  // Icon types
  const getIcon = (type) => {
    switch (type) {
      case 'campaign':
        return (
          <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'user':
        return (
          <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'frame':
        return (
          <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'gallery':
        return (
          <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setImageLoaded(true);
    setHasError(false);
    if (onLoad) onLoad();
  }, [onLoad]);

  // Handle image error
  const handleImageError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    setImageLoaded(false);
    if (onError) onError();
  }, [onError]);

  // Simulate loading delay for demonstration
  useEffect(() => {
    if (src) {
      setIsLoading(true);
      setHasError(false);
      
      // Simulate network delay (remove in production)
      const loadingDelay = Math.random() * 1000 + 500; // 500ms - 1.5s
      const timer = setTimeout(() => {
        // Try to load the actual image
        const img = new Image();
        img.onload = handleImageLoad;
        img.onerror = handleImageError;
        img.src = src;
      }, loadingDelay);

      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  }, [src, handleImageLoad, handleImageError]);

  const baseClasses = `
    image-placeholder-container relative overflow-hidden flex items-center justify-center
    ${sizeClasses[size]} 
    ${size === 'avatar' ? 'rounded-full' : 'rounded-lg'}
    ${size === 'default' ? 'aspect-campaign' : ''}
    ${className}
  `;

  // Show placeholder while loading or on error
  if (isLoading || hasError || !src) {
    return (
      <div className={`${baseClasses} ${gradientVariants[variant]} ${hasError ? 'image-error-state' : ''} ${isLoading ? 'image-loading-pulse' : ''}`} {...props}>
        {/* Enhanced shimmer animation overlay for loading state */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer" />
        )}
        
        {/* Icon overlay with enhanced animations */}
        {showIcon && (
          <div className={`flex flex-col items-center justify-center space-y-2 z-10 transition-all duration-300 ${isLoading ? 'animate-pulse' : ''}`}>
            {hasError ? (
              <svg className="w-8 h-8 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z" />
              </svg>
            ) : (
              getIcon(iconType)
            )}
            {hasError && !isLoading && (
              <span className="text-xs text-red-200 font-medium">Failed to load</span>
            )}
            {isLoading && (
              <span className="text-xs text-white/70 font-medium">Loading...</span>
            )}
          </div>
        )}

        {/* Enhanced decorative pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" 
               style={{
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3Ccircle cx='10' cy='50' r='1'/%3E%3Ccircle cx='50' cy='10' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                 backgroundSize: '30px 30px'
               }} 
          />
        </div>
      </div>
    );
  }

  // Show actual image once loaded
  return (
    <div className={`${baseClasses} bg-gray-100 campaign-image-wrapper`} {...props}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`
          w-full h-full object-cover transition-all duration-700 ease-out
          ${imageLoaded ? 'opacity-100 scale-100 image-success-state' : 'opacity-0 scale-95'}
        `}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
      
      {/* Enhanced loading overlay that fades out */}
      {!imageLoaded && (
        <div className={`
          image-loading-overlay absolute inset-0 ${gradientVariants[variant]} 
          flex items-center justify-center transition-all duration-700 ease-out
          ${imageLoaded ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}
          image-loading-pulse
        `}>
          {showIcon && (
            <div className="flex flex-col items-center justify-center space-y-2 z-10">
              {getIcon(iconType)}
              <span className="text-xs text-white/70 font-medium">Loading...</span>
            </div>
          )}
          {/* Enhanced shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent transform -skew-x-12 animate-shimmer" />
        </div>
      )}
    </div>
  );
}