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
      className="stat-card animate-fade-in card-hover-scale interactive-element shadow-sm-enhanced radius-lg backdrop-blur-refined"
      style={{ 
        animationDelay: `${delay / 1000}s`,
        animationFillMode: 'both'
      }}
    >
      <div className="stat-number gradient-text-blue">
        {formatNumber(count, value)}
      </div>
      <div className="stat-label text-refined-secondary">{label}</div>
      
      {/* Decorative background element */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div 
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500"
          style={{
            background: `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)`
          }}
        />
      </div>
    </div>
  );
}