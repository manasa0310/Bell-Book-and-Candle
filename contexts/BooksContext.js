'use client';
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from 'react';
import { db } from '@/app/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useLoading } from '@/contexts/LoadingContext';
export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [bookOfTheMonth, setBookOfTheMonth] = useState([]);
  const [allBookOfTheMonth, setAllBookOfTheMonth] = useState([]);
  const [nonBookOfTheMonth, setNonBookOfTheMonth] = useState([]);
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading();
    const fetchBooks = async () => {
      try {
        const booksCollectionRef = collection(db, 'books');
        const booksSnapshot = await getDocs(booksCollectionRef);

        const allBooks = booksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          monthYear: JSON.parse(doc.data().monthYear),
        }));

        const bookOfTheMonth = allBooks
          .filter((book) => book.isBookOfTheMonth)
          .sort((a, b) => {
            if (a.monthYear.year !== b.monthYear.year) {
              return b.monthYear.year.localeCompare(a.monthYear.year);
            }

            const months = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ];
            return (
              months.indexOf(b.monthYear.month) -
              months.indexOf(a.monthYear.month)
            );
          });

        const otherBooks = allBooks.filter((book) => !book.isBookOfTheMonth);

        setNonBookOfTheMonth(otherBooks);
        setBooks(allBooks);
        setAllBookOfTheMonth(bookOfTheMonth);
        setBookOfTheMonth(bookOfTheMonth.slice(0, 12));
      } catch (error) {
        console.error('Error fetching books: ', error);
      } finally {
        stopLoading();
      }
    };

    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memoizedBooks = useMemo(() => books, [books]);
  const memoizedBookOfTheMonth = useMemo(
    () => bookOfTheMonth,
    [bookOfTheMonth]
  );
  const memoizedAllBookOfTheMonth = useMemo(
    () => allBookOfTheMonth,
    [allBookOfTheMonth]
  );
  const memoizedNonBookOfTheMonth = useMemo(
    () => nonBookOfTheMonth,
    [nonBookOfTheMonth]
  );

  return (
    <BooksContext.Provider
      value={{
        allBooks: memoizedBooks,
        bookOfTheMonth: memoizedBookOfTheMonth,
        nonBookOfTheMonth: memoizedNonBookOfTheMonth,
        allBookOfTheMonth: memoizedAllBookOfTheMonth,
      }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
};
