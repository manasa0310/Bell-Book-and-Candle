/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useState, useEffect } from 'react';
import 'react-18-image-lightbox/style.css';
import { useLoading } from '@/contexts/LoadingContext';
import { useEvents } from '@/contexts/EventsContext';
import Loader from '@/components/Loader';
import Link from 'next/link';
import AOS from 'aos';

const Events = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const {
    allEvents,
    onlineEvents,
    offlineEvents,
    upcomingEvents,
    upcomingOnlineEvents,
    upcomingOfflineEvents,
    pastEvents,
  } = useEvents();

  const { isLoading } = useLoading();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="overflow-hidden">
      <section className="max-w-screen bg-black bg-gradient-to-r from-secondary/10 to-primary/10 relative">
        <div className="relative bg-[url(/assets/images/event-concert/banner-bg-img.png)] bg-cover bg-center bg-no-repeat py-32 text-white sm:py-40 lg:py-52">
          <div
            className="absolute top-6 left-5 lg:top-14"
            data-aos="fade-down"
            data-aos-duration="1000">
            <img
              src="/assets/images/event-concert/Light.svg"
              className="[transform:rotateY(180deg)]"
              alt=""
            />
          </div>
          <div
            className="absolute top-6 right-0  lg:top-14"
            data-aos="fade-down"
            data-aos-duration="1000">
            <img
              src="/assets/images/event-concert/Light.svg"
              className=""
              alt=""
            />
          </div>
          <div
            className="absolute bottom-0 hidden w-80 right-12  sm:block lg:bottom-12 lg:w-[580px]"
            data-aos="fade-up-left"
            data-aos-duration="1000">
            <img
              src="/assets/images/event-concert/ticket.png"
              className=""
              alt=""
            />
          </div>
          <div className="container">
            <div className="relative z-[1px] text-center sm:text-left ">
              <h2 className="text-4xl font-black uppercase italic md:text-6xl lg:text-[80px] lg:leading-[100px]">
                Find amazing events
              </h2>
              <img
                src="/assets/images/event-concert/banner-text.png"
                className="py-2 sm:py-0"
                alt=""
              />
              <div className="flex items-center justify-center gap-6 sm:justify-start">
                <h3 className="text-4xl font-black uppercase italic md:text-6xl lg:text-[80px] lg:leading-[100px]">
                  your city
                </h3>
                <img
                  src="/assets/images/event-concert/round-text.png"
                  className="w-12 animate-spin-slow duration-1000 md:w-24"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute -bottom-[12rem] hidden left-0  lg:block"
          data-aos="fade-up-right"
          data-aos-duration="1000">
          <img
            src="/assets/images/event-concert/music.png"
            className=""
            alt=""
          />
        </div>
      </section>
      <section className="relative pb-24">
        <span className="block h-[200px] w-full "></span>

        <div className="container -mt-80">
          <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-7">
            {upcomingEvents.length > 0 &&
              upcomingEvents?.map((event, i) => (
                <div
                  key={event.id}
                  className={`relative bg-secondary  py-7 px-7 text-white lg:px-10`}
                  data-aos="fade-up"
                  data-aos-duration="1000">
                  <span className="absolute inset-0">
                    <img src="/assets/images/event-concert/card.svg" alt="" />
                  </span>
                  <div className="relative z-[1] space-y-5">
                    <div className="flex items-center gap-3 sm:gap-6">
                      <div>
                        <p>
                          {event.dayOfWeek} {event.formattedDate}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none">
                            <path
                              d="M15.728 13.7279L10.4558 19L5.18374 13.7279C4.14103 12.6852 3.43094 11.3567 3.14326 9.91037C2.85558 8.46408 3.00324 6.96497 3.56755 5.60259C4.13187 4.24022 5.08751 3.07578 6.31361 2.25653C7.53972 1.43728 8.98122 1 10.4558 1C11.9305 1 13.372 1.43728 14.5981 2.25653C15.8242 3.07578 16.7798 4.24022 17.3441 5.60259C17.9085 6.96497 18.0561 8.46408 17.7684 9.91037C17.4808 11.3567 16.7707 12.6852 15.728 13.7279ZM10.4558 10.1126C10.8953 10.1126 11.3167 9.93807 11.6274 9.62735C11.9381 9.31663 12.1127 8.8952 12.1127 8.45578C12.1127 8.01635 11.9381 7.59493 11.6274 7.28421C11.3167 6.97349 10.8953 6.79893 10.4558 6.79893C10.0164 6.79893 9.595 6.97349 9.28427 7.28421C8.97355 7.59493 8.79899 8.01635 8.79899 8.45578C8.79899 8.8952 8.97355 9.31663 9.28427 9.62735C9.595 9.93807 10.0164 10.1126 10.4558 10.1126Z"
                              fill="#08111F"
                            />
                          </svg>
                        </span>
                        <p className="font-bold">
                          {event.eventType == 'online'
                            ? 'Remote'
                            : event.location}
                        </p>
                      </div>
                    </div>
                    <h3 className=" text-3xl font-bold leading-[42px] break-words">
                      {event.eventName}
                    </h3>
                    <button
                      type="button"
                      className={`btn rounded-none bg-white/20 italic text-white hover:bg-primary `}>
                      <Link
                        href={`${
                          event.eventType == 'online'
                            ? event?.onlineLink || '#'
                            : event?.gmapsLink || '#'
                        }`}
                        target="_blank">
                        Join Now
                      </Link>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
