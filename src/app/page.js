'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { value: '50K+', label: 'Active Campaigns', icon: '🎯' },
    { value: '2M+', label: 'Frames Created', icon: '🖼️' },
    { value: '100K+', label: 'Happy Creators', icon: '✨' },
    { value: '150+', label: 'Countries', icon: '🌍' }
  ];

  const features = [
    {
      title: 'Easy to Create',
      description: 'Design stunning campaign frames in minutes with our intuitive editor',
      icon: '🎨'
    },
    {
      title: 'Wide Reach',
      description: 'Share your campaign across all social media platforms instantly',
      icon: '📱'
    },
    {
      title: 'Real-time Analytics',
      description: 'Track your campaign performance with detailed insights',
      icon: '📊'
    },
    {
      title: 'Community Support',
      description: 'Join thousands of creators making an impact worldwide',
      icon: '🤝'
    }
  ];

  const campaigns = [
    {
      id: 1,
      title: 'Climate Action Now',
      creator: 'GreenEarth',
      participants: '12.5K',
      image: '/api/placeholder/400/300'
    },
    {
      id: 2,
      title: 'Education for All',
      creator: 'LearnTogether',
      participants: '8.3K',
      image: '/api/placeholder/400/300'
    },
    {
      id: 3,
      title: 'Mental Health Matters',
      creator: 'MindfulLife',
      participants: '15.7K',
      image: '/api/placeholder/400/300'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600">
        <div 
          className="absolute inset-0 bg-black opacity-10"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        <div className="container-custom relative">
          <div className="py-20 lg:py-32">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
                Create Amazing
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300">
                  Campaign Frames
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-10 animate-slide-up">
                Join millions using Twibbon to support causes they care about
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <Link 
                  href="/create"
                  className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  Start Creating
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  href="/explore"
                  className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm text-white border-2 border-white/50 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/30 transition-all"
                >
                  Explore Campaigns
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-pink-400 rounded-full opacity-20 animate-pulse" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Twibbon?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create impactful campaigns and unite communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white p-8 rounded-2xl border border-gray-200 hover:border-primary-500 hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trending Campaigns
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join these popular movements and make your voice heard
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <Link 
                key={campaign.id}
                href={`/campaign/${campaign.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <div className="aspect-video bg-gradient-to-br from-primary-400 to-purple-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-6xl">🎯</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {campaign.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>by {campaign.creator}</span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                      {campaign.participants}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/explore"
              className="inline-flex items-center justify-center bg-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-700 hover:shadow-xl transform hover:scale-105 transition-all"
            >
              View All Campaigns
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Create your first campaign frame in minutes and start building your community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup"
              className="inline-flex items-center justify-center bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all"
            >
              Get Started Free
            </Link>
            <Link 
              href="/about"
              className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}