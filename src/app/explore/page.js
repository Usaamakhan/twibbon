'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CampaignCard from '@/components/CampaignCard';

// Mock data - will be replaced with API calls
const allCampaigns = [
  {
    id: 1,
    title: "World Environment Day 2024",
    description: "Join the global movement to protect our planet",
    hashtag: "#WorldEnvironmentDay",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 1520,
    category: "Environment",
    creator: "GreenPeace"
  },
  {
    id: 2,
    title: "Support Local Businesses",
    description: "Show love for your local community",
    hashtag: "#SupportLocal",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 856,
    category: "Community",
    creator: "Local Chamber"
  },
  {
    id: 3,
    title: "Mental Health Awareness",
    description: "Break the stigma, spread awareness",
    hashtag: "#MentalHealthMatters",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 2341,
    category: "Health",
    creator: "MindCare Foundation"
  },
  {
    id: 4,
    title: "Education for All",
    description: "Every child deserves quality education",
    hashtag: "#EducationForAll",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 987,
    category: "Education",
    creator: "UNICEF"
  },
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
  }
];

const categories = ['All', 'Environment', 'Health', 'Education', 'Community', 'Social Justice', 'Technology'];
const sortOptions = ['Newest', 'Most Popular', 'Trending', 'Most Participants'];

export default function ExplorePage() {
  const [campaigns, setCampaigns] = useState(allCampaigns);
  const [filteredCampaigns, setFilteredCampaigns] = useState(allCampaigns);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    filterAndSort(searchQuery, category, sortBy);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    filterAndSort(searchQuery, selectedCategory, newSortBy);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterAndSort(query, selectedCategory, sortBy);
  };

  const filterAndSort = (query, category, sort) => {
    let filtered = [...allCampaigns];

    // Filter by search query
    if (query) {
      filtered = filtered.filter(campaign => 
        campaign.title.toLowerCase().includes(query.toLowerCase()) ||
        campaign.description.toLowerCase().includes(query.toLowerCase()) ||
        campaign.hashtag.toLowerCase().includes(query.toLowerCase()) ||
        campaign.creator.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (category !== 'All') {
      filtered = filtered.filter(campaign => campaign.category === category);
    }

    // Sort
    switch (sort) {
      case 'Most Popular':
        filtered.sort((a, b) => b.participantCount - a.participantCount);
        break;
      case 'Trending':
        // Mock trending logic (in real app, this would be based on recent activity)
        filtered.sort((a, b) => b.participantCount - a.participantCount);
        break;
      case 'Most Participants':
        filtered.sort((a, b) => b.participantCount - a.participantCount);
        break;
      case 'Newest':
      default:
        // Keep original order for newest
        break;
    }

    setFilteredCampaigns(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Campaigns
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing campaigns from creators around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search campaigns, hashtags, or creators..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCampaigns.length} campaigns
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {/* Campaign Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSortBy('Newest');
                setFilteredCampaigns(allCampaigns);
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}