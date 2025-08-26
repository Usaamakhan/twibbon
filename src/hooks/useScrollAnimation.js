import { useEffect, useRef, useState } from 'react';

/**
 * Hook to trigger animations when elements enter viewport
 * @param {Object} options - Intersection Observer options
 * @returns {Array} [ref, isVisible] - Ref to attach to element and visibility state
 */
export function useScrollAnimation(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true,
    ...options
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!hasAnimated || !defaultOptions.triggerOnce)) {
          setIsVisible(true);
          if (defaultOptions.triggerOnce) {
            setHasAnimated(true);
          }
        } else if (!defaultOptions.triggerOnce) {
          setIsVisible(false);
        }
      },
      {
        threshold: defaultOptions.threshold,
        rootMargin: defaultOptions.rootMargin
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated, defaultOptions.threshold, defaultOptions.rootMargin, defaultOptions.triggerOnce]);

  return [ref, isVisible];
}

/**
 * Hook to add staggered animations to multiple elements
 * @param {number} count - Number of elements
 * @param {number} delay - Delay between animations (ms)
 * @returns {Array} Array of [ref, isVisible] pairs
 */
export function useStaggeredAnimation(count, delay = 100) {
  const [refs, setRefs] = useState([]);
  const [visibleStates, setVisibleStates] = useState([]);

  useEffect(() => {
    const newRefs = Array.from({ length: count }, () => useRef(null));
    const newStates = Array.from({ length: count }, () => false);
    
    setRefs(newRefs);
    setVisibleStates(newStates);
  }, [count]);

  useEffect(() => {
    if (refs.length === 0) return;

    const observers = refs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleStates(prev => {
                const newStates = [...prev];
                newStates[index] = true;
                return newStates;
              });
            }, index * delay);
          }
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [refs, delay]);

  return refs.map((ref, index) => [ref, visibleStates[index]]);
}