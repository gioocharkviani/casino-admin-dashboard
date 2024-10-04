'use client';
import { useState, useEffect, useRef } from 'react';
import { LiaSignOutAltSolid, LiaUserCircleSolid } from 'react-icons/lia'; // Use user icon
import { handleDeleteAuthCookie } from '@/utils/token';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import useUserStore from '@/store/useUserStore';
import { currentUser } from '@/services';
import { handleGetAuthCookie } from '@/utils/cookies';

const User = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await handleGetAuthCookie();
        const user = await currentUser(token);
        setUser(user.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  const signOut = () => {
    handleDeleteAuthCookie();
    router.push('/signin');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown on click
  };

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* USER ICON */}
      <div
        className="flex-shrink-0 w-10 h-10 hover:opacity-75 text-blue-500 rounded-full flex justify-center items-center cursor-pointer"
        onClick={toggleDropdown} // Toggle dropdown on click
      >
        <LiaUserCircleSolid className="dark:text-white w-full h-full" />
      </div>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-4 min-w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 transition-transform transform origin-top-right duration-300 ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {/* Logout button */}

          {/* Status or other links */}
          <span className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150">
            Hello : {user?.first_name}
          </span>
          <span className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150">
            Role : {user?.roles[0]}
          </span>

          <button
            className="flex items-center gap-2 px-4 py-2 w-full text-left text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
            onClick={signOut}
          >
            <LiaSignOutAltSolid />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
