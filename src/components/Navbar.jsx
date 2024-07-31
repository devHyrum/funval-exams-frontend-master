import React, { useState, useRef, useEffect  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import protagonista from '../assets/protagonista.png';
import logoutPicture from '../assets/logoutPicture.svg';
import profile from '../assets/profile.png';
import home from '../assets/home.svg';
import funvalLogoLight from '../assets/funvalLogoLight.png';
import { useTheme } from '../context/ThemeContext.jsx';
import lightMode from '../assets/lightMode.svg';
import darkMode from '../assets/darkMode.svg';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const headerRef = useRef(null);
  const navRef = useRef(null);

  const { isDarkMode, toggleDarkMode  } = useTheme();


  const handleHeaderClick = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleOutsideClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target) && headerRef.current && !headerRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  const handleNavClick = () => {
    if (!isNavOpen) {
      setIsNavOpen(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(true);
      setTimeout(() => {
        setIsNavOpen(false);
        setIsAnimating(false);
      }, 300);
    }
  };
  const handleOutNavClick = (event) => {
    if(navRef.current && !navRef.current.contains(event.target)){
      setIsNavOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('mousedown', handleOutNavClick); 

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.addEventListener('mousedown', handleOutNavClick); 
    };
  }, []);

  return (
    <nav className="bg-[#899ded] text-white p-2 dark:bg-[#1d1a19] ">
      <div className="container mx-auto flex justify-between items-center">

        <div className='flex items-center'>
          <img src={funvalLogoLight} alt="funvalLogoLight" className='sm:size-[15%] size-[40%] cursor-pointer'  onClick={() => navigate('/dashboard')}/> 
          <p className='pl-2 sm:text-2xl text-base cursor-pointer' onClick={() => navigate('/dashboard')}>Exams</p>
        </div>

        {user ? (
            <>
           {/* Desing mobile */}
        <div className='flex md:hidden'>
          <div ref={headerRef} onClick={handleNavClick} className='flex cursor-pointer items-center'>
            <img src={protagonista} alt="protagonista" className='w-25 md:w-auto rounded-full border-solid border-[1px] border-white p-[3px]'/>
          </div>
        </div>
        {isNavOpen && (
          <div className="fixed inset-0 bg-[#252329] bg-opacity-80 flex justify-end z-20 transition-opacity duration-300 text-[#333333]">
              <div ref={navRef} className={`bg-white dark:bg-[#292523] dark:text-white shadow-md w-30 p-4 ${isAnimating ? (isNavOpen ? 'slide-in' : 'slide-out') : ''}`}>
                <div className='flex items-center mb-4'>
                    <img src={protagonista} alt="protagonista" className='w-10 h-10 rounded-full '/>
                    <p className='text-sm font-bold text-[#333333] dark:text-[#BDBDBD] ml-4 text-ellipsis overflow-hidden     whitespace-nowrap w-[110px]'>{user.name}</p>
                </div>
                <ul>
                  <li className="flex cursor-pointer p-2 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-[#3b393e] items-center"><img src={profile} alt="profile" className='w-[23px] h-[23px] mr-2'/>My Profile</li>
                  <li className="flex cursor-pointer p-2 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-[#3b393e] items-center" onClick={() => navigate('/dashboard')}><img src={home} alt="home" className='w-[20px] mr-3'/>Home</li>
                  <li className="flex cursor-pointer p-2 my-4 border-solid border-t-[1px] border-[#E0E0E0] dark:border-gray-600 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-[#3b393e] text-[#EB5757] items-center" onClick={logout}><img src={logoutPicture} alt="logoutPicture" className='w-[20px] mr-2'/>Logout</li>
                </ul>
              </div>
          </div>
        )}
            {/* Desing desktop */}
        <div className='hidden md:flex' ref={headerRef}>
            <button className='pr-4 text-lg' onClick={handleHeaderClick}>{user.name}</button>
            <img src={protagonista} alt="protagonista" className='w-14 mr-2 rounded-full border-solid border-[1px] border-white p-[3px] cursor-pointer' onClick={handleHeaderClick}/>
            <button onClick={toggleDarkMode} className="ml-5 p-4 bg-gray-200 dark:bg-gray-600 rounded-full transition-colors duration-500">
              <img src={isDarkMode ? darkMode : lightMode} alt="toggle mode theme" className='transition-transform duration-500'/>
            </button>
        </div>
        {isModalOpen && (
          <div ref={modalRef} className="fixed top-16 right-4 border-solid border-[1px] border-[#929292] bg-white dark:bg-[#292523] dark:border-white dark:border-solid dark:border-[1px] dark:text-white shadow-md rounded-xl p-4 w-[188px] h-[174px] text-[#333333]">
            <ul>
              <li className="flex cursor-pointer p-2 rounded-lg h-[39.15px] text-xs font-medium hover:bg-gray-200     dark:hover:bg-[#3b393e] items-center" ><img src={profile} alt="profile" className='w-[23px] h-[23px] mr-2'/>My    Profile</li>
              <li className="flex cursor-pointer p-2 rounded-lg h-[39.15px] text-xs font-medium hover:bg-gray-200     dark:hover:bg-[#3b393e] items-center" onClick={() => navigate('/dashboard')}><img src={home} alt="home"     className='w-[20px]  mr-3'/>Home</li>
              <li className="flex cursor-pointer p-2 my-4 border-solid border-t-[1px] border-[#E0E0E0] dark:border-gray-600 rounded-lg h-[39.15px] text-xs font-medium hover:bg-gray-200 dark:hover:bg-[#3b393e] text-[#EB5757] items-center" onClick={logout}><img src={logoutPicture} alt="logoutPicture" className='w-[20px] mr-2'/>Logout</li>
            </ul>
          </div>
        )}

            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

      </div>
    </nav>
  );
};

export default Navbar;