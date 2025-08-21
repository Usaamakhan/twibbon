'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TrendingPage() {
  const [timeRange, setTimeRange] = useState('today');

  const trendingCampaigns = [
    {
      id: 1,
      title: "Climate Action Now",
      description: "Join the global movement against climate change",
      hashtag: "#ClimateAction",
      participantCount: 45230,
      growth: "+2.5K",
      rank: 1,
      category: "Environment",
      creator: "Climate Warriors",
      isVerified: true
    },
    {
      id: 2,
      title: "Mental Health Matters",
      description: "Breaking the stigma around mental health",
      hashtag: "#MentalHealthMatters",
      participantCount: 38450,
      growth: "+1.8K",
      rank: 2,
      category: "Health",
      creator: "MindCare Foundation",
      isVerified: true
    },
    {
      id: 3,
      title: "Women's Rights",
      description: "Empowering women worldwide",
      hashtag: "#WomensRights",
      participantCount: 32100,
      growth: "+1.2K",
      rank: 3,
      category: "Social Justice",
      creator: "Women United",
      isVerified: true
    },
    {
      id: 4,
      title: "Education for All",
      description: "Every child deserves quality education",
      hashtag: "#EducationForAll",
      participantCount: 28900,
      growth: "+890",
      rank: 4,
      category: "Education",
      creator: "UNICEF",
      isVerified: true
    },
    {
      id: 5,
      title: "Ocean Cleanup",
      description: "Save our oceans from plastic pollution",
      hashtag: "#OceanCleanup",
      participantCount: 24500,
      growth: "+750",
      rank: 5,
      category: "Environment",
      creator: "Ocean Heroes",
      isVerified: false
    }
  ];

  const topCreators = [
    { name: "GreenPeace", campaigns: 12, followers: "125K" },
    { name: "UNICEF", campaigns: 8, followers: "98K" },
    { name: "Climate Warriors", campaigns: 15, followers: "87K" },
    { name: "MindCare Foundation", campaigns: 6, followers: "65K" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            🔥 Trending Campaigns
          </h1>
          <p className="text-lg text-gray-600">
            Discover what's popular right now
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {['today', 'week', 'month', 'all'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range === 'all' ? 'All Time' : `This ${range}`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {trendingCampaigns.map((campaign) => (
                <Link
                  key={campaign.id}
                  href={`/campaign/${campaign.id}`}
                  className="block bg-white rounded-xl p-6 hover:shadow-lg transition-all border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg
                        ${campaign.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 
                          campaign.rank === 2 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                          campaign.rank === 3 ? 'bg-gradient-to-r from-orange-600 to-orange-700' :
                          'bg-gray-400'}`}>
                        {campaign.rank}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 hover:text-primary-600 transition-colors flex items-center gap-2">
                            {campaign.title}
                            {campaign.isVerified && (
                              <svg className="w-5 h-5 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
                        </div>
                        <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                          {campaign.growth}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-gray-500">by {campaign.creator}</span>
                          <span className="text-primary-600 font-medium">{campaign.hashtag}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                          </svg>
                          <span className="font-semibold">{(campaign.participantCount / 1000).toFixed(1)}K</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button className="inline-flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition-colors">
                Load More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">🏆 Top Creators</h3>
              <div className="space-y-4">
                {topCreators.map((creator, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-400 to-purple-400 flex items-center justify-center text-white font-semibold">
                        {creator.name[0]}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{creator.name}</p>
                        <p className="text-xs text-gray-500">{creator.campaigns} campaigns</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-600">{creator.followers}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-2">Start Your Campaign</h3>
              <p className="text-sm mb-4 opacity-90">Join thousands of creators making an impact</p>
              <Link href="/create" className="inline-flex items-center justify-center bg-white text-primary-600 px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all">
                Create Now
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">📈 Trending Hashtags</h3>
              <div className="flex flex-wrap gap-2">
                {['#ClimateAction', '#MentalHealth', '#Education', '#WomensRights', '#SaveOceans'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}