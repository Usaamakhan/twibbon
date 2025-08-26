'use client';

export default function FrameEditorSkeleton() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-refined-white radius-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl-enhanced animate-scale-in">
        <div className="p-6">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-48 skeleton-gradient radius-lg" />
            <div className="h-8 w-8 skeleton-gradient radius-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Canvas Area Skeleton */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-block">
                  {/* Canvas placeholder */}
                  <div className="w-[300px] h-[300px] bg-gray-100 radius-lg relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 skeleton-gradient radius-full mx-auto mb-3" />
                        <div className="h-4 w-32 skeleton-gradient radius-sm mx-auto" />
                      </div>
                    </div>
                    
                    {/* Enhanced shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full animate-shimmer">
                      <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Button Skeleton */}
              <div className="text-center">
                <div className="inline-block h-12 w-36 skeleton-gradient radius-full" />
              </div>
            </div>

            {/* Controls Skeleton */}
            <div className="space-y-6">
              {/* Title skeleton */}
              <div>
                <div className="h-6 w-48 skeleton-gradient radius-sm mb-4" />
                
                <div className="space-y-4">
                  {/* Slider skeleton */}
                  <div>
                    <div className="h-4 w-24 skeleton-gradient radius-sm mb-2" />
                    <div className="h-2 w-full skeleton-gradient radius-sm" />
                  </div>

                  {/* Button skeleton */}
                  <div className="h-12 w-full skeleton-gradient radius-lg" />

                  {/* Tips box skeleton */}
                  <div className="bg-refined-light p-3 radius-lg">
                    <div className="h-4 w-16 skeleton-gradient radius-sm mb-2" />
                    <div className="space-y-1">
                      <div className="h-3 w-full skeleton-gradient radius-sm" />
                      <div className="h-3 w-4/5 skeleton-gradient radius-sm" />
                      <div className="h-3 w-5/6 skeleton-gradient radius-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Campaign Info Skeleton */}
              <div className="bg-refined-light p-4 radius-lg">
                <div className="h-5 w-32 skeleton-gradient radius-sm mb-2" />
                <div className="h-4 w-24 skeleton-gradient radius-sm mb-2" />
                <div className="h-3 w-20 skeleton-gradient radius-sm" />
              </div>

              {/* Action Buttons Skeleton */}
              <div className="space-y-3">
                <div className="h-12 w-full skeleton-gradient radius-full" />
                
                <div className="text-center">
                  <div className="h-4 w-32 skeleton-gradient radius-sm mx-auto mb-3" />
                  <div className="flex justify-center space-x-3">
                    <div className="h-10 w-10 skeleton-gradient radius-lg" />
                    <div className="h-10 w-10 skeleton-gradient radius-lg" />
                    <div className="h-10 w-10 skeleton-gradient radius-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}