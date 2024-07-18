import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { db } from '@/app/firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import toast from 'react-hot-toast';

const NewsletterModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const modalRef = useRef();

  useEffect(() => {
    const modalShown = sessionStorage.getItem('modalShown');

    if (!modalShown) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        sessionStorage.setItem('modalShown', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

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

  if (!isModalOpen) return null;

  return (
    <div
      id="modalElement"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <section
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-fit max-w-4xl h-fit bg-secondary py-8 sm:py-14 lg:py-24 m-4 sm:p-4 rounded-lg">
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
                className="absolute w-auto -left-0 -top-0"
              />
              <h2 className="relative mb-3 text-xl sm:text-3xl flex flex-col space-y-2 font-black sm:whitespace-nowrap text-white md:text-4xl ">
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
              <p className="text-base sm:text-2xl font-semibold whitespace-normal text-[#e5e7eb]">
                Subscribe Now to Receive the Latest Updates
              </p>
              <form className="relative mt-14 md:mr-[-4rem]">
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
                  className="absolute top-1/2 -translate-y-1/2 rounded-md w-fit bg-secondary px-3 py-1.5 font-bold text-white transition duration-200 ease-linear hover:scale-105 right-4  lg:py-2 lg:text-lg">
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
    </div>
  );
};

export default NewsletterModal;
