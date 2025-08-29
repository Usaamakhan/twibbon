'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Explore', href: '/explore' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Help Center', href: '/help' }
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="currentColor"/>
            <path d="M12 8h8v3h-5v3h4v3h-4v7h-3V8z" fill="white"/>
          </svg>
          <span>twibbonize</span>
        </Link>

        {/* Actions */}
        <div className={styles.actions}>
          {/* Search Button */}
          <button className={styles.iconButton}>
            <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* Campaign Button */}
          <Link href="/create" className={styles.campaignButton}>
            <span style={{ fontWeight: '700' }}>+ Start a Campaign</span>
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
      </div>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <div className={styles.menuDropdown}>
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
        </div>
      )}
    </header>
  );
}