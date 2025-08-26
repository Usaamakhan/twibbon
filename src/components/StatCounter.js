'use client';

import { useState, useEffect, useRef } from 'react';

export default function StatCounter({ 
  value, 
  label, 
  icon,
  gradient = 'from-blue-500 to-purple-500',
  bgColor = 'bg-blue-50',
  duration = 2000, 
  delay = 0 
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  // Extract number from value string (e.g., "50K+" -> 50)
  const extractNumber = (str) => {
    const match = str.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  // Format number back to display format
  const formatNumber = (num, originalValue) => {
    const roundedNum = Math.floor(num);
    
    if (originalValue.includes('K')) {
      return roundedNum + 'K+';
    } else if (originalValue.includes('M')) {
      return roundedNum + 'M+';
    } else if (originalValue.includes('+')) {
      return roundedNum + '+';
    }
    return roundedNum.toLocaleString();
  };

  const targetNumber = extractNumber(value);

  // Intersection Observer to trigger animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const node = counterRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [hasAnimated]);

  // Animate counter when visible
  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
      
      const startTime = Date.now() + delay;
      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        
        if (elapsed < 0) {
          requestAnimationFrame(animate);
          return;
        }
        
        if (elapsed < duration) {
          // Easing function (easeOutCubic)
          const progress = elapsed / duration;
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          const currentCount = targetNumber * easedProgress;
          
          setCount(currentCount);
          requestAnimationFrame(animate);
        } else {
          setCount(targetNumber);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isVisible, hasAnimated, targetNumber, duration, delay]);

  return (
    <div 
      ref={counterRef}
      className={`stat-card-enhanced group ${bgColor} hover:bg-opacity-80 animate-fade-in interactive-element`}
      style={{ 
        animationDelay: `${delay / 1000}s`,
        animationFillMode: 'both'
      }}
    >
      {/* Icon */}
      {icon && (
        <div className={`stat-icon bg-gradient-to-br ${gradient} text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          {icon}
        </div>
      )}
      
      {/* Number */}
      <div className="stat-number-enhanced group-hover:scale-105 transition-transform duration-300">
        {formatNumber(count, value)}
      </div>
      
      {/* Label */}
      <div className="stat-label-enhanced group-hover:text-gray-800 transition-colors duration-300">{label}</div>
      
      {/* Progress bar */}
      <div className="stat-progress-container">
        <div 
          className={`stat-progress-bar bg-gradient-to-r ${gradient}`}
          style={{
            width: `${hasAnimated ? '100%' : '0%'}`,
            transitionDelay: `${delay}ms`
          }}
        />
      </div>
      
      {/* Hover overlay effect */}
      <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-300 pointer-events-none"></div>
      
      {/* Floating decoration */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:animate-pulse"></div>
    </div>
  );
}