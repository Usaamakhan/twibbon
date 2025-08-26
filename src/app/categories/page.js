'use client';

import { useState } from 'react';
import Link from 'next/link';
// Header and Footer are provided by root layout

export default function CategoriesPage() {
  const categories = [
    {
      name: 'Environment',
      icon: '🌍',
      color: 'from-green-500 to-emerald-600',
      description: 'Climate action, conservation, and sustainability',
      campaignCount: 342,
      trending: ['#ClimateAction', '#SaveOceans', '#GoGreen']
    },
    {
      name: 'Health',
      icon: '❤️',
      color: 'from-red-500 to-pink-600',
      description: 'Healthcare, mental wellness, and medical causes',
      campaignCount: 289,
      trending: ['#MentalHealthMatters', '#Healthcare', '#Wellness']
    },
    {
      name: 'Education',
      icon: '📚',
      color: 'from-blue-500 to-indigo-600',
      description: 'Learning, literacy, and academic support',
      campaignCount: 256,
      trending: ['#EducationForAll', '#Learning', '#Students']
    },
    {
      name: 'Social Justice',
      icon: '⚖️',
      color: 'from-purple-500 to-pink-600',
      description: 'Equality, human rights, and social causes',
      campaignCount: 198,
      trending: ['#Equality', '#HumanRights', '#Justice']
    },
    {
      name: 'Community',
      icon: '🤝',
      color: 'from-yellow-500 to-orange-600',
      description: 'Local initiatives and community support',
      campaignCount: 176,
      trending: ['#Community', '#LocalSupport', '#Together']
    },
    {
      name: 'Technology',
      icon: '💻',
      color: 'from-cyan-500 to-blue-600',
      description: 'Digital innovation and tech for good',
      campaignCount: 134,
      trending: ['#TechForGood', '#Innovation', '#Digital']
    },
    {
      name: 'Arts & Culture',
      icon: '🎨',
      color: 'from-pink-500 to-purple-600',
      description: 'Creative expression and cultural preservation',
      campaignCount: 167,
      trending: ['#Art', '#Culture', '#Creative']
    },
    {
      name: 'Sports',
      icon: '⚽',
      color: 'from-green-500 to-teal-600',
      description: 'Athletic events and sports initiatives',
      campaignCount: 98,
      trending: ['#Sports', '#Fitness', '#Athletes']
    },
    {
      name: 'Animal Welfare',
      icon: '🐾',
      color: 'from-orange-500 to-red-600',
      description: 'Animal rights and wildlife protection',
      campaignCount: 145,
      trending: ['#AnimalRights', '#Wildlife', '#Pets']
    },
    {
      name: 'Business',
      icon: '💼',
      color: 'from-gray-600 to-gray-800',
      description: 'Entrepreneurship and business initiatives',
      campaignCount: 89,
      trending: ['#Business', '#Startup', '#Entrepreneur']
    },
    {
      name: 'Food & Agriculture',
      icon: '🌾',
      color: 'from-amber-500 to-yellow-600',
      description: 'Food security and sustainable farming',
      campaignCount: 112,
      trending: ['#FoodSecurity', '#Farming', '#Sustainable']
    },
    {
      name: 'Emergency Relief',
      icon: '🚨',
      color: 'from-red-600 to-red-800',
      description: 'Disaster response and emergency aid',
      campaignCount: 67,
      trending: ['#Emergency', '#Relief', '#Aid']
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      
      <main className="container-custom py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find campaigns that matter to you across different causes and interests
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredCategories.map((category) => (
            <Link
              key={category.name}
              href={`/explore?category=${encodeURIComponent(category.name)}`}
              className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all transform hover:scale-105 border border-gray-100"
            >
              <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center relative overflow-hidden`}>
                <span className="text-5xl z-10">{category.icon}</span>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
              
              <div className="p-5">
                <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="font-semibold text-gray-900">
                    {category.campaignCount} campaigns
                  </span>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {category.trending.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search query</p>
            <button
              onClick={() => setSearchQuery('')}
              className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Can't find your category?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Start your own campaign and create a movement that matters to you
          </p>
          <Link
            href="/create"
            className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            Create Campaign
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </Link>
        </div>
      </main>

      
    </div>
  );
}