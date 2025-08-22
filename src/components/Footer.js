'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = {
    product: {
      title: 'Product',
      links: [
        { name: 'Create Twibbon', href: '/create' },
        { name: 'Explore', href: '/explore' },
        { name: 'Templates', href: '/templates' },
        { name: 'Examples', href: '/examples' },
        { name: 'Features', href: '/features' }
      ]
    },
    company: {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Blog', href: '/blog' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Partners', href: '/partners' }
      ]
    },
    support: {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Guidelines', href: '/guidelines' },
        { name: 'Status', href: '/status' }
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { name: 'API Documentation', href: '/api' },
        { name: 'Developers', href: '/developers' },
        { name: 'Brand Assets', href: '/brand' },
        { name: 'Community', href: '/community' },
        { name: 'Affiliate', href: '/affiliate' }
      ]
    }
  };

  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/twibbonize',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/twibbonize',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/twibbonize',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
          <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998z"/>
          <circle cx="18.406" cy="5.594" r="1.44"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/twibbonize',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/twibbonize',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ];

  const footerStyle = {
    backgroundColor: '#1f2937',
    color: '#9ca3af'
  };

  const linkStyle = {
    color: '#9ca3af',
    fontSize: '14px',
    textDecoration: 'none',
    transition: 'color 0.2s'
  };

  const titleStyle = {
    color: '#ffffff',
    fontWeight: '600',
    marginBottom: '16px',
    fontSize: '16px'
  };

  return (
    <footer style={footerStyle}>
      {/* Main Footer Content */}
      <div className="container-custom" style={{ padding: '60px 20px 40px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand Section */}
          <div style={{ gridColumn: 'span 2' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', textDecoration: 'none' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                background: '#0066ff', 
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '20px' }}>T</span>
              </div>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffffff' }}>Twibbonize</span>
            </Link>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6', maxWidth: '300px' }}>
              Show your support! Create and share campaign frames to unite communities and support causes you care about.
            </p>
            
            {/* Social Media Icons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  style={{ color: '#9ca3af', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                  aria-label={item.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon}
                </a>
              ))}
            </div>

            {/* App Download Badges */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="#" style={{ display: 'inline-block', textDecoration: 'none' }}>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                  alt="Download on App Store" 
                  style={{ height: '40px', width: 'auto' }}
                />
              </a>
              <a href="#" style={{ display: 'inline-block', textDecoration: 'none' }}>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                  alt="Get it on Google Play" 
                  style={{ height: '40px', width: 'auto' }}
                />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 style={titleStyle}>{section.title}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.links.map((link) => (
                  <li key={link.name} style={{ marginBottom: '12px' }}>
                    <Link 
                      href={link.href} 
                      style={linkStyle}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section - Centered */}
        <div style={{ 
          paddingTop: '40px',
          marginTop: '40px',
          borderTop: '1px solid #374151',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ color: '#ffffff', fontWeight: '600', marginBottom: '8px', fontSize: '20px' }}>
              Subscribe to our newsletter
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '20px' }}>
              Get the latest news and updates about campaigns and features delivered to your inbox
            </p>
            <form style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="Enter your email address"
                style={{
                  width: '100%',
                  maxWidth: '350px',
                  padding: '10px 16px',
                  backgroundColor: '#374151',
                  border: '1px solid #4b5563',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#0066ff'}
                onBlur={(e) => e.currentTarget.style.borderColor = '#4b5563'}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 32px',
                  backgroundColor: '#0066ff',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0052cc'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0066ff'}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid #374151', backgroundColor: '#111827' }}>
        <div className="container-custom" style={{ 
          padding: '24px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <p style={{ color: '#9ca3af', fontSize: '14px', margin: 0 }}>
              © {currentYear} Twibbonize. All rights reserved.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link 
                href="/privacy" 
                style={linkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                Privacy Policy
              </Link>
              <span style={{ color: '#4b5563' }}>·</span>
              <Link 
                href="/terms" 
                style={linkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                Terms of Service
              </Link>
              <span style={{ color: '#4b5563' }}>·</span>
              <Link 
                href="/cookies" 
                style={linkStyle}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#9ca3af'}
              >
                Cookie Policy
              </Link>
            </div>
          </div>
          
          <select 
            style={{
              fontSize: '14px',
              color: '#9ca3af',
              backgroundColor: 'transparent',
              border: '1px solid #4b5563',
              borderRadius: '6px',
              padding: '6px 12px',
              outline: 'none',
              cursor: 'pointer'
            }}
            onFocus={(e) => e.currentTarget.style.borderColor = '#0066ff'}
            onBlur={(e) => e.currentTarget.style.borderColor = '#4b5563'}
          >
            <option value="en">🌐 English</option>
            <option value="id">🌐 Bahasa Indonesia</option>
            <option value="es">🌐 Español</option>
            <option value="fr">🌐 Français</option>
            <option value="de">🌐 Deutsch</option>
            <option value="pt">🌐 Português</option>
            <option value="ja">🌐 日本語</option>
            <option value="ko">🌐 한국어</option>
          </select>
        </div>
      </div>
    </footer>
  );
}