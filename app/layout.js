import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { UserProvider } from '@/contexts/UserContext';
import { FAQsProvider } from '@/contexts/FAQsContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { GalleryProvider } from '@/contexts/GalleryContext';
import { BooksProvider } from '@/contexts/BooksContext';
import { EventsProvider } from '@/contexts/EventsContext';
import { TestimonialsProvider } from '@/contexts/TestimonialsContext';
import { SpeedInsights } from '@vercel/speed-insights/next';
import RightClickPreventWrapper from '@/components/RightClickPreventWrapper';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata = {
  title: 'Bell Book and Candle',
  description:
    'Join Bell Book Candel, India’s largest online book club, and immerse yourself in a vibrant community of book lovers. Discover new genres, engage in lively discussions, and enjoy exclusive author events. Ideal for every bibliophile seeking a connected and enriching reading experience.',
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <UserProvider>
          <LoadingProvider>
            <EventsProvider>
              <BooksProvider>
                <GalleryProvider>
                  <FAQsProvider>
                    <TestimonialsProvider>
                      <body
                        className={`${inter.className} overflow-x-hidden bg-cover bg-top bg-no-repeat flex min-h-screen flex-col bg-gradient-to-r from-[#FCF1F4] to-[#EDFBF9]  text-base font-normal text-gray antialiased max-w-screen`}>
                        <RightClickPreventWrapper>
                          <Header />
                          {children}
                          <Analytics />
                          <SpeedInsights />
                          <Footer />
                        </RightClickPreventWrapper>
                      </body>
                    </TestimonialsProvider>
                  </FAQsProvider>
                </GalleryProvider>
              </BooksProvider>
            </EventsProvider>
          </LoadingProvider>
        </UserProvider>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}
