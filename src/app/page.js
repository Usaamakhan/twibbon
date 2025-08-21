'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const stats = [
    { value: '50K+', label: 'Active Campaigns', icon: '🎯', color: 'gradient-purple' },
    { value: '2M+', label: 'Frames Created', icon: '🖼️', color: 'gradient-blue' },
    { value: '100K+', label: 'Happy Creators', icon: '✨', color: 'gradient-pink' },
    { value: '150+', label: 'Countries', icon: '🌍', color: 'gradient-green' }
  ];

  const features = [
    {
      title: 'Easy to Create',
      description: 'Design stunning campaign frames in minutes with our intuitive editor',
      icon: '🎨',
      color: 'gradient-purple'
    },
    {
      title: 'Wide Reach',
      description: 'Share your campaign across all social media platforms instantly',
      icon: '📱',
      color: 'gradient-blue'
    },
    {
      title: 'Real-time Analytics',
      description: 'Track your campaign performance with detailed insights',
      icon: '📊',
      color: 'gradient-orange'
    },
    {
      title: 'Community Support',
      description: 'Join thousands of creators making an impact worldwide',
      icon: '🤝',
      color: 'gradient-green'
    }
  ];

  const campaigns = [
    {
      id: 1,
      title: 'Climate Action Now',
      creator: 'GreenEarth',
      participants: '12.5K',
      color: 'gradient-green'
    },
    {
      id: 2,
      title: 'Education for All',
      creator: 'LearnTogether',
      participants: '8.3K',
      color: 'gradient-blue'
    },
    {
      id: 3,
      title: 'Mental Health Matters',
      creator: 'MindfulLife',
      participants: '15.7K',
      color: 'gradient-purple'
    }
  ];

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-purple">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2) 0%, transparent 50%)`
            }}
          />
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float backdrop-blur-md" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/3 right-1/3 w-64 h-64 gradient-pink opacity-20 rounded-full animate-spin-slow blur-3xl" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="py-24 lg:py-36">
            <div className="text-center max-w-5xl mx-auto">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 animate-fade-in text-shadow-lg">
                Create Amazing
                <span className="block mt-4 text-gradient" style={{ 
                  background: 'linear-gradient(135deg, #FFD89B 0%, #19547B 100%)', 
                  WebkitBackgroundClip: 'text', 
                  backgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent' 
                }}>
                  Campaign Frames
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 animate-slide-up max-w-3xl mx-auto">
                Join millions using Twibbon to support causes they care about
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
                <Link 
                  href="/create"
                  className="group inline-flex items-center justify-center bg-white text-primary-600 px-10 py-5 rounded-full text-lg font-bold shadow-neon hover-lift transition-all relative overflow-hidden"
                >
                  <span className="relative z-10">Start Creating</span>
                  <svg className="ml-3 w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                </Link>
                <Link 
                  href="/explore"
                  className="group inline-flex items-center justify-center glass text-white border-2 border-white/50 px-10 py-5 rounded-full text-lg font-bold hover-grow transition-all backdrop-blur-md"
                >
                  Explore Campaigns
                  <svg className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-24">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 relative">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group text-center hover-lift cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-20 h-20 mx-auto mb-4 ${stat.color} rounded-2xl flex items-center justify-center text-4xl shadow-colored group-hover:animate-bounce`}>
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 gradient-purple opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 gradient-blue opacity-5 rounded-full blur-3xl" />
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose <span className="text-gradient">Twibbon?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create impactful campaigns and unite communities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover-lift shadow-soft hover:shadow-colored transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-purple-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className={`w-16 h-16 mb-6 ${feature.color} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform shadow-colored`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trending <span className="text-gradient">Campaigns</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join these popular movements and make your voice heard
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign, index) => (
              <Link 
                key={campaign.id}
                href={`/campaign/${campaign.id}`}
                className="group relative bg-white rounded-3xl overflow-hidden hover-lift shadow-soft transition-all duration-500"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`aspect-video ${campaign.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-7xl group-hover:scale-125 transition-transform duration-500">🎯</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-bold text-gray-900">TRENDING</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {campaign.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 font-medium">by {campaign.creator}</span>
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                      <span className="font-bold">{campaign.participants}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/explore"
              className="inline-flex items-center justify-center gradient-purple text-white px-10 py-5 rounded-full text-lg font-bold shadow-colored hover-lift transition-all group"
            >
              View All Campaigns
              <svg className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-purple relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-float" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
        
        <div className="container-custom text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto animate-slide-up">
            Create your first campaign frame in minutes and start building your community
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
            <Link 
              href="/signup"
              className="group inline-flex items-center justify-center bg-white text-primary-600 px-10 py-5 rounded-full text-lg font-bold shadow-neon hover-lift transition-all"
            >
              Get Started Free
              <svg className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
            <Link 
              href="/about"
              className="inline-flex items-center justify-center glass text-white border-2 border-white px-10 py-5 rounded-full text-lg font-bold hover-grow transition-all backdrop-blur-md"
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