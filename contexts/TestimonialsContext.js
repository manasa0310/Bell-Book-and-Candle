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
import { useLoading } from '@/contexts/LoadingContext';

export const TestimonialsContext = createContext();

export const TestimonialsProvider = ({ children }) => {
  const [testimonials, setTestimonials] = useState([]);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const fetchTestimonials = async () => {
      try {
        const testimonialsCollectionRef = collection(db, 'testimonials');
        const testimonialsSnapshot = await getDocs(testimonialsCollectionRef);
        const allTestimonials = testimonialsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setTestimonials(allTestimonials);
        console.log('Testimonials fetched: ', allTestimonials);
      } catch (error) {
        console.error('Error fetching testimonials: ', error);
      }
      stopLoading();
    };

    fetchTestimonials();
  }, [startLoading, stopLoading]);

  const memoizedTestimonials = useMemo(() => {
    // You can filter or sort testimonials here if needed
    const sortedTestimonials = testimonials.sort((a, b) => {
      // Example: Sort by name, modify as needed
      return a.name.localeCompare(b.name);
    });

    console.log('sortedTestimonials: ', sortedTestimonials);
    return {
      allTestimonials: sortedTestimonials,
      // Add more filtered/sorted groups as needed
    };
  }, [testimonials]);

  return (
    <TestimonialsContext.Provider value={memoizedTestimonials}>
      {children}
    </TestimonialsContext.Provider>
  );
};

export const useTestimonials = () => useContext(TestimonialsContext);
