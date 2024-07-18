import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Image from 'next/image';
import { useTestimonials } from '@/contexts/TestimonialsContext';

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  autoplaySpeed: 5000,
  slidesToScroll: 1,
  autoplay: true, // Disable autoplay
  cssEase: 'linear',
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const TestimonialsCarousel = () => {
  const { allTestimonials } = useTestimonials();

  return (
    <section className="pt-12 pb-48">
      <div className="container mx-auto px-4">
        <div className="heading text-center">
          <h2 className="mb-12 mx-auto border-2 w-fit border-[#08111F] bg-white px-5 py-3 font-extrabold uppercase leading-none text-black shadow-[4px_4px_0_#08111F] ">
            Testimonials
          </h2>
          <h4 className="text-black text-[1rem]">
            What&apos;s our community saying about us?
          </h4>
        </div>

        <Slider {...settings}>
          {allTestimonials.map((testimonial, index) => (
            <div key={index} className="outline-none">
              <Testimonial {...testimonial} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

const Testimonial = ({ name, title, quote, rating, imgUrl }) => {
  return (
    <div className="flex flex-col  p-5 my-5 sm:m-5 bg-white rounded shadow ">
      <div className="flex text-yellow-400">
        {Array.from({ length: rating }, (_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current"
            viewBox="0 0 20 20">
            <path d="M10 15l-5.5 3l2-5.5L2 8h6L10 2l2 6h6l-4.5 4.5L15.5 18z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-600 my-4 line-clamp-2">{quote}</p>
      <div className="flex gap-5 items-center">
        <Image
          src={imgUrl || '#'}
          width={50}
          height={50}
          alt="image"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
