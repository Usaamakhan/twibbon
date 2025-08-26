'use client';

import { useState } from 'react';
import Link from 'next/link';
// Header and Footer are provided by root layout

const allCampaigns = [
  {
    id: 1,
    title: "World Environment Day 2024",
    description: "Join the global movement to protect our planet",
    hashtag: "#WorldEnvironmentDay",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 15200,
    category: "Environment",
    creator: "GreenPeace",
    isVerified: true,
    isTrending: true
  },
  {
    id: 2,
    title: "Support Local Businesses",
    description: "Show love for your local community",
    hashtag: "#SupportLocal",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 8560,
    category: "Community",
    creator: "Local Chamber",
    isVerified: true,
    isTrending: false
  },
  {
    id: 3,
    title: "Mental Health Awareness",
    description: "Break the stigma, spread awareness",
    hashtag: "#MentalHealthMatters",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 23410,
    category: "Health",
    creator: "MindCare Foundation",
    isVerified: true,
    isTrending: true
  },
  {
    id: 4,
    title: "Education for All",
    description: "Every child deserves quality education",
    hashtag: "#EducationForAll",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 9870,
    category: "Education",
    creator: "UNICEF",
    isVerified: true,
    isTrending: false
  },
  {
    id: 5,
    title: "Climate Action Now",
    description: "Take action against climate change",
    hashtag: "#ClimateAction",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 32500,
    category: "Environment",
    creator: "Climate Warriors",
    isVerified: false,
    isTrending: true
  },
  {
    id: 6,
    title: "Women's Rights",
    description: "Empowering women worldwide",
    hashtag: "#WomensRights",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 28900,
    category: "Social Justice",
    creator: "Women United",
    isVerified: true,
    isTrending: true
  },
  {
    id: 7,
    title: "Tech for Good",
    description: "Using technology to make the world better",
    hashtag: "#TechForGood",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 5600,
    category: "Technology",
    creator: "Tech Innovators",
    isVerified: false,
    isTrending: false
  },
  {
    id: 8,
    title: "Animal Rights",
    description: "Protect animals, save lives",
    hashtag: "#AnimalRights",
    thumbnail: "/api/placeholder/300/200",
    participantCount: 18700,
    category: "Environment",
    creator: "PETA",
    isVerified: true,
    isTrending: false
  }
];

const categories = ['All', 'Environment', 'Health', 'Education', 'Community', 'Social Justice', 'Technology'];
const sortOptions = ['Trending', 'Most Popular', 'Newest', 'Most Participants'];

export default function ExplorePage() {
  const [filteredCampaigns, setFilteredCampaigns] = useState(allCampaigns);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

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

    if (query) {
      filtered = filtered.filter(campaign => 
        campaign.title.toLowerCase().includes(query.toLowerCase()) ||
        campaign.description.toLowerCase().includes(query.toLowerCase()) ||
        campaign.hashtag.toLowerCase().includes(query.toLowerCase()) ||
        campaign.creator.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (category !== 'All') {
      filtered = filtered.filter(campaign => campaign.category === category);
    }

    switch (sort) {
      case 'Most Popular':
        filtered.sort((a, b) => b.participantCount - a.participantCount);
        break;
      case 'Trending':
        filtered = filtered.sort((a, b) => {
          if (a.isTrending && !b.isTrending) return -1;
          if (!a.isTrending && b.isTrending) return 1;
          return b.participantCount - a.participantCount;
        });
        break;
      case 'Most Participants':
        filtered.sort((a, b) => b.participantCount - a.participantCount);
        break;
      case 'Newest':
      default:
        break;
    }

    setFilteredCampaigns(filtered);
  };

  const formatParticipants = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      
      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Campaigns
          </h1>
          <p className="text-lg text-gray-600">
            Discover amazing campaigns from creators around the world
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-8">
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent focus:bg-white transition-all"
              />
              <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
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

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            Filters & Sort
          </button>

          <div className={`${showFilters ? 'block' : 'hidden'} md:flex flex-col md:flex-row md:items-center md:justify-between gap-4`}>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-200 bg-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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

        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredCampaigns.length}</span> campaigns
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` for "${searchQuery}"`}
          </p>
        </div>

        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCampaigns.map((campaign) => (
              <Link
                key={campaign.id}
                href={`/campaign/${campaign.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100"
              >
                <div className="relative aspect-video bg-gradient-to-br from-primary-400 to-purple-400">
                  {campaign.isTrending && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                      Trending
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-5xl opacity-50 group-hover:opacity-100 transition-opacity">
                      🖼️
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {campaign.title}
                    </h3>
                    {campaign.isVerified && (
                      <svg className="w-5 h-5 text-primary-500 flex-shrink-0 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {campaign.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      by {campaign.creator}
                    </span>
                    <div className="flex items-center gap-1 text-gray-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                      <span className="font-semibold">{formatParticipants(campaign.participantCount)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-primary-600 font-medium">
                      {campaign.hashtag}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl">
            <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSortBy('Trending');
                setFilteredCampaigns(allCampaigns);
              }}
              className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {filteredCampaigns.length > 0 && (
          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition-colors">
              Load More Campaigns
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}
      </main>

      
    </div>
  );
}