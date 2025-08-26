/**
 * Smooth scroll to a specific element or section
 * @param {string} targetId - The ID of the target element (without #)
 * @param {number} offset - Optional offset from the top (default: 80px for header)
 */
export function scrollToSection(targetId, offset = 80) {
  const element = document.getElementById(targetId);
  
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

/**
 * Smooth scroll to top of page
 */
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * Add smooth scroll behavior to internal links
 */
export function initSmoothScroll() {
  // Find all anchor links that start with #
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip if it's just # or empty
      if (href === '#' || href === '') return;
      
      e.preventDefault();
      const targetId = href.substring(1);
      scrollToSection(targetId);
    });
  });
}