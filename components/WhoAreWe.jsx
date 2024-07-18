import React from 'react';
import Image from 'next/image';

const WhoAreWe = ({ onJoinNow }) => {
  return (
    <section className="  py-12 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <div className="flex justify-center lg:justify-start">
              <h2 className="mb-5 inline-flex border-2 border-black bg-white px-5 py-3 font-extrabold uppercase leading-none text-black shadow-[4px_4px_0_#08111F]">
                Not Your Regular book club
              </h2>
            </div>
            <h3 className="mt-7 text-3xl sm:text-4xl sm:leading-[3rem] text-center lg:text-left font-extrabold text-black capitalize ">
              The best way to discover, track, and share your reading life.
            </h3>
            <p className="mt-2.5 text-lg font-medium text-center lg:text-left flex-col flex space-y-2">
              <span>
                From Students to Homemakers, Entrepreneurs to Corporates - we
                aim to rekindle your Kindle ;)
              </span>
              <span>
                We are a Safe Haven for Book Lovers of all Shades. A community
                that celebrates all your niches and quirky pursuits.
              </span>
            </p>
            <div className="mt-8 flex flex-col items-center lg:items-start">
              <button
                onClick={onJoinNow}
                className="mb-5 inline-flex items-center justify-center gap-2.5 border-2 border-black bg-white px-4 py-3 text-sm font-extrabold text-black hover:border-secondary hover:shadow-[4px_4px_0_#395E8F] duration-300 shadow-none ">
                Become a Member
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
            className="mx-auto max-w-[540px]"
            data-aos="fade-up"
            data-aos-duration="1000">
            <Image
              src="/assets/about-img1.png"
              className=" w-auto"
              alt=""
              width={700}
              height={700}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoAreWe;
