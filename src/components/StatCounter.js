'use client';

import { useState, useEffect, useRef } from 'react';

export default function StatCounter({ 
  value, 
  label, 
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

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
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
      className="stat-card animate-fade-in hover:scale-105 transition-transform duration-300"
      style={{ 
        animationDelay: `${delay / 1000}s`,
        animationFillMode: 'both'
      }}
    >
      <div className="stat-number">
        {formatNumber(count, value)}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}