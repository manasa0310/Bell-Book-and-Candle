/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useLoading } from '@/contexts/LoadingContext';
import Loader from '@/components/Loader';
import BooksSvg from '@/public/assets/books.svg';
import AOS from 'aos';

const About = () => {
  const { isLoading } = useLoading();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mt-[5rem]">
      <div className="bg-[url(/assets/about.svg)] bg-cover bg-bottom bg-no-repeat pt-[82px] lg:pt-[106px]">
        <div className="relative">
          <div className="container">
            <div className="items-center justify-between py-10 md:flex md:h-[400px] md:py-0">
              <div className="heading relative mb-0 text-center md:text-left">
                <h6>About Us</h6>
                <h4 className="!text-white">About Bell Book Candle</h4>
              </div>
              <div
                className="relative mt-6 md:mt-0 mr-8 mb-16 w-fit h-fit"
                data-aos="fade-left"
                data-aos-duration="1000">
                <Image src={BooksSvg} alt="bookssvg" width={400} height={400} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="relative pt-12 lg:pt-24">
        <div className="container relative z-[1] flex flex-col lg:flex-row items-center gap-8">
          <div className="text-center lg:text-left w-full h-full">
            <div className="heading mb-5 text-center lg:text-left  xl:w-[95%]">
              <h4>Unwind, Discover, Belong</h4>
            </div>
            <p className="pb-10 text-lg font-semibold leading-[30px] flex flex-col space-y-2">
              <span>
                Welcome to our book club, where we&apos;re dedicated to guiding
                you through unexplored genres and books that may have escaped
                your radar.
              </span>
              <span>
                Our mission extends beyond merely completing reading goals; we
                aspire to help you establish a daily reading habit and delve
                into diverse perspectives, expanding the horizons of your
                literary experience.
              </span>
              <span>
                In our community, we value the essence of fostering genuine
                friendships and providing a secure space for expressing opinions
                without fear of judgment. Consider us your low-key therapists,
                offering therapeutic art and craft sessions to complement your
                reading journey.
              </span>
              <span>
                Moreover, we&apos;re committed to bridging the gap between
                readers and authors, creating a dynamic space where connections
                flourish and the magic of storytelling comes alive. Join us on
                this literary adventure, where every page turned is a step
                towards personal growth and shared exploration.
              </span>
            </p>
            <Link
              href="/joinus"
              className="btn bg-secondary capitalize text-white">
              Join Our Team
            </Link>
          </div>
          <div
            className="w-full h-full "
            data-aos={'fade-left'}
            data-aos-duration="1000">
            <Image
              width={500}
              height={500}
              src="/assets/images/about-bg.png"
              alt="About"
              className="w-full"
            />
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-12 lg:py-24">
        <div className="container">
          <div className="heading text-center">
            <h6 className="!text-secondary">Meet Our Team</h6>
            <h4>Our experienced core members</h4>
          </div>
        </div>

        <div className="container relative px-16">
          <div className="swiper-button-prev2 absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-secondary text-secondary duration-200 hover:bg-secondary hover:text-white">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.5892 14.4111L9.41083 15.5895L3.82167 10.0003L9.41083 4.41113L10.5892 5.58947L7.01167 9.16697H15V10.8336H7.01167L10.5892 14.4111Z"
                fill="currentcolor"
              />
            </svg>
          </div>

          <div className="swiper-button-next1 absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-secondary text-secondary duration-200 hover:bg-secondary hover:text-white">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.41083 14.4111L10.5892 15.5895L16.1783 10.0003L10.5892 4.41113L9.41083 5.58947L12.9883 9.16697H5V10.8336H12.9883L9.41083 14.4111Z"
                fill="currentcolor"
              />
            </svg>
          </div>

          <Swiper
            loop={false}
            slidesPerView="auto"
            spaceBetween={30}
            navigation={{
              nextEl: '.swiper-button-next1',
              prevEl: '.swiper-button-prev2',
            }}
            modules={[Navigation]}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              600: {
                slidesPerView: 2,
              },
              1000: {
                slidesPerView: 3,
              },
              1600: {
                slidesPerView: 4,
              },
            }}
            dir={'ltr'}
            key={'false'}>
            <SwiperSlide className="relative text-center">
              <span className="absolute inset-x-0 -top-5">
                <img
                  src="/assets/images/marketing/team-shadow.svg"
                  className="mx-auto"
                  alt=""
                />
              </span>
              <div className="mx-auto w-48 rounded-full">
                <img src="/assets/images/marketing/member3.png" alt="" />
              </div>
              <h3 className="mt-2 text-xl font-extrabold text-black ">
                Anmol Jauher
              </h3>
            </SwiperSlide>
            <SwiperSlide className="relative text-center">
              <span className="absolute inset-x-0 -top-5">
                <img
                  src="/assets/images/marketing/team-shadow.svg"
                  className="mx-auto"
                  alt=""
                />
              </span>
              <div className="mx-auto w-48 rounded-full">
                <img src="/assets/images/marketing/member1.png" alt="" />
              </div>
              <h3 className="mt-2 text-xl font-extrabold text-black ">
                Arohi Khedkar
              </h3>
            </SwiperSlide>
            <SwiperSlide className="relative text-center">
              <div className="SwiperSlide">
                <span className="absolute inset-x-0 -top-5">
                  <img
                    src="/assets/images/marketing/team-shadow.svg"
                    className="mx-auto"
                    alt=""
                  />
                </span>
                <div className="mx-auto w-48 rounded-full">
                  <img src="/assets/images/marketing/member6.png" alt="" />
                </div>
                <h3 className="mt-2 text-xl font-extrabold text-black ">
                  Gauri
                </h3>
              </div>
            </SwiperSlide>
            <SwiperSlide className="relative text-center">
              <div className="SwiperSlide">
                <span className="absolute inset-x-0 -top-5">
                  <img
                    src="/assets/images/marketing/team-shadow.svg"
                    className="mx-auto"
                    alt=""
                  />
                </span>
                <div className="mx-auto w-48 rounded-full">
                  <img src="/assets/images/marketing/member5.png" alt="" />
                </div>
                <h3 className="mt-2 text-xl font-extrabold text-black ">
                  Mieraj
                </h3>
              </div>
            </SwiperSlide>

            <SwiperSlide className="relative text-center">
              <span className="absolute inset-x-0 -top-5">
                <img
                  src="/assets/images/marketing/team-shadow.svg"
                  className="mx-auto"
                  alt=""
                />
              </span>
              <div className="mx-auto w-48 rounded-full">
                <img src="/assets/images/marketing/member2.png" alt="" />
              </div>
              <h3 className="mt-2 text-xl font-extrabold text-black ">
                Sharimila
              </h3>
            </SwiperSlide>

            <SwiperSlide className="relative text-center">
              <div className="SwiperSlide">
                <span className="absolute inset-x-0 -top-5">
                  <img
                    src="/assets/images/marketing/team-shadow.svg"
                    className="mx-auto"
                    alt=""
                  />
                </span>
                <div className="mx-auto w-48 rounded-full">
                  <img src="/assets/images/marketing/member4.png" alt="" />
                </div>
                <h3 className="mt-2 text-xl font-extrabold text-black ">
                  Sruthy S Kumar
                </h3>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default About;
