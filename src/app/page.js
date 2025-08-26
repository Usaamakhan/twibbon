 'use client';

import { useState, useEffect } from 'react';
// Header and Footer are provided by root layout
import CampaignCard from '@/components/CampaignCard';
import StatCounter from '@/components/StatCounter';
import SearchBar from '@/components/SearchBar';
import Button from '@/components/Button';
import { scrollToSection } from '@/utils/smoothScroll';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [displayCount, setDisplayCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const stats = [
    { 
      value: '50K+', 
      label: 'Active Campaigns',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      gradient: 'from-blue-500 to-purple-500',
      bgColor: 'bg-blue-50'
    },
    { 
      value: '2M+', 
      label: 'Frames Created',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-green-500 to-teal-500',
      bgColor: 'bg-green-50'
    },
    { 
      value: '100K+', 
      label: 'Happy Users',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    { 
      value: '150+', 
      label: 'Countries',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    }
  ];

const campaigns = [
    {
      id: 1,
      title: 'Save Our Planet',
      description: 'Join the global movement to protect our environment and create a sustainable future for generations to come.',
      hashtag: '#SavePlanet',
      thumbnail: '/api/placeholder/400/300',
      participantCount: 25300,
      category: 'Environment',
      creator: 'GreenEarth Initiative',
      creatorAvatar: '/api/placeholder/40/40',
      createdAt: '2024-01-15',
      trending: true,
      likes: 1250,
      views: 45300,
      isVerified: true
    },
    {
      id: 2,
      title: 'Education for All',
      description: 'Every child deserves access to quality education. Help us build schools and provide learning resources.',
      hashtag: '#Education4All',
      thumbnail: '/api/placeholder/400/300',
      participantCount: 18700,
      category: 'Education',
      creator: 'Learn Together',
      creatorAvatar: '/api/placeholder/40/40',
      createdAt: '2024-01-20',
      trending: false,
      likes: 890,
      views: 32100,
      isVerified: true
    },
    {
      id: 3,
      title: 'Mental Health Awareness',
      description: 'Breaking stigma and promoting mental wellness in our communities through awareness and support.',
      hashtag: '#MindMatters',
      thumbnail: '/api/placeholder/400/300',
      participantCount: 32100,
      category: 'Health',
      creator: 'Mind Matters',
      creatorAvatar: '/api/placeholder/40/40',
      createdAt: '2024-01-10',
      trending: true,
      likes: 2100,
      views: 78900,
      isVerified: false
    },
    {
      id: 4,
      title: 'Support Local Business',
      description: 'Help local entrepreneurs thrive and strengthen our community economy during challenging times.',
      hashtag: '#LocalFirst',
      thumbnail: '/api/placeholder/400/300',
      participantCount: 15900,
      category: 'Community',
      creator: 'Community First',
      creatorAvatar: '/api/placeholder/40/40',
      createdAt: '2024-01-25',
      trending: false,
      likes: 650,
      views: 24500,
      isVerified: true
    },
    {
      id: 5,
      title: 'Women Empowerment',
      description: 'Celebrating and supporting women in leadership, education, and entrepreneurship worldwide.',
      hashtag: '#SheRises',
      thumbnail: '/api/placeholder/400/300',
      participantCount: 28400,
      category: 'Social',
      creator: 'She Rises',
      creatorAvatar: '/api/placeholder/40/40',
      createdAt: '2024-01-18',
      trending: true,
      likes: 1890,
      views: 56700,
      isVerified: true
    },
    {
      id: 6,
      title: 'Clean Water Access',
      description: 'Providing clean, safe drinking water to communities in need across developing regions.',
      hashtag: '#WaterForLife',
      thumbnail: '/api/placeholder/400/300',
      participantCount: 21200,
      category: 'Humanitarian',
      creator: 'Water for Life',
      creatorAvatar: '/api/placeholder/40/40',
      createdAt: '2024-01-12',
      trending: false,
      likes: 1120,
      views: 38200,
      isVerified: false
    },
    {
      id: 7,
      title: 'Digital Literacy Program',
      description: 'Bridging the digital divide by teaching essential computer and internet skills to underserved communities.',
      hashtag: '#DigitalForAll',
      thumbnail: '/api/placeholder/400/300',
      participantCount: 14500,
      category: 'Technology',
      creator: 'TechBridge',
      creatorAvatar: '/api/placeholder/40/40',
      createdAt: '2024-01-08',
      trending: true,
      likes: 890,
      views: 28900,
      isVerified: true
    },
    {
      id: 8,
      title: 'Youth Sports Initiative',
      description: 'Promoting healthy lifestyles and teamwork through accessible sports programs for young people.',
      hashtag: '#PlayTogether',
      thumbnail: '/api/placeholder/400/300',
      participantCount: 19800,
      category: 'Sports',
      creator: 'Youth Sports Alliance',
      creatorAvatar: '/api/placeholder/40/40',
      createdAt: '2024-01-05',
      trending: false,
      likes: 1340,
      views: 42100,
      isVerified: false
    },
    {
      id: 9,
      title: 'Elderly Care Support',
      description: 'Supporting our seniors with companionship, healthcare assistance, and community engagement programs.',
      hashtag: '#CareForElders',
      thumbnail: '/api/placeholder/400/300',
      participantCount: 12300,
      category: 'Healthcare',
      creator: 'Senior Care Network',
      creatorAvatar: '/api/placeholder/40/40',
      createdAt: '2024-01-03',
      trending: false,
      likes: 780,
      views: 31500,
      isVerified: true
    },
    {
      id: 10,
      title: 'Arts in Schools',
      description: 'Bringing creative arts education back to schools through funding and volunteer programs.',
      hashtag: '#ArtsEducation',
      thumbnail: '/api/placeholder/400/300',
      participantCount: 16700,
      category: 'Education',
      creator: 'Creative Learning Foundation',
      creatorAvatar: '/api/placeholder/40/40',
      createdAt: '2024-01-01',
      trending: true,
      likes: 1560,
      views: 35800,
      isVerified: true
    },
    {
      id: 11,
      title: 'Urban Green Spaces',
      description: 'Creating and maintaining parks and gardens in urban areas to improve air quality and community wellbeing.',
      hashtag: '#GreenCities',
      thumbnail: '/api/placeholder/400/300',
      participantCount: 22100,
      category: 'Environment',
      creator: 'Urban Green Initiative',
      creatorAvatar: '/api/placeholder/40/40',
      createdAt: '2023-12-28',
      trending: false,
      likes: 1290,
      views: 46200,
      isVerified: false
    },
    {
      id: 12,
      title: 'Small Business Recovery',
      description: 'Helping local small businesses recover and thrive through mentorship and financial support programs.',
      hashtag: '#SmallBizStrong',
      thumbnail: '/api/placeholder/400/300',
      participantCount: 18900,
      category: 'Business',
      creator: 'Entrepreneur Support Hub',
      creatorAvatar: '/api/placeholder/40/40',
      createdAt: '2023-12-25',
      trending: true,
      likes: 2100,
      views: 52300,
      isVerified: true
    }
];

  // Simulate API loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Initialize filtered campaigns when campaigns load
  useEffect(() => {
    if (!isLoading) {
      setFilteredCampaigns(campaigns);
    }
    // campaigns is a module-scoped constant and won't change at runtime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // Filter campaigns based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCampaigns(campaigns);
    } else {
      const filtered = campaigns.filter(campaign => 
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.hashtag.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCampaigns(filtered);
    }
    // campaigns is static at module scope; safe to exclude from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  // Handle load more campaigns
  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setDisplayCount(prev => Math.min(prev + 6, filteredCampaigns.length));
      setIsLoadingMore(false);
    }, 1000);
  };

  // Reset display count when search changes
  useEffect(() => {
    setDisplayCount(6);
  }, [searchQuery]);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      title: 'Easy Design Tools',
      description: 'Create stunning frames with our intuitive editor in minutes',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      hoverBg: 'hover:bg-purple-100'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Social Media Ready',
      description: 'Optimized for all major social platforms with one-click sharing',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      hoverBg: 'hover:bg-blue-100'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Track Impact',
      description: 'Monitor your campaign reach with real-time analytics',
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      hoverBg: 'hover:bg-green-100'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Global Community',
      description: 'Join millions making a difference worldwide',
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      hoverBg: 'hover:bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-refined-white page-transition-fade">
      
      
      {/* Enhanced Hero Section with Advanced Animations */}
      <section className="hero-section">
        <div className="container-custom text-center">
          <h1 className="hero-title hero-title-animated">
            Show Your Support with
            <span className="text-gradient block">Custom Frames</span>
          </h1>
          
          <p className="hero-subtitle hero-subtitle-animated">
            Create and share campaign frames to unite communities and support causes you care about.
          </p>
          
          <div className="hero-cta-container hero-cta-animated">
            <Button 
              href="/create"
              variant="primary"
              size="large"
              animation="pulse"
              icon={
                <svg className="w-5 h-5 icon-hover-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Create Campaign
            </Button>
            
            <Button 
              href="/explore"
              variant="secondary"
              size="large"
              animation="scale"
              icon={
                <svg className="w-5 h-5 icon-hover-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            >
              Explore Campaigns
            </Button>
          </div>

          {/* Enhanced Feature Highlights */}
          <div className="hero-features-animated mt-8 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center animate-float interactive-element" style={{ animationDelay: '1.2s' }}>
              <svg className="w-4 h-4 mr-2 text-green-500 icon-hover-bounce" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Free to use
            </div>
            <div className="flex items-center animate-float interactive-element" style={{ animationDelay: '1.4s' }}>
              <svg className="w-4 h-4 mr-2 text-blue-500 icon-hover-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              Join 100K+ creators
            </div>
            <div className="flex items-center animate-float interactive-element" style={{ animationDelay: '1.6s' }}>
              <svg className="w-4 h-4 mr-2 text-purple-500 icon-hover-wiggle" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Instant sharing
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="mt-16 animate-bounce-in" style={{ animationDelay: '1.8s' }}>
            <button
              onClick={() => scrollToSection('stats-section')}
              className="inline-flex flex-col items-center text-gray-500 hover:text-primary-color transition-colors duration-300 group interactive-element"
              aria-label="Scroll to statistics section"
            >
              <span className="text-xs font-medium mb-2 opacity-75 group-hover:opacity-100 transition-opacity">Discover More</span>
              <div className="animate-pulse-slow">
                <svg 
                  className="w-6 h-6 animate-bounce icon-hover-bounce group-hover:icon-hover-pulse" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{ animationDelay: '2s' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-green-100 to-teal-100 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          {/* Section header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Millions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join our growing community of changemakers creating impact worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCounter
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
                gradient={stat.gradient}
                bgColor={stat.bgColor}
                duration={2000}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      {/* Popular Campaigns Section */}
      <section id="campaigns-section" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <h2 className="section-title">Popular Campaigns</h2>
          <p className="section-subtitle">
            Join thousands supporting these trending causes
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <SearchBar
              placeholder="Search campaigns by title, category, or creator..."
              onSearch={handleSearch}
              onClear={handleClearSearch}
              className="w-full"
            />
          </div>

          {/* Search Results Count */}
          {!isLoading && (
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600">
                {searchQuery ? (
                  <>
                    Showing <span className="font-semibold text-gray-900">{filteredCampaigns.length}</span> of{' '}
                    <span className="font-semibold text-gray-900">{campaigns.length}</span> campaigns
                    {searchQuery && (
                      <span className="ml-2">
                        for "<span className="font-medium text-primary-color">{searchQuery}</span>"
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    Showing all <span className="font-semibold text-gray-900">{campaigns.length}</span> campaigns
                  </>
                )}
              </p>
            </div>
          )}

          {/* Enhanced Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8">
            {isLoading ? (
              // Show 6 skeleton cards with staggered animation
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="animate-fade-in h-full"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <CampaignCard isLoading={true} />
                </div>
              ))
            ) : filteredCampaigns.length > 0 ? (
              // Show filtered campaign cards with staggered animation (limited by displayCount)
              filteredCampaigns.slice(0, displayCount).map((campaign, index) => (
                <div
                  key={campaign.id}
                  className="animate-slide-up h-full"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  <CampaignCard campaign={campaign} searchTerm={searchQuery} />
                </div>
              ))
            ) : (
              // No results state
              <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns found</h3>
                <p className="text-gray-600 text-center mb-6 max-w-md">
                  We couldn't find any campaigns matching "{searchQuery}". Try adjusting your search terms or browse all campaigns.
                </p>
                <button
                  onClick={handleClearSearch}
                  className="btn-secondary"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {!isLoading && filteredCampaigns.length > displayCount && (
            <div className="text-center mt-12">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                size="large"
                loading={isLoadingMore}
                className="min-w-[200px]"
              >
                {isLoadingMore ? 'Loading...' : `Load More (${filteredCampaigns.length - displayCount} remaining)`}
              </Button>
              
              {/* Progress indicator */}
              <div className="mt-4 flex items-center justify-center">
                <div className="text-sm text-gray-500">
                  Showing {displayCount} of {filteredCampaigns.length} campaigns
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-2 max-w-xs mx-auto">
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-color h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(displayCount / filteredCampaigns.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              href="/explore"
              variant="outline"
              size="large"
              animation="scale"
              className="btn-micro-bounce"
              icon={
                <svg className="w-5 h-5 icon-hover-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              }
            >
              View All Campaigns
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl -translate-x-1/2"></div>
          <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-gradient-to-br from-orange-100 to-red-100 rounded-full blur-3xl translate-x-1/2"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Framely?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to create impactful campaigns that inspire action and drive meaningful change
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card-enhanced group ${feature.bgColor} ${feature.hoverBg} animate-slide-up interactive-element`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className={`feature-icon-enhanced bg-gradient-to-br ${feature.gradient} text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="feature-title-enhanced group-hover:text-gray-900 transition-colors duration-300">{feature.title}</h3>
                <p className="feature-description-enhanced group-hover:text-gray-700 transition-colors duration-300">{feature.description}</p>
                
                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-300 pointer-events-none"></div>
                
                {/* Floating decoration */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta-section" className="py-20 gradient-hero text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto animate-slide-up">
            Start your campaign today and inspire others to join your cause
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button
              href="/create"
              variant="primary"
              size="large"
              animation="pulse"
              className="bg-white text-primary-color hover:shadow-xl-enhanced"
              style={{ color: 'var(--primary-color)' }}
              icon={
                <svg className="w-5 h-5 icon-hover-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            >
              Get Started Free
            </Button>
            <Button
              href="/about"
              variant="outline"
              size="large"
              animation="scale"
              className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary-color"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      
    </div>
  );
}