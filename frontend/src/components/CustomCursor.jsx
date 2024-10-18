import React, { useState, useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const shadowRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Set a new timer
      timerRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100); // Adjust this value to change how quickly the shadow merges
    };

    const checkHover = (e) => {
      const target = e.target;
      setIsHovering(
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea' ||
        target.tagName.toLowerCase() === 'select' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]')
      );
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', checkHover);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', checkHover);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (shadowRef.current) {
      if (isMoving) {
        shadowRef.current.style.transform = `translate(${position.x - 5}px, ${position.y - 5}px)`;
      } else {
        shadowRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
      }
    }
  }, [position, isMoving]);

  return (
    <div className="custom-cursor-container">
      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {!isHovering && (
        <div
          ref={shadowRef}
          className={`custom-cursor-shadow ${isMoving ? '' : 'merged'}`}
        />
      )}
    </div>
  );
};

export default CustomCursor;