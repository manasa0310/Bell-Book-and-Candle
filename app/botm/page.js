'use client';
import React, { useEffect } from 'react';
import BookTimeline from '@/components/BookTimeline';
import { useBooks } from '@/contexts/BooksContext';
import { useLoading } from '@/contexts/LoadingContext';
import Loader from '@/components/Loader';
import AOS from 'aos';

const BOTM = () => {
  const { bookOfTheMonth, allBookOfTheMonth } = useBooks();
  const { isLoading } = useLoading();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="sm:container mx-auto sm:p-4 mt-20 z-10">
      {allBookOfTheMonth.length > 0 && <BookTimeline books={bookOfTheMonth} />}
    </div>
  );
};

export default BOTM;
