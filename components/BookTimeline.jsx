import React, { useEffect } from 'react';
import AOS from 'aos';
import Image from 'next/image';
import 'aos/dist/aos.css';
import ArrowSvg from '../public/assets/arrow.svg';
import Link from 'next/link';

const TimelineItem = ({ book, side, index }) => {
  const aosAnimation = side === 'right' ? 'fade-right' : 'fade-left';

  const itemLayout = `flex ${
    side === 'left' ? 'flex-row-reverse' : ''
  } items-center`;

  const dotStyle = {
    position: 'absolute',
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
    backgroundColor: '#395E8F',
    top: '50%',
    transform: 'translateY(-50%)',
    left: side === 'right' ? '110%' : 'auto',
    right: side === 'left' ? '110%' : '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '1rem',
    lineHeight: '0.75rem',
    color: '#FFFCEC',
    boxShadow: '0px 0px 4px #ccc',
  };

  return (
    <div
      className={`${itemLayout} mx-auto w-[300px] xw:w-[315px] sm:w-[420px] md:w-auto md:max-w-[490px]  my-8`}
      data-aos={aosAnimation}>
      <div className="relative p-3 xw:p-4 rounded-lg shadow-md flex flex-col bg-white">
        <Link href={book.buyingLink} target="_blank">
          <Image
            src={book.imgUrl}
            alt={`${book.title} Cover`}
            width={200}
            height={240}
            layout="responsive"
            objectFit="cover"
            className="max-w-[7rem] sm:max-w-[8rem] md:max-w-[10rem] aspect-2/3"
          />
        </Link>
        <div className={` ${side == 'right' ? 'text-left' : 'text-left'}`}>
          <h3
            className={`text-md font-bold whitespace-normal max-w-[7.5rem] mx-[-0.25rem] sm:max-w-[8rem] md:max-w-[10rem] text-secondary`}>
            {book.title}
          </h3>
          <p className="text-sm whitespace-normal max-w-[7rem] sm:max-w-[8rem] md:max-w-[10rem]">
            <span className="font-semibold text-black/90">Author:</span>{' '}
            {book.author}
          </p>
        </div>
        <span
          style={dotStyle}
          className='bg-[url("../public/assets/noise-light.png")] text-center flex flex-col space-y-2'>
          <span>{book.monthYear['month'].substring(0, 3)}</span>
          <span className="mt-1">{book.monthYear['year']}</span>
        </span>
        <span
          className={` w-6 h-6 z-[-1] drop-shadow-lg absolute top-1/2 -translate-y-1/2 ${
            side == 'right' ? 'right-[-1.2rem] ' : 'left-[-1rem] rotate-[60deg]'
          } `}>
          <Image src={ArrowSvg} alt="arrow" />
        </span>
      </div>
    </div>
  );
};

const BookTimeline = ({ books }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className=" mx-auto w-full">
      <div className="relative wrap overflow-hidden sm:px-4 h-full">
        <h2 className="mb-12 mt-8 mx-auto border-2 w-fit border-[#08111F] bg-white px-5 py-3 font-extrabold uppercase leading-none text-black shadow-[4px_4px_0_#08111F] z-10">
          Book of the Month
        </h2>
        <div
          className="border-2-2 absolute border-opacity-20 border-gray-700 h-[calc(100%-13rem)]  xw:h-[calc(100%-13.5rem)]  border"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            top: '3rem',
            zIndex: -1,
          }}
        />

        {books.map((book, index) => (
          <TimelineItem
            key={index}
            book={book}
            side={index % 2 === 0 ? 'right' : 'left'}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default BookTimeline;
