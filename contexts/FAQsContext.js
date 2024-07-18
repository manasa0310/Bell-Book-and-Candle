'use client';
import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import { db } from '@/app/firebase'; // Adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';
import { useLoading } from '@/contexts/LoadingContext'; // Import global loading context hook

export const FAQsContext = createContext();

export const FAQsProvider = ({ children }) => {
  const [faqs, setFAQs] = useState([]);
  const { startLoading, stopLoading } = useLoading(); // Use the global loading state

  useEffect(() => {
    const fetchFAQs = async () => {
      startLoading(); // Set global loading state to true when fetching
      try {
        const faqsCollectionRef = collection(db, 'faqs');
        const faqsSnapshot = await getDocs(faqsCollectionRef);
        const fetchedFAQs = faqsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFAQs(fetchedFAQs);
      } catch (error) {
        console.error('Error fetching FAQs: ', error);
      }
      stopLoading(); // Set global loading state to false after fetching
    };

    fetchFAQs();
  }, []);

  const memoizedFAQs = useMemo(() => faqs, [faqs]);

  return (
    <FAQsContext.Provider value={{ faqs: memoizedFAQs }}>
      {children}
    </FAQsContext.Provider>
  );
};

export const useFAQs = () => {
  const context = useContext(FAQsContext);
  if (context === undefined) {
    throw new Error('useFAQs must be used within a FAQsProvider');
  }
  return context;
};
