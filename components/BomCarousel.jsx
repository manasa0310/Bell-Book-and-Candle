'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { useBooks } from '@/contexts/BooksContext';

const BomCarousel = () => {
  const { allBooks, bookOfTheMonth } = useBooks();

  const [key, setKey] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setKey((prevKey) => prevKey + 1);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="py-12  lg:py-24">
      <div className="container">
        <h2 className="mb-12 mx-auto border-2 w-fit border-[#08111F] bg-white px-5 py-3 font-extrabold uppercase leading-none text-black shadow-[4px_4px_0_#08111F] ">
          OUR BOOK PICKS
        </h2>
        <div className="rounded-[10px] bg-white border w-auto border-[#BBBBBB]/50 p-3 sm:p-5">
          <Swiper
            loop={false}
            slidesPerView="auto"
            spaceBetween={30}
            speed={1000}
            navigation={{
              nextEl: '.Stories-slider-button-next',
              prevEl: '.Stories-slider-button-prev',
            }}
            breakpoints={{
              300: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              900: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
            modules={[Autoplay, Navigation]}>
            {bookOfTheMonth.map((bom, i) => (
              <SwiperSlide key={i}>
                <div className="min-h-[300px] min-w-[200px] max-w-[200px] max-h-[300px] mx-auto group">
                  <Link href={bom.buyingLink} target="_blank">
                    <div
                      className={`relative w-full h-full aspect-[2/3] overflow-hidden rounded-[10px]
                          shadow-[4px_4px_0_#08111F] border-2 border-black
                       mb-2 mr-2`}>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 transition-all duration-200 ease-linear group-hover:opacity-100 cursor-pointer"></div>
                      <Image
                        src={bom.imgUrl}
                        className="h-full w-full object-cover"
                        alt=""
                        width={500}
                        height={500}
                      />
                      <div className="absolute bottom-5 left-5 group-hover:translate-y-0 translate-y-[200%]  transition-all duration-300 ease-linear">
                        <p
                          className={`inline-block rounded bg-secondary  py-1 px-2.5 text-[12px] drop-shadow-lg font-extrabold text-white`}>
                          {bom.monthYear['month']}
                        </p>
                        <h5 className="mt-3 text-xl  drop-shadow-xl whitespace-normal font-extrabold text-white">
                          {bom.title}
                        </h5>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mt-5 flex justify-between items-center">
          <div className=" flex flex-col items-center lg:items-start">
            <Link
              href="/botm"
              className=" inline-flex items-center justify-center gap-2.5 border-2 border-[#08111F] hover:border-[#395E8F] bg-white px-4 py-3 text-sm font-extrabold text-black hover:shadow-[4px_4px_0_#395E8F] duration-300 shadow-none ">
              See Full Library
              <svg
                className="h-[13px] w-[13px]"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 11L11.0909 1.90906"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="square"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.61365 1H12V8.38636"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="square"
                />
              </svg>
            </Link>
          </div>
          <div className="flex gap-[14px]">
            <button
              type="button"
              className="Stories-slider-button-prev flex h-[30px] w-[30px] items-center justify-center rounded-full bg-black/[0.04] text-[#08111F] duration-200 hover:bg-black hover:text-white ">
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.95007 1.20007L1.48924 5.34228C1.06317 5.73791 1.06317 6.41223 1.48924 6.80787L5.95007 10.9501"
                  stroke="currentcolor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="Stories-slider-button-next flex h-[30px] w-[30px] items-center justify-center rounded-full bg-black/[0.04] text-[#08111F] duration-200 hover:bg-black hover:text-white   ">
              <svg
                width="7"
                height="12"
                viewBox="0 0 7 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.05011 10.7999L5.51095 6.65772C5.93701 6.26209 5.93701 5.58777 5.51095 5.19213L1.05011 1.04993"
                  stroke="currentcolor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BomCarousel;
