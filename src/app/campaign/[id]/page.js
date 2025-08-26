'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import FrameEditorSkeleton from '@/components/FrameEditorSkeleton';

// Dynamically import FrameEditor to reduce initial bundle size
const FrameEditor = dynamic(() => import('@/components/FrameEditor'), {
  loading: () => <FrameEditorSkeleton />,
  ssr: false // Disable SSR for FrameEditor as it uses canvas and client-side APIs
});

// Mock data - will be replaced with API calls
const getCampaignData = (id) => {
  const campaigns = {
    1: {
      id: 1,
      title: "World Environment Day 2024",
      description: "Join the global movement to protect our planet. This campaign aims to raise awareness about environmental issues and encourage people to take action for a sustainable future. Together, we can make a difference by promoting sustainable practices and protecting biodiversity for future generations.",
      hashtag: "#WorldEnvironmentDay",
      banner: "/api/placeholder/800/400",
      frame: "/api/placeholder/300/300",
      participantCount: 1520,
      downloadCount: 8450,
      viewCount: 15840,
      likeCount: 892,
      category: "Environment",
      creator: {
        name: "GreenPeace",
        avatar: "/api/placeholder/50/50",
        verified: true,
        followers: 2500000,
        bio: "Leading global environmental organization fighting for a green and peaceful future"
      },
      createdDate: "2024-05-15",
      updatedDate: "2024-05-20",
      startDate: "2024-06-01",
      endDate: "2024-06-30",
      instructions: "Upload your photo and apply the frame to show your support for environmental protection!",
      tags: ["Environment", "Climate Change", "Sustainability", "Green Energy", "Conservation"],
      socialLinks: {
        facebook: "#",
        twitter: "#",
        instagram: "#"
      },
      fullDescription: `<p>Join millions of people around the world in celebrating World Environment Day 2024! This year's theme focuses on <strong>ecosystem restoration</strong> and the urgent need to prevent, halt, and reverse environmental degradation.</p>

<p>Our planet is facing unprecedented challenges - from climate change and biodiversity loss to pollution and deforestation. But together, we can be part of the solution.</p>

<h3>Why Participate?</h3>
<ul>
<li>Raise awareness about critical environmental issues</li>
<li>Connect with like-minded individuals globally</li>
<li>Show your commitment to a sustainable future</li>
<li>Inspire others to take environmental action</li>
</ul>

<p>By participating in this campaign, you're not just sharing a photo - you're joining a movement that's working to restore our planet's health and secure a better future for all living beings.</p>

<p><em>"The Earth does not belong to us; we belong to the Earth. All things are connected like the blood that unites one family."</em> - Chief Seattle</p>`
    }
  };
  
  return campaigns[id] || null;
};

// Mock related campaigns data
const getRelatedCampaigns = (currentCampaign) => {
  const allCampaigns = [
    {
      id: 2,
      title: "Ocean Cleanup Initiative",
      description: "Help clean our oceans and protect marine life",
      hashtag: "#CleanOceans",
      image: "/api/placeholder/300/200",
      frame: "/api/placeholder/300/300",
      participantCount: 2847,
      downloadCount: 12450,
      category: "Environment",
      creator: {
        name: "Ocean Foundation",
        verified: true
      },
      trending: true
    },
    {
      id: 3,
      title: "Plant a Tree Challenge",
      description: "Every tree planted makes a difference",
      hashtag: "#PlantForPlanet",
      image: "/api/placeholder/300/200",
      frame: "/api/placeholder/300/300",
      participantCount: 5420,
      downloadCount: 18750,
      category: "Environment",
      creator: {
        name: "Forest Alliance",
        verified: false
      },
      trending: false
    },
    {
      id: 4,
      title: "Renewable Energy Now",
      description: "Support the transition to clean energy",
      hashtag: "#RenewableEnergy",
      image: "/api/placeholder/300/200",
      frame: "/api/placeholder/300/300",
      participantCount: 1893,
      downloadCount: 9340,
      category: "Environment",
      creator: {
        name: "Solar Power Co",
        verified: true
      },
      trending: false
    },
    {
      id: 5,
      title: "Wildlife Conservation",
      description: "Protect endangered species worldwide",
      hashtag: "#SaveWildlife",
      image: "/api/placeholder/300/200",
      frame: "/api/placeholder/300/300",
      participantCount: 3654,
      downloadCount: 15820,
      category: "Environment",
      creator: {
        name: "Wildlife Trust",
        verified: true
      },
      trending: true
    },
    {
      id: 6,
      title: "Education for All",
      description: "Support global education initiatives",
      hashtag: "#EducationMatters",
      image: "/api/placeholder/300/200",
      frame: "/api/placeholder/300/300",
      participantCount: 4521,
      downloadCount: 21650,
      category: "Education",
      creator: {
        name: "Global Education Fund",
        verified: true
      },
      trending: false
    },
    {
      id: 7,
      title: "Health Awareness Week",
      description: "Promote healthy living worldwide",
      hashtag: "#HealthyLiving",
      image: "/api/placeholder/300/200",
      frame: "/api/placeholder/300/300",
      participantCount: 2976,
      downloadCount: 13480,
      category: "Health",
      creator: {
        name: "Health Alliance",
        verified: false
      },
      trending: false
    }
  ];

  // Filter campaigns by same category, excluding current campaign
  const sameCategoryCampaigns = allCampaigns.filter(campaign => 
    campaign.category === currentCampaign.category && campaign.id !== currentCampaign.id
  );

  // If we have less than 4 same-category campaigns, fill with other popular campaigns
  let relatedCampaigns = sameCategoryCampaigns.slice(0, 4);
  
  if (relatedCampaigns.length < 4) {
    const otherCampaigns = allCampaigns.filter(campaign => 
      campaign.category !== currentCampaign.category && campaign.id !== currentCampaign.id
    ).slice(0, 4 - relatedCampaigns.length);
    
    relatedCampaigns = [...relatedCampaigns, ...otherCampaigns];
  }

  return relatedCampaigns;
};

export default function CampaignDetailPage() {
  const params = useParams();
  const [showEditor, setShowEditor] = useState(false);
  const [isLoadingEditor, setIsLoadingEditor] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showZoomedFrame, setShowZoomedFrame] = useState(false);
  const [userPreviewImage, setUserPreviewImage] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [customShareMessage, setCustomShareMessage] = useState('');
  const campaign = getCampaignData(params.id);
  const relatedCampaigns = campaign ? getRelatedCampaigns(campaign) : [];

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign Not Found</h1>
          <p className="text-gray-600 mb-8">The campaign you're looking for doesn't exist or has been removed.</p>
          <a href="/explore" className="btn-primary">Browse All Campaigns</a>
        </div>
        {/* Header/Footer provided by root layout */}
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const handleShare = (platform, customMessage = '') => {
    const defaultMessage = `Check out this amazing campaign: ${campaign.title} ${campaign.hashtag}`;
    const text = customMessage || defaultMessage;
    const url = shareUrl;
    
    // Track share analytics (UI prep)
    trackShareEvent(platform, campaign.id);
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'instagram':
        // Instagram doesn't support direct URL sharing, so copy to clipboard with instructions
        navigator.clipboard.writeText(`${text} ${url}`);
        alert('Message copied! Open Instagram and paste this in your story or post.');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
        break;
      case 'telegram':
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
        break;
      default:
        break;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    showNotification('Link copied to clipboard!');
  };

  const trackShareEvent = (platform, campaignId) => {
    // Analytics tracking placeholder - will be implemented with Firebase Analytics
    console.log(`Share event: ${platform} - Campaign: ${campaignId}`);
  };

  const showNotification = (message) => {
    // Simple notification system
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-up';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const handleOpenEditor = async () => {
    setIsLoadingEditor(true);
    // Small delay to show loading state
    setTimeout(() => {
      setShowEditor(true);
      setIsLoadingEditor(false);
    }, 100);
  };

  // Preload FrameEditor on hover for better UX
  const handlePreloadEditor = () => {
    if (!showEditor && !isLoadingEditor) {
      // Dynamically import to start loading the component
      import('@/components/FrameEditor');
    }
  };

  // Handle frame download
  const handleDownloadFrame = () => {
    // Create a temporary link to download the frame
    const link = document.createElement('a');
    link.href = campaign.frame;
    link.download = `${campaign.title.replace(/\s+/g, '-')}-frame.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle user image upload for quick preview
  const handleUserImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle share frame preview
  const handleShareFrame = (platform) => {
    const text = `Check out this amazing frame from ${campaign.title}! ${campaign.hashtag}`;
    const url = campaign.frame;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      default:
        break;
    }
  };

  return (
  <div className="min-h-screen bg-gray-50">
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Campaign Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="relative">
            <Image
              src={campaign.banner}
              alt={campaign.title}
              width={1200}
              height={480}
              className="w-full h-64 md:h-80 object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center space-x-2 mb-3">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {campaign.category}
                </span>
                <span className="bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                  Active
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">{campaign.title}</h1>
              <div className="flex items-center space-x-4 text-lg opacity-90">
                <span>{campaign.hashtag}</span>
                <span className="text-sm">•</span>
                <span className="text-sm">Created {new Date(campaign.createdDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Creator Info */}
              <div className="flex items-center space-x-4">
                <Image
                  src={campaign.creator.avatar}
                  alt={campaign.creator.name}
                  width={56}
                  height={56}
                  className="rounded-full ring-2 ring-primary-100"
                  unoptimized
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-900 text-lg">{campaign.creator.name}</span>
                    {campaign.creator.verified && (
                      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{campaign.creator.bio}</p>
                  <p className="text-xs text-gray-500">{campaign.creator.followers.toLocaleString()} followers</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xl font-bold text-gray-900">{campaign.viewCount.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Views</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xl font-bold text-gray-900">{campaign.participantCount.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Participants</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xl font-bold text-gray-900">{campaign.downloadCount.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Downloads</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xl font-bold text-red-600">{campaign.likeCount.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">Likes</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Campaign Timeline & Dates */}
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-4 mt-6">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium text-gray-900 ml-1">
                    {new Date(campaign.createdDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Updated:</span>
                  <span className="font-medium text-gray-900 ml-1">
                    {new Date(campaign.updatedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 font-medium">Campaign Active</span>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-primary-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Campaign Duration:</span>
                <span className="font-medium text-gray-900">
                  {new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(campaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About This Campaign
              </h2>
              
              {/* Short Description */}
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed text-base">{campaign.description}</p>
              </div>

              {/* Expandable Full Description */}
              <div className="mb-6">
                <div 
                  className={`prose prose-sm max-w-none text-gray-700 transition-all duration-300 ${
                    showFullDescription ? 'max-h-full opacity-100' : 'max-h-32 overflow-hidden opacity-75'
                  }`}
                  dangerouslySetInnerHTML={{ __html: showFullDescription ? campaign.fullDescription : '' }}
                />
                
                {!showFullDescription && (
                  <div className="mt-4">
                    <button
                      onClick={() => setShowFullDescription(true)}
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                    >
                      <span>Read more about this campaign</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                )}
                
                {showFullDescription && (
                  <div className="mt-4">
                    <button
                      onClick={() => setShowFullDescription(false)}
                      className="inline-flex items-center text-gray-600 hover:text-gray-700 font-medium text-sm transition-colors"
                    >
                      <span>Show less</span>
                      <svg className="w-4 h-4 ml-1 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              
              {/* How to Participate */}
              <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg className="w-4 h-4 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  How to Participate:
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">{campaign.instructions}</p>
              </div>

              {/* Tags and Hashtags */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Campaign Tags:</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <span className="text-primary-600 mr-1">#</span>
                    {campaign.hashtag.replace('#', '')}
                  </span>
                  {campaign.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Share Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share This Campaign
              </h2>
              <p className="text-gray-600 mb-4 text-sm">Help spread the word and make this campaign viral!</p>
              
              {/* Quick Share Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => handleShare('facebook')}
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>

                <button
                  onClick={() => handleShare('twitter')}
                  className="flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <span>Twitter</span>
                </button>
              </div>

              {/* More Options Button */}
              <button
                onClick={() => setShowShareModal(true)}
                className="w-full btn-secondary flex items-center justify-center space-x-2 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
                <span>More Sharing Options</span>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enhanced Frame Preview Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Campaign Frame Preview
              </h3>
              
              {/* Frame Preview with Zoom */}
              <div className="text-center mb-6">
                <div className="relative inline-block group">
                  <Image
                    src={campaign.frame}
                    alt="Campaign Frame"
                    width={200}
                    height={200}
                    className="mx-auto rounded-lg border border-gray-200 shadow-md transition-all duration-300 group-hover:shadow-lg cursor-zoom-in"
                    unoptimized
                    onClick={() => setShowZoomedFrame(true)}
                  />
                  
                  {/* Zoom overlay hint */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white rounded-full p-2 shadow-lg">
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-2">Click to zoom and view details</p>
              </div>

              {/* Quick Preview with User Image */}
              {userPreviewImage && (
                <div className="mb-6 p-4 bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3 text-center">Quick Preview</h4>
                  <div className="relative inline-block mx-auto">
                    <div className="w-32 h-32 relative mx-auto">
                      {/* User image as background */}
                      <Image
                        src={userPreviewImage}
                        alt="User Preview"
                        width={128}
                        height={128}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {/* Frame overlay */}
                      <Image
                        src={campaign.frame}
                        alt="Frame Overlay"
                        width={128}
                        height={128}
                        className="absolute inset-0 w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setUserPreviewImage(null)}
                    className="text-xs text-gray-500 hover:text-gray-700 mt-2 block mx-auto"
                  >
                    Remove preview
                  </button>
                </div>
              )}

              {/* Frame Action Buttons */}
              <div className="space-y-3 mb-6">
                <button
                  onClick={handleOpenEditor}
                  onMouseEnter={handlePreloadEditor}
                  disabled={isLoadingEditor}
                  className={`w-full btn-primary interactive-element btn-micro-bounce text-lg py-3 ${isLoadingEditor ? 'btn-loading' : ''}`}
                >
                  <span className={`btn-text flex items-center justify-center ${isLoadingEditor ? 'opacity-0' : ''}`}>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Use This Frame
                  </span>
                  {isLoadingEditor && (
                    <div className="btn-spinner">
                      <div className="spinner-enhanced" />
                    </div>
                  )}
                </button>

                {/* Upload for Quick Preview */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUserImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="quick-preview-upload"
                  />
                  <label
                    htmlFor="quick-preview-upload"
                    className="w-full btn-secondary cursor-pointer flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 1v1a3 3 0 006 0V5m-6 0h10.5A1.5 1.5 0 0120 6.5v12A1.5 1.5 0 0118.5 20H5.5A1.5 1.5 0 014 18.5V6.5A1.5 1.5 0 015.5 5z" />
                    </svg>
                    Quick Preview with Your Photo
                  </label>
                </div>
              </div>

              {/* Frame Actions */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={handleDownloadFrame}
                  className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download</span>
                </button>

                <button
                  onClick={() => handleShareFrame('facebook')}
                  className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Share</span>
                </button>
              </div>

              <div className="text-center text-xs text-gray-500">
                Campaign ends: {new Date(campaign.endDate).toLocaleDateString()}
              </div>
            </div>

            {/* Recent Participants */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Participants</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <Image
                      src={`/api/placeholder/40/40`}
                      alt={`Participant ${i}`}
                      width={40}
                      height={40}
                      className="rounded-full"
                      unoptimized
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">User {i}</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
                View All Participants
              </button>
            </div>
          </div>
        </div>

        {/* Related Campaigns Section */}
        {relatedCampaigns.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <svg className="w-6 h-6 text-primary-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Related Campaigns
              </h2>
              <a 
                href="/explore" 
                className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center transition-colors group"
              >
                <span>View All</span>
                <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Horizontal Scrolling Container */}
            <div className="relative">
              {/* Scroll Buttons */}
              <button 
                id="scroll-left-btn"
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors opacity-0 pointer-events-none"
                onClick={() => {
                  const container = document.getElementById('related-campaigns-scroll');
                  container.scrollBy({ left: -320, behavior: 'smooth' });
                }}
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                id="scroll-right-btn"
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  const container = document.getElementById('related-campaigns-scroll');
                  container.scrollBy({ left: 320, behavior: 'smooth' });
                }}
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Scrollable Cards Container */}
              <div 
                id="related-campaigns-scroll"
                className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onScroll={(e) => {
                  const container = e.target;
                  const leftBtn = document.getElementById('scroll-left-btn');
                  const rightBtn = document.getElementById('scroll-right-btn');
                  
                  // Show/hide left button
                  if (container.scrollLeft > 10) {
                    leftBtn.classList.remove('opacity-0', 'pointer-events-none');
                  } else {
                    leftBtn.classList.add('opacity-0', 'pointer-events-none');
                  }
                  
                  // Show/hide right button
                  if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
                    rightBtn.classList.add('opacity-0', 'pointer-events-none');
                  } else {
                    rightBtn.classList.remove('opacity-0', 'pointer-events-none');
                  }
                }}
              >
                {relatedCampaigns.map((relatedCampaign, index) => (
                  <div 
                    key={relatedCampaign.id}
                    className="flex-none w-80 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 group"
                  >
                    {/* Campaign Image */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={relatedCampaign.image}
                        alt={relatedCampaign.title}
                        width={320}
                        height={200}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                      
                      {/* Trending Badge */}
                      {relatedCampaign.trending && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                          </svg>
                          Trending
                        </div>
                      )}

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {relatedCampaign.category}
                      </div>

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900 text-lg leading-tight group-hover:text-primary-600 transition-colors">
                          {relatedCampaign.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {relatedCampaign.description}
                      </p>

                      {/* Creator Info */}
                      <div className="flex items-center mb-4">
                        <Image
                          src={`/api/placeholder/32/32`}
                          alt={relatedCampaign.creator.name}
                          width={32}
                          height={32}
                          className="rounded-full mr-3"
                          unoptimized
                        />
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">{relatedCampaign.creator.name}</span>
                            {relatedCampaign.creator.verified && (
                              <svg className="w-4 h-4 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span>{relatedCampaign.participantCount.toLocaleString()} participants</span>
                        <span className="text-primary-600 font-medium">{relatedCampaign.hashtag}</span>
                      </div>

                      {/* Action Button */}
                      <a
                        href={`/campaign/${relatedCampaign.id}`}
                        className="w-full btn-secondary text-center block hover:bg-primary-50 hover:text-primary-700 hover:border-primary-200 transition-all duration-200"
                      >
                        View Campaign
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Touch Hint */}
            <div className="block lg:hidden text-center mt-4">
              <p className="text-sm text-gray-500">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Swipe to see more campaigns
              </p>
            </div>
          </section>
        )}
      </main>

      {/* Zoomed Frame Modal */}
      {showZoomedFrame && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="relative max-w-4xl max-h-[90vh] animate-scale-in">
            {/* Close button */}
            <button
              onClick={() => setShowZoomedFrame(false)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Large frame image */}
            <Image
              src={campaign.frame}
              alt="Campaign Frame - Zoomed"
              width={800}
              height={800}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              unoptimized
            />
            
            {/* Frame info overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{campaign.title} - Frame</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">
                  High-resolution frame ready for use
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={handleDownloadFrame}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1 rounded-md text-xs transition-colors"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => {
                      setShowZoomedFrame(false);
                      handleOpenEditor();
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md text-xs transition-colors"
                  >
                    Use Frame
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-xl animate-scale-in">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 text-primary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  Share Campaign
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Campaign Preview */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-3 mb-3">
                  <Image
                    src={campaign.frame}
                    alt="Campaign Frame"
                    width={48}
                    height={48}
                    className="rounded-lg"
                    unoptimized
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{campaign.title}</h4>
                    <p className="text-xs text-gray-600">{campaign.hashtag}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>
              </div>

              {/* Custom Message Input */}
              <div className="mb-6">
                <label htmlFor="custom-message" className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Message (optional)
                </label>
                <textarea
                  id="custom-message"
                  rows="3"
                  value={customShareMessage}
                  onChange={(e) => setCustomShareMessage(e.target.value)}
                  placeholder={`Check out this amazing campaign: ${campaign.title} ${campaign.hashtag}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none text-sm"
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">Customize your sharing message</p>
                  <span className="text-xs text-gray-400">{customShareMessage.length}/280</span>
                </div>
              </div>

              {/* Social Media Platforms */}
              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium text-gray-700">Share on:</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* Facebook */}
                  <button
                    onClick={() => {
                      handleShare('facebook', customShareMessage);
                      setShowShareModal(false);
                    }}
                    className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors group"
                  >
                    <div className="bg-blue-600 p-2 rounded-full">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">Facebook</p>
                      <p className="text-xs text-gray-600">Share on your timeline</p>
                    </div>
                  </button>

                  {/* Twitter */}
                  <button
                    onClick={() => {
                      handleShare('twitter', customShareMessage);
                      setShowShareModal(false);
                    }}
                    className="flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg transition-colors group"
                  >
                    <div className="bg-gray-900 p-2 rounded-full">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">Twitter</p>
                      <p className="text-xs text-gray-600">Tweet to followers</p>
                    </div>
                  </button>

                  {/* WhatsApp */}
                  <button
                    onClick={() => {
                      handleShare('whatsapp', customShareMessage);
                      setShowShareModal(false);
                    }}
                    className="flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors group"
                  >
                    <div className="bg-green-600 p-2 rounded-full">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">WhatsApp</p>
                      <p className="text-xs text-gray-600">Send to contacts</p>
                    </div>
                  </button>

                  {/* Instagram */}
                  <button
                    onClick={() => {
                      handleShare('instagram', customShareMessage);
                      setShowShareModal(false);
                    }}
                    className="flex items-center space-x-3 p-3 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-lg transition-colors group"
                  >
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-2 rounded-full">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">Instagram</p>
                      <p className="text-xs text-gray-600">Copy for story/post</p>
                    </div>
                  </button>

                  {/* LinkedIn */}
                  <button
                    onClick={() => {
                      handleShare('linkedin', customShareMessage);
                      setShowShareModal(false);
                    }}
                    className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors group"
                  >
                    <div className="bg-blue-700 p-2 rounded-full">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">LinkedIn</p>
                      <p className="text-xs text-gray-600">Share professionally</p>
                    </div>
                  </button>

                  {/* Telegram */}
                  <button
                    onClick={() => {
                      handleShare('telegram', customShareMessage);
                      setShowShareModal(false);
                    }}
                    className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors group"
                  >
                    <div className="bg-blue-500 p-2 rounded-full">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-sm">Telegram</p>
                      <p className="text-xs text-gray-600">Send to chats</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Copy Link Section */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600"
                    />
                  </div>
                  <button
                    onClick={() => {
                      copyToClipboard();
                      setShowShareModal(false);
                    }}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Frame Editor Modal with Suspense */}
      {showEditor && (
        <Suspense fallback={<FrameEditorSkeleton />}>
          <FrameEditor
            campaign={campaign}
            onClose={() => setShowEditor(false)}
          />
        </Suspense>
      )}

  {/* Footer provided by root layout */}
    </div>
  );
}