'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Button({ 
  href,
  onClick,
  children,
  variant = 'primary',
  size = 'default',
  loading = false,
  disabled = false,
  icon,
  animation = 'bounce', // New prop for animation type
  className = '',
  ...props 
}) {
  const [isLoading, setIsLoading] = useState(false);

  const baseClasses = "inline-flex items-center justify-center font-weight-600 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-primary-color/20 disabled:opacity-50 disabled:cursor-not-allowed interactive-element";
  
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary", 
    outline: "btn-outline"
  };

  const sizes = {
    small: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg"
  };

  const animations = {
    bounce: "btn-micro-bounce",
    scale: "btn-micro-scale", 
    pulse: "btn-micro-pulse",
    none: ""
  };

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${animations[animation]} ${className} ${(loading || isLoading) ? 'btn-loading' : ''}`;

  const handleClick = async (e) => {
    if (onClick && !disabled && !loading && !isLoading) {
      setIsLoading(true);
      try {
        await onClick(e);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const content = (
    <>
      <span className={`btn-text flex items-center ${(loading || isLoading) ? 'opacity-0' : ''}`}>
        {children}
        {icon && (
          <span className="ml-2">
            {icon}
          </span>
        )}
      </span>
      {(loading || isLoading) && (
        <div className="btn-spinner">
          <div className="spinner-enhanced" />
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link 
        href={href}
        className={buttonClasses}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled || loading || isLoading}
      className={buttonClasses}
      {...props}
    >
      {content}
    </button>
  );
}