import React, { useState, useEffect } from 'react';
import { Button } from '@headlessui/react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <Button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 rounded-full bg-red p-3 text-white shadow-lg transition-colors duration-300 hover:bg-redHover focus:outline-none focus:ring focus:ring-yellow"
        aria-label="Scroll to top"
      >
        ↑
      </Button>
    )
  );
};

export default ScrollToTopButton;
