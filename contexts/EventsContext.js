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
import { parseISO, isAfter, isBefore, format } from 'date-fns';

export const EventsContext = createContext();

export const EventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const { startLoading, stopLoading } = useLoading(); // Use the improved loading state management

  useEffect(() => {
    startLoading();
    const fetchEvents = async () => {
      try {
        const eventsCollectionRef = collection(db, 'events');
        const eventsSnapshot = await getDocs(eventsCollectionRef);
        const today = new Date();
        const allEvents = eventsSnapshot.docs.map((doc) => {
          const data = doc.data();
          const eventDate = parseISO(data.eventDate);
          return {
            ...data,
            id: doc.id,
            isPast: isBefore(eventDate, today),
            isUpcoming: isAfter(eventDate, today),
            dayOfWeek: format(eventDate, 'EEEE'), // Day of the week, e.g., 'Monday'
            month: format(eventDate, 'MMMM'), // Month name, e.g., 'August'
            formattedDate: format(eventDate, 'd MMMM yyyy'),
            // Add the day of the week for each event
          };
        });

        setEvents(allEvents);
      } catch (error) {
        console.error('Error fetching events: ', error);
      }
      stopLoading();
    };

    fetchEvents();
  }, [startLoading, stopLoading]);

  // Memoize the events data
  const memoizedEvents = useMemo(() => {
    const onlineEvents = events.filter((event) => event.eventType === 'online');
    const offlineEvents = events.filter(
      (event) => event.eventType === 'offline'
    );
    const upcomingEvents = events.filter((event) => event.isUpcoming);
    const upcomingOnlineEvents = upcomingEvents.filter(
      (event) => event.eventType === 'online'
    );
    const upcomingOfflineEvents = upcomingEvents.filter(
      (event) => event.eventType === 'offline'
    );
    const pastEvents = events.filter((event) => event.isPast);

    return {
      allEvents: events,
      onlineEvents,
      offlineEvents,
      upcomingEvents,
      upcomingOnlineEvents,
      upcomingOfflineEvents,
      pastEvents,
    };
  }, [events]);

  return (
    <EventsContext.Provider value={memoizedEvents}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
