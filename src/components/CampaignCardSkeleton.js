export default function CampaignCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="relative">
        <div className="w-full h-48 bg-gray-300 relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        
        {/* Category badge skeleton */}
        <div className="absolute top-3 left-3">
          <div className="bg-gray-300 rounded-full w-16 h-6 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>

        {/* Participant count skeleton */}
        <div className="absolute top-3 right-3">
          <div className="bg-gray-400 rounded-full w-12 h-6 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-4">
        {/* Title skeleton - 2 lines */}
        <div className="mb-2">
          <div className="bg-gray-300 rounded w-4/5 h-4 mb-2 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          <div className="bg-gray-300 rounded w-3/5 h-4 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>
        
        {/* Description skeleton - 2 lines */}
        <div className="mb-3">
          <div className="bg-gray-200 rounded w-full h-3 mb-1 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          <div className="bg-gray-200 rounded w-4/5 h-3 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>
        
        {/* Bottom section skeleton */}
        <div className="flex items-center justify-between">
          {/* Hashtag skeleton */}
          <div className="bg-gray-200 rounded w-16 h-5 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
          
          {/* Creator skeleton */}
          <div className="bg-gray-200 rounded w-20 h-3 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
}