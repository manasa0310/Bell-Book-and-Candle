import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const EventsSection = () => {
  return (
    <section className="py-12 lg:py-24">
      <div className="container">
        <h2 className="mb-12 mx-auto border-2 w-fit border-[#08111F] bg-white px-5 py-3 font-extrabold uppercase leading-none text-black shadow-[4px_4px_0_#08111F] ">
          Events
        </h2>

        <div
          className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2"
          data-aos="flip-left"
          data-aos-duration="1000">
          <div className="group relative h-[300px] flex-1 overflow-hidden rounded-[10px] sm:h-auto">
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-black group-hover:opacity-100 opacity-0 transition-all duration-200 ease-linear"></div>
            <Image
              src="/assets/event1.jpg"
              className="h-full w-full rotate-0 object-cover duration-200 group-hover:rotate-2 group-hover:scale-110"
              alt=""
              width={600}
              height={600}
            />

            <div className="absolute bottom-4 left-5 right-5 z-[1] text-white group-hover:translate-y-0 translate-y-[200%] transition-all duration-200 ease-linear">
              <Link
                href="/events"
                className="text-xl font-black duration-200 hover:text-secondary  sm:text-[32px] sm:leading-10">
                Pune
              </Link>
              {/* <p className="my-3 text-sm font-semibold">
                Days fish waters gathered given made third under blessed, is
                face. Is won’t lights it man can’t...
              </p>
              <div className="mt-[14px] flex gap-4">
                <div className="flex items-center gap-2">
                  <span>
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 5.83325V8.49992L9.66667 10.1666"
                        stroke="#969AA9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>
                      <path
                        d="M4.66668 2.72513C5.64725 2.1579 6.78572 1.83325 8.00001 1.83325C11.6819 1.83325 14.6667 4.81802 14.6667 8.49992C14.6667 12.1818 11.6819 15.1666 8.00001 15.1666C4.31811 15.1666 1.33334 12.1818 1.33334 8.49992C1.33334 7.28563 1.65799 6.14716 2.22522 5.16658"
                        stroke="#969AA9"
                        strokeWidth="1.5"
                        strokeLinecap="round"></path>
                    </svg>
                  </span>
                  <p className="text-[13px] font-semibold">20 May 2022</p>
                </div>
              </div> */}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="group relative h-[263px] w-full overflow-hidden rounded-[10px] lg:max-w-[263px]">
              <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-black group-hover:opacity-100 opacity-0 transition-all duration-200 ease-linear"></div>
              <Image
                src="/assets/event2.jpg"
                className="h-full w-full rotate-0 object-cover duration-200 group-hover:rotate-2 group-hover:scale-110"
                alt=""
                width={500}
                height={500}
              />

              <div className="absolute bottom-4 left-5 right-5 z-[1] text-white group-hover:translate-y-0 translate-y-[200%] transition-all duration-200 ease-linear">
                <Link
                  href="/events"
                  className="text-[19px] font-bold duration-200 hover:text-secondary ">
                  Mumbai
                </Link>
                {/* <div className="mt-[14px] flex items-center gap-2">
                  <span>
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 5.83325V8.49992L9.66667 10.1666"
                        stroke="#969AA9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>
                      <path
                        d="M4.66668 2.72513C5.64725 2.1579 6.78572 1.83325 8.00001 1.83325C11.6819 1.83325 14.6667 4.81802 14.6667 8.49992C14.6667 12.1818 11.6819 15.1666 8.00001 15.1666C4.31811 15.1666 1.33334 12.1818 1.33334 8.49992C1.33334 7.28563 1.65799 6.14716 2.22522 5.16658"
                        stroke="#969AA9"
                        strokeWidth="1.5"
                        strokeLinecap="round"></path>
                    </svg>
                  </span>
                  <p className="text-[13px] font-semibold">20 May 2022</p>
                </div> */}
              </div>
            </div>
            <div className="group relative h-[263px] w-full overflow-hidden rounded-[10px] lg:max-w-[263px] ">
              <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-black group-hover:opacity-100 opacity-0 transition-all duration-200 ease-linear"></div>
              <Image
                src="/assets/event3.jpg"
                className="h-full w-full rotate-0 object-cover duration-200 group-hover:rotate-2 group-hover:scale-110"
                alt=""
                width={500}
                height={500}
              />

              <div className="absolute bottom-4 left-5 right-5 z-[1] text-white group-hover:translate-y-0 translate-y-[200%] transition-all duration-200 ease-linear">
                <Link
                  href="/events"
                  className="text-[19px] font-bold duration-200 hover:text-secondary ">
                  Kolkata
                </Link>
                {/* <div className="mt-[14px] flex items-center gap-2">
                  <span>
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 5.83325V8.49992L9.66667 10.1666"
                        stroke="#969AA9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>
                      <path
                        d="M4.66668 2.72513C5.64725 2.1579 6.78572 1.83325 8.00001 1.83325C11.6819 1.83325 14.6667 4.81802 14.6667 8.49992C14.6667 12.1818 11.6819 15.1666 8.00001 15.1666C4.31811 15.1666 1.33334 12.1818 1.33334 8.49992C1.33334 7.28563 1.65799 6.14716 2.22522 5.16658"
                        stroke="#969AA9"
                        strokeWidth="1.5"
                        strokeLinecap="round"></path>
                    </svg>
                  </span>
                  <p className="text-[13px] font-semibold">17 May 2022</p>
                </div> */}
              </div>
            </div>
            <div className="group relative h-[263px] w-full overflow-hidden rounded-[10px] lg:max-w-[263px]">
              <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-black group-hover:opacity-100 opacity-0 transition-all duration-200 ease-linear"></div>
              <Image
                src="/assets/event4.jpg"
                className="h-full w-full rotate-0 object-cover duration-200 group-hover:rotate-2 group-hover:scale-110"
                alt=""
                width={500}
                height={500}
              />

              <div className="absolute bottom-4 left-5 right-5 z-[1] text-white group-hover:translate-y-0 translate-y-[200%] transition-all duration-200 ease-linear">
                <Link
                  href="/events"
                  className="text-[19px] font-bold duration-200 hover:text-secondary ">
                  Guwahati
                </Link>
                {/* <div className="mt-[14px] flex items-center gap-2">
                  <span>
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 5.83325V8.49992L9.66667 10.1666"
                        stroke="#969AA9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>
                      <path
                        d="M4.66668 2.72513C5.64725 2.1579 6.78572 1.83325 8.00001 1.83325C11.6819 1.83325 14.6667 4.81802 14.6667 8.49992C14.6667 12.1818 11.6819 15.1666 8.00001 15.1666C4.31811 15.1666 1.33334 12.1818 1.33334 8.49992C1.33334 7.28563 1.65799 6.14716 2.22522 5.16658"
                        stroke="#969AA9"
                        strokeWidth="1.5"
                        strokeLinecap="round"></path>
                    </svg>
                  </span>
                  <p className="text-[13px] font-semibold">12 Dec 2022</p>
                </div> */}
              </div>
            </div>
            <div className="group relative h-[263px] w-full overflow-hidden rounded-[10px] lg:max-w-[263px]">
              <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-black group-hover:opacity-100 opacity-0 transition-all duration-200 ease-linear"></div>
              <Image
                src="/assets/event5.jpg"
                className="h-full w-full rotate-0 object-cover duration-200 group-hover:rotate-2 group-hover:scale-110"
                alt=""
                width={500}
                height={500}
              />

              <div className="absolute bottom-4 left-5 right-5 z-[1] text-white group-hover:translate-y-0 translate-y-[200%] transition-all duration-200 ease-linear">
                <Link
                  href="/events"
                  className="text-[19px] font-bold duration-200 hover:text-secondary ">
                  Chennai
                </Link>
                {/* <div className="mt-[14px] flex items-center gap-2">
                  <span>
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 5.83325V8.49992L9.66667 10.1666"
                        stroke="#969AA9"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"></path>
                      <path
                        d="M4.66668 2.72513C5.64725 2.1579 6.78572 1.83325 8.00001 1.83325C11.6819 1.83325 14.6667 4.81802 14.6667 8.49992C14.6667 12.1818 11.6819 15.1666 8.00001 15.1666C4.31811 15.1666 1.33334 12.1818 1.33334 8.49992C1.33334 7.28563 1.65799 6.14716 2.22522 5.16658"
                        stroke="#969AA9"
                        strokeWidth="1.5"
                        strokeLinecap="round"></path>
                    </svg>
                  </span>
                  <p className="text-[13px] font-semibold">28 jan 2023</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col items-center mt-8">
          <Link
            href="/events"
            className=" inline-flex items-center justify-center gap-2.5 border-2 border-[#08111F] hover:border-[#395E8F] bg-white px-4 py-3 text-sm font-extrabold text-black hover:shadow-[4px_4px_0_#395E8F] duration-300 shadow-none ">
            See All Events
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
      </div>
    </section>
  );
};

export default EventsSection;
