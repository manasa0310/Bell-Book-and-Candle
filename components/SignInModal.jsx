'use client';

import React, { useEffect, useRef } from 'react';
import GoogleLogo from '../public/assets/google-logo.png';
import Image from 'next/image';

const SignInModal = ({ isOpen, onClose, onSignInWithGoogle }) => {
  const modalRef = useRef();

  useEffect(() => {
    // Handle click outside to close the modal
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Disable body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = '';
    }

    // Clean up event listener and overflow style
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] bg-black bg-opacity-50 flex justify-center items-center text-center">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-xl relative max-w-[300px]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 bg-gray-200 rounded-full hover:scale-[115%] transition-all duration-200 bg-black/10">
          {/* Cross Icon (can be replaced with an actual icon or image) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#000"
            strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h4 className="text-xl text-slate-800 ">Sign In to</h4>
        <h2 className="text-2xl font-bold text-black my-3 whitespace-nowrap">
          Join Bell Book Candle
        </h2>
        <p className="mb-4">Join us and explore a world of books.</p>
        <button
          onClick={onSignInWithGoogle}
          className="border border-black mx-auto font-bold py-2 px-4 text-black rounded flex items-center gap-4 hover:translate-y-[-4px] transition-all duration-200 ease-in-out hover:shadow-lg">
          <Image src={GoogleLogo} alt="Google logo" className="w-5 h-5" />{' '}
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
