'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import BookLogo from '../public/assets/book-logo.svg';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import SignInModal from './SignInModal';
import Logo from '../public/assets/BBC-Logo.png';
import LogooutSvg from '../public/assets/logout-logo.svg';
import ProfileSvg from '../public/assets/profile.svg';

const navigation = [
  {
    id: 10,
    name: 'Home',
    path: '/',
  },
  {
    id: 3,
    name: 'About Us',
    path: '/about',
  },
  {
    id: 1,
    name: 'Membership',
    path: '/membership',
  },

  {
    id: 2,
    name: 'BOTM',
    path: '/botm',
  },
  {
    id: 0,
    name: 'Events',
    path: '/events',
  },
  {
    id: 8,
    name: 'Gallery',
    path: '/gallery',
  },

  {
    id: 4,
    name: 'Contact Us',
    path: '/contact',
  },
];

const Header = (props) => {
  const pathname = usePathname();
  const { user, handleSignInWithGoogle, handleLogout } = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const [shadow, setShadow] = useState(false);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const signInAndRedirect = async () => {
    await handleSignInWithGoogle();
    setIsModalOpen(false);
    setShowDropdown(false);
    router.push('/membership');
  };

  const handleJoinClick = () => {
    if (user) {
      router.push('/membership');
      setShowDropdown(false);
    } else {
      setIsModalOpen(true);
    }
  };

  const toggleMenu = () => {
    if (window.innerWidth < 1024) {
      setShowMenu(!showMenu);
    } else {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && showMenu) {
        setShowMenu(false);
      }
    };
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showMenu]);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showMenu]);

  const handleScroll = () => {
    if (window.scrollY > 12) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50
        duration-300 group bg-gradient-to-r from-[#FCF1F4] to-[#EDFBF9]  ${
          props.className
        } ${shadow && !showMenu && 'shadow-sm'}`}>
      <div className="flex w-full items-center container z-[150] bg-gradient-to-r from-[#FCF1F4] to-[#EDFBF9]  justify-between py-5 h-[5rem] relative">
        <div className="h-10 z-[100] lg:w-[110px]  mix-blend-multiply">
          <Link href="/" className="">
            <Image
              width={40}
              height={40}
              src={Logo}
              alt="BBC"
              className="h-12 w-auto z-[100] -translate-y-1 active:scale-[80%] transition-all duration-200 ease-linear"
            />
          </Link>
        </div>

        {/* Desktop View */}
        <ul className="items-center gap-12 hidden lg:flex ">
          {navigation.map((nav) => (
            <l1
              key={nav.id}
              className={`inline-block ${
                nav.path == pathname.toLocaleLowerCase()
                  ? 'text-secondary'
                  : 'text-black'
              }  font-semibold font-mulish  transition hover:scale-110 hover:text-secondary text-lg`}>
              <Link href={nav.path}>{nav.name}</Link>
            </l1>
          ))}
        </ul>
        <div className="flex gap-4 items-center z-[110] relative">
          <div className="lg:w-[110px] w-full flex justify-end">
            {user ? (
              <Image
                width={48}
                height={48}
                src={user.profilePic}
                alt={user.name}
                className="w-9 h-9 cursor-pointer rounded-full object-cover"
                onClick={() => setShowDropdown(!showDropdown)}
              />
            ) : (
              <button
                onClick={handleJoinClick}
                className="w-fit inline-flex items-center justify-center gap-2.5 border-2 border-secondary bg-gradient-to-r from-[#FCF1F4] to-[#EDFBF9] text-sm lg:text-base font-mulish text-secondary  px-2 py-1  font-extrabold  hover:shadow-[4px_4px_0_#395E8F] duration-300 shadow-none uppercase">
                <Image
                  src={BookLogo}
                  width={32}
                  height={32}
                  alt="read"
                  className="w-6 h-6 lg:w-8 lg:h-8"
                />
                Join
              </button>
            )}
          </div>

          <button
            type="button"
            className="flex h-10 w-10 z-[100] items-center flex-shrink-0 justify-center rounded-full bg-secondary lg:hidden"
            onClick={() => toggleMenu()}>
            {showMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-black dark:text-white">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white">
                <path
                  d="M2 15H11C11.552 15 12 15.447 12 16C12 16.553 11.552 17 11 17H2C1.448 17 1 16.553 1 16C1 15.447 1.448 15 2 15Z"
                  fill="currentColor"
                />
                <path
                  d="M2 8H20C20.552 8 21 8.447 21 9C21 9.553 20.552 10 20 10H2C1.448 10 1 9.553 1 9C1 8.447 1.448 8 2 8Z"
                  fill="currentColor"
                />
                <path
                  d="M21 2C21 1.447 20.552 1 20 1H7C6.448 1 6 1.447 6 2C6 2.553 6.448 3 7 3H20C20.552 3 21 2.553 21 2Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>

          {user && showDropdown && (
            <div
              ref={dropdownRef}
              className=" rounded overflow-hidden bg-gradient-to-r from-[#FCF1F4] to-[#EDFBF9] w-[150px] shadow-[0px_0px_4px_#aaaaaa] border border-black absolute right-5  translate-y-[80%] flex flex-col gap-2">
              <button
                onClick={handleJoinClick}
                className="px-4 py-2 hover:scale-110 active:scale-100 whitespace-nowrap transition duration-300 ease-in-out text-black font-semibold flex items-center gap-2">
                <Image
                  src={BookLogo}
                  width={32}
                  height={32}
                  alt="read"
                  className="w-6 h-6"
                />
                Join Now
              </button>
              <Link href={'/profile'}>
                <button
                  onClick={() => setShowDropdown(false)}
                  className="px-4 py-2 hover:scale-110 active:scale-100 whitespace-nowrap transition duration-300 ease-in-out text-black font-semibold flex items-center gap-2">
                  <Image
                    src={ProfileSvg}
                    width={32}
                    height={32}
                    alt="read"
                    className="w-6 h-6"
                  />
                  Profile
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 hover:scale-110 active:scale-100 whitespace-nowrap transition duration-300 ease-in-out text-black font-semibold flex items-center gap-2">
                <Image
                  src={LogooutSvg}
                  width={32}
                  height={32}
                  alt="read"
                  className="w-6 h-6 scale-90"
                />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Mobile view */}
      <div
        className={`w-screen h-[calc(100vh-5rem)] scrollbar-hide overflow-y-auto bg-gradient-to-r from-[#FCF1F4] to-[#EDFBF9]   ${
          showMenu ? ' translate-y-0' : 'translate-y-[-200%]'
        } fixed inset-0 top-[5rem] top z-[0] transition-all duration-[.5s] ease-in-out`}>
        <ul className="flex items-center flex-col gap-8 pb-8">
          {navigation.map((nav) => (
            <l1
              onClick={() => toggleMenu(!toggleMenu)}
              key={nav.id}
              className={`inline-block ${
                nav.path == pathname.toLocaleLowerCase()
                  ? 'text-secondary'
                  : 'text-black'
              } font-semibold font-mulish  transition hover:scale-110 hover:text-secondary text-lg`}>
              <Link href={nav.path}>{nav.name}</Link>
            </l1>
          ))}
        </ul>
      </div>
      <SignInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSignInWithGoogle={signInAndRedirect}
      />
    </header>
  );
};

export default Header;
