'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HelpPage() {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const helpCategories = {
    'getting-started': {
      title: 'Getting Started',
      icon: '🚀',
      articles: [
        { title: 'How to create your first campaign', id: 1 },
        { title: 'Understanding campaign settings', id: 2 },
        { title: 'Uploading and editing frames', id: 3 },
        { title: 'Sharing your campaign', id: 4 }
      ]
    },
    'account': {
      title: 'Account & Profile',
      icon: '👤',
      articles: [
        { title: 'Creating an account', id: 5 },
        { title: 'Managing your profile', id: 6 },
        { title: 'Privacy settings', id: 7 },
        { title: 'Password recovery', id: 8 }
      ]
    },
    'campaigns': {
      title: 'Campaign Management',
      icon: '📋',
      articles: [
        { title: 'Campaign analytics', id: 9 },
        { title: 'Editing active campaigns', id: 10 },
        { title: 'Campaign moderation', id: 11 },
        { title: 'Ending a campaign', id: 12 }
      ]
    },
    'technical': {
      title: 'Technical Support',
      icon: '⚙️',
      articles: [
        { title: 'Image requirements', id: 13 },
        { title: 'Browser compatibility', id: 14 },
        { title: 'Mobile app features', id: 15 },
        { title: 'API documentation', id: 16 }
      ]
    },
    'billing': {
      title: 'Billing & Payments',
      icon: '💳',
      articles: [
        { title: 'Pricing plans', id: 17 },
        { title: 'Payment methods', id: 18 },
        { title: 'Refund policy', id: 19 },
        { title: 'Invoice management', id: 20 }
      ]
    }
  };

  const faqs = [
    {
      question: 'How do I create a Framely campaign?',
      answer: 'Creating a campaign is easy! Click on "Create Campaign" in the navigation, upload your frame design, add campaign details like title and description, and publish. Your campaign will be live immediately.'
    },
    {
      question: 'What image formats are supported?',
      answer: 'We support PNG, JPG, and GIF formats. For best results, use PNG with transparent backgrounds for frame overlays. Images should be at least 1080x1080 pixels.'
    },
    {
      question: 'Is Framely free to use?',
      answer: 'Yes! Basic features are completely free. We also offer premium plans with advanced analytics, custom branding, and priority support for professional creators.'
    },
    {
      question: 'How can I track my campaign performance?',
      answer: 'Access your dashboard to view real-time analytics including participant count, social shares, geographic distribution, and engagement metrics.'
    },
    {
      question: 'Can I edit my campaign after publishing?',
      answer: 'Yes, you can edit campaign details like description and hashtags anytime. However, the frame image cannot be changed once participants have joined.'
    }
  ];

  const filteredArticles = () => {
    if (!searchQuery) return [];
    
    const results = [];
    Object.values(helpCategories).forEach(category => {
      category.articles.forEach(article => {
        if (article.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({ ...article, category: category.title });
        }
      });
    });
    return results;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container-custom py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How can we help you?
          </h1>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-lg"
              />
              <svg
                className="absolute left-4 top-4.5 h-6 w-6 text-gray-400"
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
        </div>

        {searchQuery && filteredArticles().length > 0 ? (
          <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Search Results</h3>
            <div className="space-y-3">
              {filteredArticles().map(article => (
                <Link
                  key={article.id}
                  href={`/help/article/${article.id}`}
                  className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <p className="font-medium text-gray-900 hover:text-primary-600">{article.title}</p>
                  <p className="text-sm text-gray-500">in {article.category}</p>
                </Link>
              ))}
            </div>
          </div>
        ) : searchQuery && (
          <div className="bg-white rounded-xl p-8 mb-8 text-center border border-gray-200">
            <p className="text-gray-600">No results found for "{searchQuery}"</p>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-4 border border-gray-200 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-1">
                {Object.entries(helpCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      activeCategory === key
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.title}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                {helpCategories[activeCategory].icon}
                {helpCategories[activeCategory].title}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {helpCategories[activeCategory].articles.map(article => (
                  <Link
                    key={article.id}
                    href={`/help/article/${article.id}`}
                    className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all group"
                  >
                    <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors flex items-center justify-between">
                      {article.title}
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full text-left flex items-center justify-between py-2 hover:text-primary-600 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === index && (
                      <p className="mt-3 text-gray-600 animate-slide-up">{faq.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-3">Still need help?</h3>
              <p className="mb-6 opacity-90">Our support team is here to assist you</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Contact Support
                </Link>
                <Link
                  href="/community"
                  className="inline-flex items-center justify-center bg-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all"
                >
                  Community Forum
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}