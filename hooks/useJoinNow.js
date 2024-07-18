'use client';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { useState } from 'react';

const useJoinNow = () => {
  const { user, handleSignInWithGoogle } = useUser();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const joinNow = async () => {
    if (user) {
      router.push('/membership');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalSignIn = async () => {
    await handleSignInWithGoogle();
    setIsModalOpen(false);
    router.push('/membership');
  };

  return { joinNow, isModalOpen, handleModalSignIn, setIsModalOpen };
};

export default useJoinNow;
