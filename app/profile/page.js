'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import EditProfileModal from '@/components/EditProfileModal';
import { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import EditSvg from '../../public/assets/pencil.svg';
import { useLoading } from '@/contexts/LoadingContext';
import Loader from '@/components/Loader';
import AOS from 'aos';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

const ProfilePage = () => {
  const { user, setUser } = useUser();
  const { isLoading } = useLoading();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dbUser, setDbUser] = useState(null); // State to hold user data from Firestore

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.id) {
        const userRef = doc(db, 'users', user.id);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setDbUser(userSnap.data());
        } else {
          console.log('No such document!');
        }
      }
    };

    fetchUserData();
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (isLoading || (user && !dbUser)) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="mt-20 text-center text-xl font-medium">Please log in</div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-28">
      <Toaster />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md relative">
        <div className="text-center mb-6 flex flex-col items-center">
          <div className="rounded-full  w-40 h-40 ">
            <Image
              src={user.profilePic}
              alt="Profile Picture"
              className="h-full w-full rounded-full object-cover"
              width={360}
              height={360}
            />
          </div>
          <h2 className="text-2xl font-semibold mt-4 font-mulish text-black">
            {user.name}
          </h2>
        </div>
        <div className="border-t border-gray-200">
          <div className="mt-4">
            <div className="block sm:table">
              {/* Responsive table structure */}
              {[
                { label: 'Email', value: user.email },
                { label: 'Phone', value: user.phoneNumber || 'Not Provided' },
                { label: 'Address', value: user.address || 'Not Provided' },
                { label: 'Reward Points', value: `${user.rewards}🪙` || 0 },
                {
                  label: 'Plan',
                  value:
                    user.planChoosed['duration'] ||
                    "You haven't chosen a plan yet",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="sm:table-row text-black font-mulish">
                  <div className="mt-2 sm:table-cell sm:px-6 sm:py-4  sm:text-base font-bold">
                    {item.label}:
                  </div>
                  <div className=" sm:table-cell sm:px-6 sm:py-4  sm:text-base text-gray-900 font-medium">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-6 absolute top-[-10px] right-4">
          <button
            className="p-2 bg-black/10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
            onClick={() => setIsEditModalOpen(true)}>
            <Image src={EditSvg} className="w-7 h-7" alt="edit svg" />
          </button>
        </div>
      </div>
      {isEditModalOpen && (
        <EditProfileModal
          user={user}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
