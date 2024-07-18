'use client';
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import { db } from '@/app/firebase'; // Adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';
import { useLoading } from '@/contexts/LoadingContext'; // Import global loading context hook

export const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const [gallery, setGallery] = useState([]);
  const [galleryByLocation, setGalleryByLocation] = useState({});
  const { startLoading, stopLoading } = useLoading(); // Use the global loading state

  useEffect(() => {
    const fetchGallery = async () => {
      startLoading(); // Set global loading state to true when fetching

      try {
        const galleryCollectionRef = collection(db, 'gallery');
        const gallerySnapshot = await getDocs(galleryCollectionRef);
        const galleryImages = gallerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Group images by location
        const imagesByLocation = galleryImages.reduce((acc, image) => {
          const location = image.location || 'Unknown'; // Fallback for images without a location
          acc[location] = acc[location] || [];
          acc[location].push(image);
          return acc;
        }, {});

        setGallery(galleryImages);
        setGalleryByLocation(imagesByLocation);
      } catch (error) {
        console.error('Error fetching gallery images: ', error);
      }

      stopLoading(); // Set global loading state to false after fetching
    };

    fetchGallery();
  }, []);

  const memoizedGallery = useMemo(
    () => ({ gallery, galleryByLocation }),
    [gallery, galleryByLocation]
  );

  return (
    <GalleryContext.Provider value={memoizedGallery}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};
