import React, { useState } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/app/firebase';

const NewLetter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (event) => {
    event.preventDefault();

    // Regular expression for validating email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const newsletterRef = collection(db, 'newsletter');
    const q = query(newsletterRef, where('email', '==', email));

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        await addDoc(newsletterRef, { email });
        toast.success('Thank you for subscribing!');
        setEmail('');
        setIsModalOpen(false);
      } else {
        setEmail('');
        toast.error('This email is already subscribed.');
      }
    } catch (error) {
      console.error('Error processing your subscription: ', error);
    }
  };

  return (
    <section className="relative bg-secondary py-14 lg:py-24">
      <Image
        src="/assets/images/modern-saas/newsletter.svg"
        alt=""
        width={500}
        height={300}
        className="absolute w-auto right-0 bottom-0 hidden xl:inline-block"
      />
      <Image
        src="/assets/images/modern-saas/email.svg"
        alt=""
        width={500}
        height={500}
        className="absolute w-auto left-40 bottom-0 hidden md:left-1/2 xl:inline-block"
      />
      <div className="container">
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <div className="relative text-center md:w-1/2 md:text-left  xl:pr-12">
            <Image
              src="/assets/images/modern-saas/icon-1.svg"
              alt="xxx"
              width={500}
              height={300}
              className="absolute w-auto -left-12 -top-12"
            />
            <h2 className="relative mb-3 text-3xl  font-black  sm:whitespace-nowrap text-white md:text-4xl lg:text-5xl flex flex-col space-y-2">
              <span>Stay Connected with</span>
              <span className="sm:whitespace-nowrap">
                India&rsquo;s Largest Book Club
              </span>
              <Image
                src="/assets/images/modern-saas/icon-2.svg"
                alt=""
                width={500}
                height={300}
                className="absolute w-auto right-8 -bottom-5"
              />
            </h2>
            <p className="text-2xl font-semibold whitespace-normal  text-[#e5e7eb]">
              get updates & more
            </p>
            <form className="relative mt-14">
              <div className="absolute top-1/2 -translate-y-1/2 pl-4 pr-4">
                <svg
                  width="25"
                  height="21"
                  viewBox="0 0 25 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24 10.4091C24 14.8446 24 17.0623 22.6527 18.4403C21.3054 19.8182 19.1369 19.8182 14.8 19.8182H10.2C5.86308 19.8182 3.69462 19.8182 2.34731 18.4403C1 17.0623 1 14.8446 1 10.4091C1 5.9736 1 3.75586 2.34731 2.37793C3.69462 1 5.86308 1 10.2 1H14.8C19.1369 1 21.3054 1 22.6527 2.37793C23.4038 3.14616 23.7362 4.17543 23.8833 5.70455"
                    stroke="#08111F"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                  <path
                    d="M19.3999 5.70508L16.9172 7.82104C14.8051 9.62115 13.749 10.5212 12.4999 10.5212C11.7532 10.5212 11.0755 10.1996 10.1999 9.55627M5.59991 5.70508L6.63491 6.58718L7.66991 7.46928"
                    stroke="#08111F"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
              </div>
              <input
                type="email"
                placeholder="your email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl py-4 font-semibold outline-0 pl-14 truncate pr-36 lg:py-6 lg:text-lg"
              />
              <button
                onClick={handleSubscribe}
                type="button"
                className="absolute top-1/2 -translate-y-1/2 rounded-md w-fit bg-secondary px-3 py-1.5 font-bold text-white transition hover:scale-105 right-4  lg:py-2 lg:text-lg">
                subscribe
              </button>
            </form>
          </div>
          <div data-aos={'fade-left'} data-aos-duration="1000">
            <Image
              src="/assets/images/modern-saas/oc-target.svg"
              alt=""
              width={500}
              height={300}
              className="mx-auto w-52  lg:w-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewLetter;
