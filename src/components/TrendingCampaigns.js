'use client';

import { useState } from 'react';
import CampaignCard from './CampaignCard';

// Mock trending data
const trendingCampaigns = [
  {
    id: 5,
    title: "Climate Action Now",
    description: "Take action against climate change",
    hashtag: "#ClimateAction",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 3250,
    category: "Environment",
    creator: "Climate Warriors"
  },
  {
    id: 6,
    title: "Women's Rights",
    description: "Empowering women worldwide",
    hashtag: "#WomensRights",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 2890,
    category: "Social Justice",
    creator: "Women United"
  },
  {
    id: 7,
    title: "Tech for Good",
    description: "Technology serving humanity",
    hashtag: "#TechForGood",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 1456,
    category: "Technology",
    creator: "Tech Innovators"
  }
];

const categories = [
  'All',
  'Environment',
  'Social Justice',
  'Health',
  'Education',
  'Technology',
  'Community'
];

export default function TrendingCampaigns() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredCampaigns, setFilteredCampaigns] = useState(trendingCampaigns);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredCampaigns(trendingCampaigns);
    } else {
      setFilteredCampaigns(
        trendingCampaigns.filter(campaign => campaign.category === category)
      );
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trending Now
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join the campaigns that are making the biggest impact right now
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Trending Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        {/* Show message if no campaigns found */}
        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
}