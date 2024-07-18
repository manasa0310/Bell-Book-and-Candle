import React from 'react';
import HeroCarousel from './HeroCarousel';

const Hero = ({ onJoinNow }) => {
  return (
    <section className=" w-full h-full pt-[7rem] py-12 lg:py-20 lg:pt-[7rem] relative">
      <div className="container ">
        <div className="grid grid-cols-1 items-center w-fit gap-8 lg:grid-cols-2 ">
          <div className="lg:w-[110%]">
            <h3 className="mt-7 text-3xl sm:text-4xl sm:leading-[3rem] text-center lg:text-left font-extrabold text-black flex flex-col  gap-2">
              <span className=" lg:whitespace-nowrap capitalize ">
                An exquisite bookish experience
              </span>
              <span>Explore the World of Literature with Us!</span>
            </h3>
            <p className="mt-2.5 text-lg font-medium text-center lg:text-left">
              A community where book lovers unite, stories unfold, and
              conversations flourish. BBC is not just a book club; it&apos;s a
              sanctuary for those who find solace in the written world and the
              magic of storytelling.
            </p>
            <div className="mt-8 flex flex-col items-center lg:items-start">
              <button
                onClick={onJoinNow}
                className="mb-5 inline-flex items-center justify-center gap-2.5 border-2 hover:border-secondary bg-white px-4 py-3 text-sm font-extrabold text-black hover:shadow-[4px_4px_0_#395E8F] duration-300 shadow-none ">
                Read With Us
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
              </button>
            </div>
          </div>
          <div
            className="mx-auto w-fit"
            data-aos="fade-up"
            data-aos-duration="1000">
            <HeroCarousel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
