'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import AOS from 'aos';

const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    location: '',
    whyJoinUs: '',
  });
  const [errors, setErrors] = useState({});
  const textareaRef = useRef(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for email validation

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Allow only numeric input for mobile and limit to 10 digits
    if (name === 'mobile') {
      if (!/^\d*$/.test(value) || value.length > 10) {
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Reset errors on input change
    setErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'whyJoinUs') {
      resizeTextarea();
    }
  };

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight + 4
      }px`;
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    resizeTextarea();
  }, []); // Only run once, when the component mounts

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full Name is required';

    if (!formData.email) {
      newErrors.email = 'Email Address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile Number is required';
    } else if (formData.mobile.length !== 10) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }

    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.whyJoinUs.trim())
      newErrors.whyJoinUs = 'Please tell us why you want to join';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Proceed with form submission
      console.log(formData);
      // Further submission logic...
    }
  };

  return (
    <section className="py-14 lg:py-[5rem] mt-[4rem]">
      <div className="container">
        <div className="heading text-center">
          <h2 className="mb-6 mx-auto border-2 w-fit border-[#08111F] bg-white px-5 py-3 font-extrabold uppercase leading-none text-black shadow-[4px_4px_0_#08111F]">
            Join Us
          </h2>
          <h4 className="sm:!leading-[50px]">Be a part of our journey!</h4>
          <p className="mt-2.5 text-lg font-medium text-center">
            Interested in volunteering? Fill out the form below.
          </p>
        </div>
        <div className="relative z-10 lg:flex">
          <div className="heading text-center lg:mb-0 lg:w-1/3 lg:pr-10 lg:text-left">
            <div className="mx-auto mt-5 overflow-hidden">
              <Image
                src="/assets/images/form-light-img.svg"
                alt="Join us"
                className="mx-auto block"
                data-aos="fade-right"
                data-aos-duration="1000"
                width={300}
                height={300}
              />
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white h-fit px-4 py-12 lg:w-2/3 lg:px-8">
            <div className="grid gap-10 sm:grid-cols-2">
              {/* Full Name Input */}
              <div className="relative ">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary pr-12"
                />
                <label className="absolute -top-3 bg-white px-2 font-bold left-6">
                  Full Name
                </label>
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-1/2 -translate-y-1/2 right-4 ">
                  <path
                    d="M5.42855 5.57875C5.42855 8.10348 7.47525 10.1502 9.99998 10.1502C12.5247 10.1502 14.5714 8.10348 14.5714 5.57875C14.5714 3.05402 12.5247 1.00732 9.99998 1.00732"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2 16.9328C2 15.9495 2.61812 15.0724 3.5441 14.7417V14.7417C7.71891 13.2507 12.2811 13.2507 16.4559 14.7417V14.7417C17.3819 15.0724 18 15.9495 18 16.9328V18.7014C18 19.9185 16.922 20.8535 15.7172 20.6813L13.8184 20.4101C11.2856 20.0483 8.71435 20.0483 6.18162 20.4101L4.28284 20.6813C3.07798 20.8535 2 19.9185 2 18.7014V16.9328Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Address Input */}
              <div className="relative">
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary pr-12"
                />
                <label className="absolute -top-3 bg-white px-2 font-bold left-6">
                  Email Address
                </label>
                <svg
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-1/2 -translate-y-1/2 right-4  ">
                  <path
                    d="M1 8.00732V7.00732C1 4.2459 3.23858 2.00732 6 2.00732H16C18.7614 2.00732 21 4.2459 21 7.00732V13.0073C21 15.7687 18.7614 18.0073 16 18.0073H6C3.23858 18.0073 1 15.7687 1 13.0073V12.0073"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 7.00732L9.8 10.6073C10.5111 11.1407 11.4889 11.1407 12.2 10.6073L17 7.00732"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Mobile Number Input */}
              <div className="relative ">
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary pr-12"
                />
                <label className="absolute -top-3 bg-white px-2 font-bold left-6">
                  Mobile Number
                </label>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-1/2 -translate-y-1/2 right-4">
                  <path
                    d="M6.45241 1.40806C5.45292 0.783702 4.14202 0.887138 3.2983 1.73086L1.86856 3.1606C-0.302899 5.33207 1.73747 10.8931 6.42586 15.5815C11.1142 20.2699 16.6753 22.3102 18.8467 20.1388L20.2765 18.709C21.2635 17.722 21.2374 16.0956 20.2182 15.0764L18.0036 12.8619C16.9844 11.8426 15.358 11.8165 14.371 12.8036L14.0639 13.1107C13.531 13.6436 12.6713 13.6957 12.0713 13.2005C11.4925 12.7229 10.9159 12.208 10.3576 11.6497C9.79933 11.0914 9.28441 10.5149 8.80678 9.93607C8.31161 9.33601 8.36374 8.47631 8.89666 7.9434L9.20375 7.63631C9.98187 6.85819 10.1303 5.68271 9.65898 4.72062"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* Location Input */}
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary pr-12"
                />
                <label className="absolute -top-3 bg-white px-2 font-bold left-6">
                  Location
                </label>
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-1/2 -translate-y-1/2 right-4 ">
                  <path
                    d="M5.89416 2.31259C7.20149 1.48625 8.75475 1.00732 10.4211 1.00732C15.0719 1.00732 18.8421 4.73828 18.8421 9.34066C18.8421 15.0541 12.1053 21.0073 10.4211 21.0073C8.73684 21.0073 2 15.0541 2 9.34066C2 7.87581 2.38193 6.49924 3.05263 5.30315"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13.4571 9.77392C13.5365 9.49702 13.579 9.20456 13.579 8.90216C13.579 7.15811 12.1651 5.74427 10.4211 5.74427C8.67702 5.74427 7.26318 7.15811 7.26318 8.90216C7.26318 10.6462 8.67702 12.0601 10.4211 12.0601C10.6633 12.0601 10.8991 12.0328 11.1256 11.9812"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              {/* Why Join Us Textarea */}
              <div className="relative  col-span-2">
                <textarea
                  ref={textareaRef}
                  name="whyJoinUs"
                  value={formData.whyJoinUs}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border-2 border-gray/20 bg-transparent p-4 font-bold outline-none transition focus:border-secondary pr-12"
                />
                <label className="absolute -top-3 bg-white px-2 font-bold left-6">
                  Why Join Us
                </label>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-1/2 -translate-y-1/2 right-4 ">
                  <path
                    d="M1 11.467V18.9267C1 19.7652 1.96993 20.2314 2.6247 19.7076L5.45217 17.4456C5.8068 17.1619 6.24742 17.0073 6.70156 17.0073H16C18.7614 17.0073 21 14.7687 21 12.0073V6.00732C21 3.2459 18.7614 1.00732 16 1.00732H6C3.23858 1.00732 1 3.2459 1 6.00732V7.62225"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="6.05005"
                    cy="9.05713"
                    r="1.25"
                    fill="currentColor"
                  />
                  <circle
                    cx="11.05"
                    cy="9.05713"
                    r="1.25"
                    fill="currentColor"
                  />
                  <circle
                    cx="16.05"
                    cy="9.05713"
                    r="1.25"
                    fill="currentColor"
                  />
                </svg>
                {errors.whyJoinUs && (
                  <p className="text-red-500 text-sm">{errors.whyJoinUs}</p>
                )}
              </div>

              <div className=" text-center lg:text-right col-span-2">
                <button
                  type="submit"
                  className="btn bg-gray px-12 capitalize text-white">
                  Submit Application
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default JoinUs;
