import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CampaignCardSkeleton from './CampaignCardSkeleton';
import ImagePlaceholder from './ImagePlaceholder';
import { highlightMultipleFields } from '@/utils/searchHighlight';

export default function CampaignCard({ campaign, isLoading = false, searchTerm = "" }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Initialize like count (must be before early return)
  useEffect(() => {
    if (campaign?.likes !== undefined) {
      setLikeCount(campaign.likes);
    }
  }, [campaign?.likes]);

  // Show skeleton if loading
  if (isLoading) {
    return <CampaignCardSkeleton />;
  }
  
  // Apply search highlighting if search term exists
  const highlightedCampaign = searchTerm ? highlightMultipleFields(campaign, searchTerm) : campaign;
  
  const {
    id,
    title,
    description,
    hashtag,
    thumbnail,
    participantCount,
    category,
    creator,
    creatorAvatar,
    createdAt,
    trending,
    likes,
    views,
    isVerified
  } = highlightedCampaign;

  // Handle like toggle
  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  // Handle share click
  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowShareMenu(!showShareMenu);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className="bg-refined-white radius-xl shadow-sm-enhanced border border-gray-200 overflow-hidden card-hover-lift card-hover-glow group relative h-full flex flex-col">
      <Link href={`/campaign/${id}`} className="flex flex-col h-full">
        <div className="relative">
          <ImagePlaceholder
            src={thumbnail}
            alt={title}
            size="default"
            variant={trending ? "sunset" : category === "Environment" ? "nature" : category === "Education" ? "primary" : category === "Health" ? "success" : category === "Community" ? "secondary" : category === "Social" ? "ocean" : "neutral"}
            iconType="campaign"
            className="group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Enhanced Category Badge */}
          <div className="absolute top-3 left-3">
            <span 
              className="bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1.5 rounded-full text-gray-700 border border-white/20 shadow-sm"
              dangerouslySetInnerHTML={{ __html: category }}
            />
          </div>

          {/* Trending Badge */}
          {trending && (
            <div className="absolute top-3 left-3 translate-x-20 ml-2">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center animate-pulse-slow">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                HOT
              </span>
            </div>
          )}

          {/* Enhanced Participant Count */}
          <div className="absolute top-3 right-3">
            <div className="bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center shadow-lg">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              {participantCount.toLocaleString()}
            </div>
          </div>

          {/* Interactive Buttons */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 interactive-element ${
                isLiked 
                  ? 'bg-red-500 text-white shadow-lg scale-110' 
                  : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:scale-105'
              }`}
              title={isLiked ? 'Unlike' : 'Like'}
            >
              <svg className={`w-4 h-4 ${isLiked ? 'icon-hover-pulse' : 'icon-hover-bounce'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </button>
            
            <div className="relative">
              <button
                onClick={handleShare}
                className="p-2 bg-white/90 backdrop-blur-sm text-gray-600 rounded-full hover:bg-blue-50 hover:text-blue-500 hover:scale-105 transition-all duration-300 interactive-element"
                title="Share"
              >
                <svg className="w-4 h-4 icon-hover-wiggle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              
              {showShareMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-refined-white radius-lg shadow-lg-enhanced border border-gray-200 p-2 flex gap-1 animate-scale-in z-10 backdrop-blur-refined">
                  <button className="p-1.5 text-blue-600 hover:bg-blue-50 radius-md transition-all duration-200 interactive-element" title="Facebook">
                    <svg className="w-4 h-4 icon-hover-bounce" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>
                  <button className="p-1.5 text-blue-400 hover:bg-blue-50 radius-md transition-all duration-200 interactive-element" title="Twitter">
                    <svg className="w-4 h-4 icon-hover-spin" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </button>
                  <button className="p-1.5 text-gray-600 hover:bg-gray-50 radius-md transition-all duration-200 interactive-element" title="Copy Link">
                    <svg className="w-4 h-4 icon-hover-flip" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 
            className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p 
            className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          
          {/* Enhanced Creator Info with Avatar */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <ImagePlaceholder
                src={creatorAvatar}
                alt={`${creator} avatar`}
                size="avatar"
                variant="neutral"
                iconType="user"
                showIcon={false}
                className="w-6 h-6"
              />
              <span 
                className="text-xs text-gray-600 font-medium flex items-center"
                dangerouslySetInnerHTML={{ __html: `${creator}` }}
              />
              {isVerified && (
                <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {formatDate(createdAt)}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <span 
              className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-md"
              dangerouslySetInnerHTML={{ __html: hashtag }}
            />
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {likeCount.toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {views?.toLocaleString() || '0'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}