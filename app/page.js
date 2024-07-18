'use client';
import React, { useEffect } from 'react';
import BomCarousel from '@/components/BomCarousel';
import EventsSection from '@/components/EventsSection';
import AOS from 'aos';
import Faq from '@/components/Faq';
import Hero from '@/components/Hero';
import NewLetter from '@/components/NewLetter';
import WhoAreWe from '@/components/WhoAreWe';
import WhyUs from '@/components/WhyUs';
import useJoinNow from '@/hooks/useJoinNow.js';
import SignInModal from '@/components/SignInModal';
import { useLoading } from '@/contexts/LoadingContext';
import { useFAQs } from '@/contexts/FAQsContext';
import Loader from '@/components/Loader';
import NewsletterModal from '@/components/NewsletterModal';
import Testimonials from '@/components/Testimonial';

export default function Home() {
  const { joinNow, isModalOpen, handleModalSignIn, setIsModalOpen } =
    useJoinNow();
  const { faqs } = useFAQs();

  const { isLoading } = useLoading();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="max-w-screen overflow-x-hidden">
      <Hero onJoinNow={joinNow} />
      <WhyUs />
      <WhoAreWe onJoinNow={joinNow} />
      <BomCarousel />
      <EventsSection />
      <Faq data={faqs} />
      <Testimonials />
      <NewLetter />
      <SignInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSignInWithGoogle={handleModalSignIn}
      />
      <NewsletterModal />
    </main>
  );
}
