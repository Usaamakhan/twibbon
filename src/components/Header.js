'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-color rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Framely
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link 
                href="/explore" 
                className="text-gray-700 hover:text-primary-color font-medium transition-colors"
              >
                Explore
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-primary-color font-medium transition-colors"
              >
                About
              </Link>
              <Link 
                href="/pricing" 
                className="text-gray-700 hover:text-primary-color font-medium transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-gray-700 hover:text-primary-color font-medium px-4 py-2 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/create" 
              className="btn-primary"
              style={{ 
                background: 'var(--primary-color)',
                padding: '10px 24px',
                borderRadius: '24px'
              }}
            >
              Create Frame
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 radius-lg transition-colors interactive-element"
          >
            <svg
              className={`h-6 w-6 text-gray-700 transition-transform duration-300 ${isMenuOpen ? 'rotate-90 icon-hover-spin' : 'icon-hover-bounce'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              <Link 
                href="/explore" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <Link 
                href="/about" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/pricing" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link 
                  href="/login" 
                  className="block text-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  href="/create" 
                  className="block text-center btn-primary"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    background: 'var(--primary-color)',
                    padding: '10px 24px',
                    borderRadius: '24px'
                  }}
                >
                  Create Frame
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}