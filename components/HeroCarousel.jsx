'use client';
import Slider from 'infinite-react-carousel';
import Image from 'next/image';
import { useBooks } from '@/contexts/BooksContext';
import Link from 'next/link';

export default function HeroCarousel() {
  const { allBookOfTheMonth } = useBooks();

  return (
    <div className="carousel-wrapper max-w-[275px] max-h-[412.5px]  xs:max-w-[300px] xs:max-h-[450px] carousel-dots-top   object-fill text-black shadow-[4px_4px_0px_#08111F] duration-300 rounded-xl border-[4px] border-[#08111F] relative group">
      <Slider
        autoplay={true}
        arrows={false}
        pauseOnHover={false}
        autoplaySpeed={3000}>
        {allBookOfTheMonth &&
          allBookOfTheMonth.length > 0 &&
          allBookOfTheMonth.map((bom, index) => (
            <Link key={bom.id} href={'/botm'}>
              <div className="relative group min-h-[412.5px] xs:min-h-[450px] rounded-2xl w-full h-full z-10">
                <Image
                  src={bom.imgUrl}
                  alt="book"
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-gradient-to-b from-transparent to-black  transition-all duration-200 ease-linear opacity-0 group-hover:opacity-100 cursor-pointer"></div>
                <div className="absolute bottom-5 left-5 group-hover:translate-y-0 translate-y-[200%]  transition-all duration-300 ease-linear">
                  <p
                    className={`inline-block rounded bg-secondary  py-1 px-2.5 text-[12px] drop-shadow-lg font-extrabold text-white`}>
                    {bom.monthYear['month']}
                  </p>
                  <h5 className="mt-3 text-xl  drop-shadow-xl whitespace-normal font-extrabold text-white">
                    {bom.title}
                  </h5>
                </div>
              </div>
            </Link>
          ))}
      </Slider>
    </div>
  );
}
