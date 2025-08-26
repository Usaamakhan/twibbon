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

    const node = ref.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
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
  // Use a single mutable ref to hold element nodes. We'll expose callback refs
  // to allow consumers to attach DOM nodes without calling hooks inside loops.
  const elementsRef = useRef([]);
  const [visibleStates, setVisibleStates] = useState(() => Array(count).fill(false));

  // Ensure visibleStates length tracks count
  useEffect(() => {
    setVisibleStates(prev => (prev.length === count ? prev : Array(count).fill(false)));
    // trim stored element refs if count shrinks
    elementsRef.current = elementsRef.current.slice(0, count);
  }, [count]);

  useEffect(() => {
    if (count === 0) return;

    const observers = [];

    elementsRef.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleStates(prev => {
                const newStates = prev.slice();
                newStates[index] = true;
                return newStates;
              });
            }, index * delay);
          }
        },
        { threshold: 0.1, rootMargin: '50px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [count, delay]);

  // Return a list of callback refs and visibility state for each index
  return Array.from({ length: count }, (_, i) => [
    (el) => {
      elementsRef.current[i] = el;
    },
    visibleStates[i]
  ]);
}