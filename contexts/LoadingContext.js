'use client';
import React, { createContext, useState, useContext, useCallback } from 'react';

export const LoadingContext = createContext({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const LoadingProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  // Increment loading counter
  const startLoading = useCallback(() => {
    setLoadingCount((prevCount) => prevCount + 1);
  }, []);

  // Decrement loading counter
  const stopLoading = useCallback(() => {
    setLoadingCount((prevCount) => Math.max(0, prevCount - 1));
  }, []);

  const isLoading = loadingCount > 0;

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
