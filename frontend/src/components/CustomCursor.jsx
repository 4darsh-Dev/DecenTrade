import React, { useState, useEffect, useRef } from 'react';

const cursorStyles = `
  body {
    cursor: none;
  }

  .custom-cursor-container {
    pointer-events: none;
    position: fixed;
    z-index: 9999;
  }

  .custom-cursor {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: rgba(220, 220, 220, 0.7);
    border: 2px solid rgba(200, 200, 200, 0.7);
    position: absolute;
    transition: width 0.3s, height 0.3s, background-color 0.3s;
    transform: translate(-50%, -50%);
  }

  .custom-cursor-shadow {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(180, 180, 180, 0.3);
    position: absolute;
    transition: 0.1s;
    transform: translate(-50%, -50%);
  }

  .custom-cursor-shadow.merged {
    opacity: 0;
    transition: 0.3s;
  }

  .custom-cursor.hover {
    width: 60px;
    height: 60px;
    background-color: rgba(220, 220, 220, 0.5);
    border-color: rgba(200, 200, 200, 0.5);
  }

  a, button, input, textarea, select, [role="button"] {
    cursor: none;
  }
`;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const shadowRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Add the styles to the document
    const styleElement = document.createElement('style');
    styleElement.textContent = cursorStyles;
    document.head.appendChild(styleElement);

    const moveCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 100);
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
      // Remove the styles when the component unmounts
      document.head.removeChild(styleElement);
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
