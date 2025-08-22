'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const stats = [
    { value: '50K+', label: 'Active Campaigns' },
    { value: '2M+', label: 'Frames Created' },
    { value: '100K+', label: 'Happy Users' },
    { value: '150+', label: 'Countries' }
  ];

  const campaigns = [
    {
      id: 1,
      title: 'Save Our Planet',
      creator: 'GreenEarth Initiative',
      participants: '25.3K',
      image: null,
      category: 'Environment'
    },
    {
      id: 2,
      title: 'Education for All',
      creator: 'Learn Together',
      participants: '18.7K',
      image: null,
      category: 'Education'
    },
    {
      id: 3,
      title: 'Mental Health Awareness',
      creator: 'Mind Matters',
      participants: '32.1K',
      image: null,
      category: 'Health'
    },
    {
      id: 4,
      title: 'Support Local Business',
      creator: 'Community First',
      participants: '15.9K',
      image: null,
      category: 'Community'
    },
    {
      id: 5,
      title: 'Women Empowerment',
      creator: 'She Rises',
      participants: '28.4K',
      image: null,
      category: 'Social'
    },
    {
      id: 6,
      title: 'Clean Water Access',
      creator: 'Water for Life',
      participants: '21.2K',
      image: null,
      category: 'Humanitarian'
    }
  ];

  const features = [
    {
      icon: '🎨',
      title: 'Easy Design Tools',
      description: 'Create stunning frames with our intuitive editor in minutes'
    },
    {
      icon: '📱',
      title: 'Social Media Ready',
      description: 'Optimized for all major social platforms with one-click sharing'
    },
    {
      icon: '📊',
      title: 'Track Impact',
      description: 'Monitor your campaign reach with real-time analytics'
    },
    {
      icon: '🌍',
      title: 'Global Community',
      description: 'Join millions making a difference worldwide'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-section bg-gradient-subtle">
        <div className="container-custom text-center">
          <h1 className="hero-title animate-fade-in">
            Show Your Support with
            <span className="text-gradient block">Custom Twibbons</span>
          </h1>
          
          <p className="hero-subtitle animate-slide-up">
            Create and share campaign frames to unite communities and support causes you care about.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Link 
              href="/create"
              className="btn-primary"
              style={{ 
                background: 'var(--primary-color)',
                padding: '14px 32px',
                fontSize: '16px'
              }}
            >
              Create Twibbon
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Link>
            <Link 
              href="/explore"
              className="btn-secondary"
              style={{ 
                padding: '14px 32px',
                fontSize: '16px'
              }}
            >
              Explore Campaigns
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Campaigns Section */}
      <section className="section bg-background-secondary">
        <div className="container-custom">
          <h2 className="section-title">Popular Campaigns</h2>
          <p className="section-subtitle">
            Join thousands supporting these trending causes
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign, index) => (
              <Link 
                key={campaign.id}
                href={`/campaign/${campaign.id}`}
                className="card-campaign group animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="campaign-image">
                  <span className="text-6xl opacity-20 group-hover:scale-110 transition-transform">
                    {campaign.category === 'Environment' ? '🌱' :
                     campaign.category === 'Education' ? '📚' :
                     campaign.category === 'Health' ? '💚' :
                     campaign.category === 'Community' ? '🤝' :
                     campaign.category === 'Social' ? '✊' : '💧'}
                  </span>
                  <div className="campaign-badge">
                    {campaign.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-color transition-colors">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    by {campaign.creator}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">{campaign.participants}</span>
                    </div>
                    <span className="text-primary-color text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/explore"
              className="btn-outline"
              style={{ 
                padding: '12px 32px',
                fontSize: '15px'
              }}
            >
              View All Campaigns
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="section-title">Why Choose Twibbonize?</h2>
          <p className="section-subtitle">
            Everything you need to create impactful campaigns
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="feature-card animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fade-in">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto animate-slide-up">
            Start your campaign today and inspire others to join your cause
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Link 
              href="/create"
              className="inline-flex items-center justify-center bg-white text-primary-color px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all"
              style={{ color: 'var(--primary-color)' }}
            >
              Get Started Free
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Link>
            <Link 
              href="/about"
              className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-primary-color transition-all"
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