import React, { useEffect, useState } from "react";
import "../styles/ScrollToTop.css"; // Import the CSS file

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <div className="scroll-top" onClick={scrollToTop}>
        <i className='bx bx-chevron-up arrow-up'></i>
      </div>
    )
  );
};

export default ScrollToTop;
