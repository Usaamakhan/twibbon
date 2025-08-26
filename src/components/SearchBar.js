'use client';

import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ 
  placeholder = "Search campaigns...", 
  onSearch,
  onClear,
  className = "",
  showRecentSearches = true 
}) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    if (showRecentSearches) {
      const saved = localStorage.getItem('framely_recent_searches');
      if (saved) {
        try {
          setRecentSearches(JSON.parse(saved));
        } catch (error) {
          console.error('Error loading recent searches:', error);
        }
      }
    }
  }, [showRecentSearches]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(query);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Show dropdown if we have recent searches or matching filtered searches
    if (showRecentSearches && recentSearches.length > 0) {
      const filtered = recentSearches.filter(search =>
        search.toLowerCase().includes(value.toLowerCase()) && search !== value
      );
      setShowDropdown(filtered.length > 0 || value.length === 0);
    } else {
      setShowDropdown(false);
    }
  };

  // Handle search submission
  const handleSearch = (searchTerm = query) => {
    if (!searchTerm.trim()) return;

    // Add to recent searches
    if (showRecentSearches) {
      const updatedRecent = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
      setRecentSearches(updatedRecent);
      localStorage.setItem('framely_recent_searches', JSON.stringify(updatedRecent));
    }

    setShowDropdown(false);
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  // Handle clear
  const handleClear = () => {
    setQuery('');
    setShowDropdown(false);
    if (onClear) {
      onClear();
    }
    if (onSearch) {
      onSearch('');
    }
    inputRef.current?.focus();
  };

  // Clear search history
  const clearSearchHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem('framely_recent_searches');
    setShowDropdown(false);
  };

  // Remove individual search item
  const removeSearchItem = (indexToRemove) => {
    const updatedRecent = recentSearches.filter((_, index) => index !== indexToRemove);
    setRecentSearches(updatedRecent);
    localStorage.setItem('framely_recent_searches', JSON.stringify(updatedRecent));
    
    if (updatedRecent.length === 0) {
      setShowDropdown(false);
    }
  };

  // Filter recent searches based on current query
  const filteredRecentSearches = recentSearches.filter(search =>
    search.toLowerCase().includes(query.toLowerCase()) && search !== query
  );

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
    if (showRecentSearches && recentSearches.length > 0) {
      setShowDropdown(true);
    }
  };

  // Handle blur
  const handleBlur = (e) => {
    // Check if the blur is due to clicking on dropdown
    if (dropdownRef.current?.contains(e.relatedTarget)) {
      return;
    }
    setIsFocused(false);
    setTimeout(() => setShowDropdown(false), 150);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input Container */}
      <div className={`
        relative flex items-center bg-refined-white border-2 radius-xl transition-all duration-200 input-focus-glow shadow-sm-enhanced
        ${isFocused 
          ? 'border-primary-color shadow-lg-enhanced' 
          : 'border-gray-200 hover:border-gray-300'
        }
      `}>
        {/* Search Icon */}
        <div className="pl-4 pr-3 flex items-center">
          <svg 
            className={`w-5 h-5 transition-all duration-200 icon-hover-pulse ${
              isFocused ? 'text-primary-color' : 'text-gray-400'
            }`} 
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

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="flex-1 py-3 pr-4 bg-transparent text-refined-primary placeholder-gray-500 focus:outline-none text-enhanced-sm md:text-enhanced-base"
        />

        {/* Clear Button */}
        {query && (
          <button
            onClick={handleClear}
            className="mr-3 p-1 radius-full hover:bg-gray-100 transition-all duration-200 group interactive-element"
            aria-label="Clear search"
          >
            <svg 
              className="w-4 h-4 text-gray-400 group-hover:text-gray-600 icon-hover-spin" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}

        {/* Search Button */}
        <button
          onClick={() => handleSearch()}
          className="mr-2 px-3 py-1.5 bg-primary-color text-white radius-lg hover:bg-primary-dark transition-all duration-200 text-enhanced-sm font-medium interactive-element btn-micro-scale"
        >
          Search
        </button>
      </div>

      {/* Recent Searches Dropdown */}
      {showDropdown && showRecentSearches && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-refined-white border border-gray-200 radius-lg shadow-lg-enhanced z-50 animate-fade-in backdrop-blur-refined"
        >
          {filteredRecentSearches.length > 0 || (query.length === 0 && recentSearches.length > 0) ? (
            <>
              <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xs font-medium text-refined-muted uppercase tracking-wide">
                  {query.length > 0 ? 'Matching Searches' : 'Recent Searches'}
                </span>
                <button
                  onClick={clearSearchHistory}
                  className="text-xs text-refined-subtle hover:text-refined-secondary transition-colors interactive-element"
                >
                  Clear All
                </button>
              </div>
              
              <div className="py-1">
                {(query.length === 0 ? recentSearches : filteredRecentSearches).map((search, index) => {
                  const originalIndex = query.length === 0 ? index : recentSearches.findIndex(s => s === search);
                  return (
                    <div
                      key={index}
                      className="flex items-center hover:bg-gray-50 transition-colors duration-200 interactive-element"
                    >
                      <button
                        onClick={() => {
                          setQuery(search);
                          handleSearch(search);
                        }}
                        className="flex-1 px-4 py-2 text-left text-enhanced-sm text-refined-primary flex items-center interactive-element"
                      >
                        <svg className="w-4 h-4 text-refined-subtle mr-3 icon-hover-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="flex-1">{search}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSearchItem(originalIndex);
                        }}
                        className="px-3 py-2 text-refined-subtle hover:text-refined-secondary transition-colors interactive-element"
                        title="Remove from history"
                      >
                        <svg className="w-3 h-3 icon-hover-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="px-4 py-3 text-enhanced-sm text-refined-muted text-center">
              No recent searches
            </div>
          )}
        </div>
      )}
    </div>
  );
}