import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/app/firebase';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import Image from 'next/image';
import toast from 'react-hot-toast';

const EditProfileModal = ({ isOpen, onClose }) => {
  const overlayRef = useRef();
  const fileInputRef = useRef(null);
  const modalContainerRef = useRef();
  const { user, setUser } = useUser();
  const [editedUser, setEditedUser] = useState({ ...user });
  const [profileImage, setProfileImage] = useState(user.profilePic);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleInputChange = (e) => {
    if (e.target.name === 'phoneNumber') {
      if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
      }
    } else {
      setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    }
  };

  const handleImageUpload = async (file) => {
    const imageRef = ref(storage, `profileImages/${user.id}/${file.name}`);
    await uploadBytes(imageRef, file);
    return getDownloadURL(imageRef);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setProfileImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      let url = profileImage;
      let storagePath;
      if (selectedFile) {
        if (user?.storagePath) {
          const oldImageRef = ref(storage, user.storagePath);
          await deleteObject(oldImageRef);
        }
        url = await handleImageUpload(selectedFile);
        storagePath = `profileImages/${user.id}/${selectedFile.name}`;
      } else {
        // Only set storagePath if it already exists in the user object
        storagePath = user.storagePath ? user.storagePath : null;
      }

      const updatedUserInfo = {
        ...editedUser,
        profilePic: url,
      };

      // Only include storagePath in the update if it's not null
      if (storagePath !== null) {
        updatedUserInfo.storagePath = storagePath;
      }

      const userDocRef = doc(db, 'users', user.id);
      await updateDoc(userDocRef, updatedUserInfo);
      setUser(updatedUserInfo);
      localStorage.setItem('user', JSON.stringify(updatedUserInfo));
      toast.success('Updated the User Details');
      onClose();
    } catch (updateError) {
      toast.error('Error updating profile');
      setError('Error updating profile');
      console.error('Error updating profile:', updateError.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalContainerRef}
      className="fixed inset-0 z-[100] bg-black bg-opacity-60 overflow-y-scroll text-black">
      <div className="bg-white p-10 rounded-xl shadow-2xl mx-auto my-10 relative max-w-lg ">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#333] bg-black/10 p-2 rounded-full hover:scale-110 transition-all duration-150 ease-linear">
          {/* Close button (X) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h3 className="text-2xl font-semibold text-center mb-6">
          Edit Your Profile
        </h3>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <form className="space-y-6">
          <div className="space-y-3 ">
            <div className="flex items-center space-y-3 justify-center flex-col">
              <Image
                src={profileImage}
                alt="Profile"
                width={120}
                height={120}
                className="rounded-full w-[10rem] h-[10rem] object-cover border-2 border-gray border-dashed "
              />
              <button
                type="button"
                onClick={triggerFileInput}
                className="py-2 px-4 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition duration-300 mx-auto w-fit">
                Change Profile Image
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          {/* Other Input Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={editedUser.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={editedUser.address}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <button
            onClick={(e) => handleSubmit(e)}
            type="button"
            className="w-full bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 transition-all duration-300">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
