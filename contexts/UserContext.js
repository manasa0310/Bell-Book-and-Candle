'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/app/firebase';
import toast, { Toaster } from 'react-hot-toast';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleSignInWithGoogle = useCallback(async () => {
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      const firebaseUser = userCredential.user;

      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // The user document does not exist; create a new one
        const userDoc = {
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          phoneNumber: firebaseUser.phoneNumber || '',
          address: '',
          role: 'member',
          isPaidMember: false,
          planChoosed: '',
          profilePic: firebaseUser.photoURL,
          id: firebaseUser.uid,
          rewards: 50,
        };

        await setDoc(userDocRef, userDoc);
        setUser(userDoc); // Update user state
        toast.success('Logged In Sucessfull');
      } else {
        toast.success('Logged In Sucessfull');
        setUser(userDocSnap.data());
      }
    } catch (error) {
      toast.error('Logged Failed Please Try Again');
      console.error('Error signing in with Google:', error.message);
    }
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await signOut(auth); // Firebase sign out
      setUser(null); // Clear user state
      localStorage.removeItem('user'); // Adjust the key based on what you've set
      toast.success('Logout Successful');
    } catch (error) {
      console.error('Error signing out:', error.message);
      toast.error('Logout Failed');
    }
  }, [setUser]);

  return (
    <UserContext.Provider
      value={{ user, setUser, handleSignInWithGoogle, handleLogout }}>
      <Toaster />
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
