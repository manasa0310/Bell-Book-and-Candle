'use client';
import React, { useEffect } from 'react';

const RightClickPreventWrapper = ({ children }) => {
  // Function to handle right-click event and prevent default
  const handleRightClick = (event) => {
    event.preventDefault();
  };

  // Function to handle keydown event for DevTools shortcuts
  const handleKeyDown = (event) => {
    if (
      event.keyCode === 123 || // F12
      (event.ctrlKey &&
        event.shiftKey &&
        (event.keyCode === 'I'.charCodeAt(0) ||
          event.keyCode === 'C'.charCodeAt(0) ||
          event.keyCode === 'J'.charCodeAt(0)))
    ) {
      // Ctrl+Shift+I/C/J
      event.preventDefault();
      alert('Developer tools are disabled on this site.');
    }
  };

  useEffect(() => {
    // Attach event listeners
    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listeners
    return () => {
      document.removeEventListener('contextmenu', handleRightClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <div>{children}</div>;
};

export default RightClickPreventWrapper;
