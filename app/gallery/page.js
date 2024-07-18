'use client';
import React, { useState, useEffect } from 'react';
import Lightbox from 'react-18-image-lightbox';
import Image from 'next/image';
import 'react-18-image-lightbox/style.css';
import { useGallery } from '@/contexts/GalleryContext';
import { useLoading } from '@/contexts/LoadingContext';
import Loader from '@/components/Loader';
import AOS from 'aos';

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [currentAlbum, setCurrentAlbum] = useState([]);

  const { galleryByLocation } = useGallery();
  const { isLoading } = useLoading();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Clean up function to prevent memory leaks
    return () => {
      AOS.refresh();
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const openLightbox = (album, index) => {
    setCurrentAlbum(album);
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <section className="py-6 lg:py-12  mt-[5rem]">
      <div className="container">
        <h2 className="mb-12 mx-auto border-2 w-fit border-[#08111F] bg-white px-5 py-3 font-extrabold uppercase leading-none text-black shadow-[4px_4px_0_#08111F] ">
          Gallery
        </h2>

        <div
          className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4"
          data-aos="flip-left"
          data-aos-duration="1000">
          {Object.entries(galleryByLocation).map(([location, images]) => (
            <div
              key={location}
              className="group relative overflow-hidden rounded-[10px] cursor-pointer"
              onClick={() => openLightbox(images, 0)}>
              <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent to-black group-hover:opacity-100 opacity-0 transition-all duration-200 ease-linear"></div>
              <Image
                src={images[0].imageUrl}
                alt={location}
                width={600}
                height={600}
                className="h-full w-full object-cover duration-200 group-hover:scale-110"
              />
              <div className="absolute bottom-4 left-5 right-5 z-[1] text-white group-hover:translate-y-0 translate-y-[200%] transition-all duration-200 ease-linear">
                <span className="text-xl font-black duration-200 hover:text-secondary">
                  {location}
                </span>
              </div>
            </div>
          ))}
        </div>

        {isOpen && currentAlbum.length > 0 && (
          <Lightbox
            mainSrc={currentAlbum[photoIndex].imageUrl}
            nextSrc={
              currentAlbum[(photoIndex + 1) % currentAlbum.length].imageUrl
            }
            prevSrc={
              currentAlbum[
                (photoIndex + currentAlbum.length - 1) % currentAlbum.length
              ].imageUrl
            }
            onCloseRequest={closeLightbox}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (photoIndex + currentAlbum.length - 1) % currentAlbum.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % currentAlbum.length)
            }
          />
        )}
      </div>
    </section>
  );
};

export default Gallery;
