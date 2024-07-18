import React from 'react';
import Image from 'next/image';
import FriendsSvg from '../public/assets/friends.svg';
import BookImg from '../public/assets/book.svg';
import WritingSvg from '../public/assets/writing.svg';

const WhyUs = () => {
  return (
    <section className="py-10 md:py-20">
      <div className="container">
        <div
          className="mx-auto mb-10 w-full max-w-[610px] space-y-5 text-center"
          data-aos="fade-down"
          data-aos-duration="1000">
          <h2 className="mb-5 inline-flex border-2 border-black bg-white px-5 py-3 font-extrabold uppercase leading-none text-black shadow-[4px_4px_0_#08111F] ">
            Why Choose BBC
          </h2>
          <h3 className="text-3xl font-extrabold text-black  lg:text-[40px] lg:leading-[60px]">
            Best Bookish Experience
          </h3>
          <p className="lg:text-lg">
            Enhance your reading experience by joining a dynamic community of
            book enthusiasts who not only share your passion but also keep you
            on track with engaging activities and loads of fun!
          </p>
        </div>
        <div className="grid gap-[30px] grid-cols-1 sm:grid-cols-3 ">
          <div
            className="grid grid-cols-1 gap-5 text-center max-w-[20rem] mx-auto"
            data-aos="fade-right"
            data-aos-duration="1000">
            <div className="mx-auto grid h-20 w-20 place-content-center">
              <Image
                src={FriendsSvg}
                width={80}
                height={80}
                className="h-11 w-11 "
                alt="friendsimg"
              />
            </div>
            <div className="space-y-2.5">
              <h2 className="text-lg font-bold text-black ">
                Friends and Community
              </h2>
              <p>
                Connect with readers across India who share your love for
                reading.
              </p>
            </div>
          </div>
          <div
            className="grid grid-cols-1 gap-5 text-center max-w-[20rem] mx-auto"
            data-aos="fade-right"
            data-aos-duration="1000">
            <div className="mx-auto grid h-20 w-20 place-content-center">
              <Image
                width={80}
                height={80}
                src={BookImg}
                alt=""
                className="w-18 h-18"
              />
            </div>
            <div className="space-y-2.5">
              <h2 className="text-lg font-bold text-black ">
                Diverse Book-Selection
              </h2>
              <p>
                Broaden your horizons by exploring books and genres beyond your
                comfort zone
              </p>
            </div>
          </div>
          <div
            className="grid grid-cols-1 gap-5 text-center max-w-[20rem] mx-auto"
            data-aos="fade-left"
            data-aos-duration="1000">
            <div className="mx-auto grid h-20 w-20 place-content-center">
              <Image
                width={100}
                height={100}
                src={WritingSvg}
                alt=""
                className="w-full h-full"
              />
            </div>
            <div className="space-y-2.5">
              <h2 className="text-lg font-bold text-black ">
                Literary Extravaganza
              </h2>
              <p>
                Take your reading a step further with fun games, challenges and
                bookish events.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
