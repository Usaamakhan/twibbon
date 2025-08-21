'use client';

import Link from 'next/link';
import CampaignCard from './CampaignCard';

// Mock data - will be replaced with real data from API
const featuredCampaigns = [
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
  }
];

export default function FeaturedCampaigns() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Campaigns
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most impactful campaigns making waves across the community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/explore" 
            className="inline-flex items-center btn-primary"
          >
            View All Campaigns
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}