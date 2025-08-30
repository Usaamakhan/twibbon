'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      // Try to find hero section element dynamically
      const heroSection = document.querySelector('.hero-modern, [class*="hero"], section:first-of-type');
      
      if (heroSection) {
        // Get actual hero section height and position
        const heroRect = heroSection.getBoundingClientRect();
        const heroBottom = heroRect.bottom + window.scrollY;
        const scrolled = window.scrollY >= heroBottom - 100; // Trigger 100px before hero ends
        setIsScrolled(scrolled);
      } else {
        // Fallback to viewport-based calculation if hero section not found
        const triggerHeight = window.innerHeight * 0.7;
        const scrolled = window.scrollY >= triggerHeight;
        setIsScrolled(scrolled);
      }
    };

    // Check initial state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // Also check on window resize
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check initial screen size
    checkScreenSize();
    
    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const navItems = [
    { name: 'Explore', href: '/explore' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Help Center', href: '/help' }
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''} ${isSearchOpen ? styles.headerSearchOpen : ''}`}>
      <div className={styles.headerContent}>
        {!isSearchOpen ? (
          <>
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              <svg className={styles.logoIcon} viewBox="0 0 32 32" fill="none">
                <defs>
                  <mask id="squareHole">
                    <rect width="32" height="32" fill="white"/>
                    <rect x="6" y="6" width="20" height="20" fill="black"/>
                  </mask>
                </defs>
                <rect width="32" height="32" rx="8" fill="currentColor" mask="url(#squareHole)"/>
              </svg>
              <span>twibbonize</span>
            </Link>

            {/* Actions */}
            <div className={styles.actions}>
              {/* Search Button */}
              <button 
                className={styles.iconButton}
                onClick={() => setIsSearchOpen(true)}
              >
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Campaign Button */}
              <Link href="/create" className={styles.campaignButton}>
                <span className={styles.plusSymbol}>+</span> Start a Campaign
              </Link>

              {/* Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={styles.iconButton}
              >
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          /* Search Bar */
          <div className={styles.searchBar}>
            <div className={styles.searchInputContainer}>
              <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isMobile ? "Search" : "Search campaigns, creators, or hashtags..."}
                className={styles.searchInput}
                autoFocus
              />
            </div>
            <button 
              className={styles.cancelButton}
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <>
          {/* Blur Overlay */}
          <div 
            className={styles.menuOverlay}
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Side Panel Menu */}
          <div className={styles.menuDropdown}>
            {/* Close Button */}
            <button 
              className={styles.menuCloseButton}
              onClick={() => setIsMenuOpen(false)}
            >
              <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={styles.menuLink}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Start Campaign Button for Mobile */}
            <Link
              href="/create"
              className={styles.menuCampaignButton}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className={styles.plusSymbol}>+</span> Start a Campaign
            </Link>

            {/* Auth Buttons for Mobile */}
            <div className={styles.menuAuthButtons}>
              <Link
                href="/login"
                className={styles.menuLoginButton}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className={styles.menuSignupButton}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}