'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import CampaignCard from '@/components/CampaignCard';
import TopCreators from '@/components/TopCreators';

export default function HomePage() {
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - replace with actual API calls
  const mockCampaigns = [
    {
      id: 1,
      title: 'PBSA',
      creator: 'Ali Raza Naqve',
      supporters: 60,
      image: '/api/placeholder/300/300',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 2,
      title: 'Fathe e Rabwa Golden Jubilee',
      creator: 'MajliseAhrar',
      supporters: 84,
      image: '/api/placeholder/300/300',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 3,
      title: 'Fintech',
      creator: 'Junaid Sabri',
      supporters: 12,
      image: '/api/placeholder/300/300',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 4,
      title: 'Digital Innovation Summit',
      creator: 'Tech Leaders',
      supporters: 156,
      image: '/api/placeholder/300/300',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 5,
      title: 'Green Earth Initiative',
      creator: 'Environmental Group',
      supporters: 89,
      image: '/api/placeholder/300/300',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: 6,
      title: 'Youth Empowerment',
      creator: 'Future Leaders',
      supporters: 234,
      image: '/api/placeholder/300/300',
      avatar: '/api/placeholder/40/40'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setCampaigns(mockCampaigns);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-modern" style={{ marginTop: '-80px', paddingTop: '80px' }}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              show your
              <br />
              <span className="hero-title-handwritten">supports</span>
            </h1>
            <p className="hero-subtitle">
              Turn your passion into action; create custom images that show what you stand for and invite friends to join you
            </p>
            <Link href="/create" className="btn btn-primary">
              + Start a Campaign
            </Link>
          </div>
        </div>
        
        {/* Hero Mockups */}
        <div className="hero-mockups">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Campaign frame mockups would go here */}
            <div className="grid grid-cols-2 gap-4 transform rotate-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-32 h-32 bg-white rounded-lg shadow-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="section-modern">
        <div className="section-header">
          <div>
            <h2 className="section-title">Trending</h2>
            <p className="section-subtitle">Most Supported Campaigns in the Last 24 Hours</p>
          </div>
          <Link href="/explore" className="btn btn-secondary">
            Explore More →
          </Link>
        </div>

        <div className="grid-campaigns">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card card-campaign animate-pulse">
                <div className="card-campaign-image bg-gray-200"></div>
                <div className="card-campaign-content">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))
          ) : (
            campaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))
          )}
        </div>
      </section>

      {/* Top Creators Section */}
      <section className="section-modern bg-gray-50">
        <div className="section-header">
          <div>
            <h2 className="section-title">Top Creators</h2>
          </div>
          <div className="section-nav">
            <span className="section-nav-item active">7 days</span>
            <span className="section-nav-item">30 days</span>
            <span className="section-nav-item">All</span>
            <Link href="/creators" className="btn btn-secondary">View All →</Link>
          </div>
        </div>

        <TopCreators />
      </section>
    </div>
  );
}
