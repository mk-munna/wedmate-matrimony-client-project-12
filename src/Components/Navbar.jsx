import React, { useState, useEffect, useContext } from 'react';
import { FaRegMoon, FaRegUser, FaUserAlt } from 'react-icons/fa';
import { TfiMenuAlt } from 'react-icons/tfi';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthContextProvider';
import { signOut } from 'firebase/auth';
import { auth } from "../Provider/firebase.config";
import toast from 'react-hot-toast';
import logo from '../../public/heart-crack-solid.png'
import { set } from 'firebase/database';
import { BsWatch } from 'react-icons/bs';
import { CiClock2, CiInstagram, CiLight, CiTwitter } from 'react-icons/ci';
import { IoCallOutline, IoClose } from 'react-icons/io5';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { SlSocialFacebook, SlSocialLinkedin } from 'react-icons/sl';
import { HiOutlineUser } from 'react-icons/hi';
import { Tooltip } from 'react-tooltip'
// import './Header.css'

const Navbar = () => {
    const { user, loading } = useContext(AuthContext)
    // console.log(user)
    const themeFromLocalStorage = localStorage.getItem("theme")
    const [theme, setTheme] = useState(themeFromLocalStorage);
    const [isOpen, setIsOpen] = useState(false)
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [showNavbar, setShowNavbar] = useState(false);
    const [hidden, setHidden] = useState(false);
    useEffect(() => {
        // console.log(window.scrollY)
        const handleScroll = () => {
            
            if (window.scrollY >= 150) {
                if (window.scrollY > lastScrollTop) {
                    setHidden(false)
                    setShowNavbar(false);
                    
                } else {
                    if (!isOpen) {
                        setShowNavbar(true);
                    }
                    if (window.scrollY < 160) {
                        setHidden(true)
                    }
                }
                setLastScrollTop(window.scrollY);
            } else {
                setShowNavbar(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop, isOpen]);
    // console.log({ hidden });
    // console.log({ showNavbar });
    const handleClick = () => {
        signOut(auth)
            .then(() => {
                toast.success(' successfully logged out!')
            }).catch(err => {
                console.log(err.message);
            })
    }
    useEffect(() => {
        if (theme) {
            // save theme to local storage
            localStorage.setItem("theme", "true");
            document.querySelector("html").classList.add("dark")
        } else {
            localStorage.removeItem("theme");
            document.querySelector("html").classList.remove("dark")
        }
    }, [theme])

    const handleClose = () => {
        setIsOpen(!isOpen);
        if (window.scrollY >= 150) { 
            setShowNavbar(true);
        }
    }
    return (
        <nav className='bg-[#ECF0F2] dark:bg-dark'>
            <div>
                <div className=" bg-primary dark:bg-[#183238] ">
                    <div className='lg:w-[1120px] mx-auto flex flex-col lg:flex-row justify-between pt-4 pb-12'>
                        <div className='flex gap-6 flex-col-reverse items-center md:flex-row'>
                            <div className='flex items-center gap-2'>
                                <span className='bg-white p-2 rounded-full'><CiClock2 /> </span>
                                <p className='text-white font-light'>Monday - Friday, 8:00am- 5:00 pm</p>
                            </div>
                            <div className='flex items-center gap-2 '>
                                <span className='bg-white p-2 rounded-full'><MdOutlineAlternateEmail /> </span>
                                <p className='text-white font-light'>wedmate@support.com</p>
                            </div>
                            <div className='flex items-center gap-2 '>
                                <span className='bg-white p-2 rounded-full'><IoCallOutline /> </span>
                                <p className='text-white font-light'>+8801893345368</p>
                            </div>
                        </div>

                        <div className='flex gap-12 lg:mt-0 mt-6 items-center justify-center'>
                            {/* toggle */}
                            <div className={`rounded-full ${theme ? 'bg-gray-50 text-gray-500 shadow-custom2  p-[4px]' : 'shadow-custom'}   `} onClick={() => setTheme(!theme)}>
                                <div className={`icon-container `}>
                                    {theme ? (
                                        <FaRegMoon className="text-xl cursor-pointer" />
                                    ) : (
                                            <CiLight className=" bg-gray-50 text-gray-500  rounded-md text-2xl shadow-custom cursor-pointer -ml-1" />
                                    )}
                                </div>
                            </div>
                            {/* social icon */}
                            <div className='flex z-10 gap-4'>
                                <span className='bg-white p-2 cursor-pointer hover:transform hover:-translate-y-[2px] border duration-300 hover:text-primary text-gray-600 rounded-full'><SlSocialFacebook /> </span>
                                <span className='bg-white p-2 cursor-pointer hover:transform hover:-translate-y-[2px] duration-300 hover:text-primary rounded-full border'><CiTwitter /></span>
                                <span className='bg-white p-2 cursor-pointer hover:transform hover:-translate-y-[2px] duration-300 hover:text-primary rounded-full border'><CiInstagram /> </span>
                                <span className='bg-white p-2 cursor-pointer hover:transform hover:-translate-y-[2px] duration-300 hover:text-primary text-gray-600 rounded-full border'><SlSocialLinkedin /></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative flex-grow">
                    <header className={`bg-white dark:bg-[#1b3c44] text-heading dark:text-heading2 lg:absolute -top-[200px] ${hidden ? '-top-[15px]' : '-top-[15px]'} left-1 right-1 lg:w-[1120px]  z-10  mx-auto -mt-4 transition-all duration-[0.5s] `}>
                        <div className="px-4 mx-auto sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16 lg:h-20">
                                <div className="flex-shrink-0">
                                    <a href="#" title="" className="flex gap-2 items-center">
                                        <img className='w-[25px] md:w-[30px] lg:w-[40px]' src={logo} alt="" />
                                        <p className=' font-semibold text-xl md:text-2xl lg:text-3xl'>WedMate</p>
                                    </a>
                                </div>
                                <div>
                                    {
                                        isOpen ? (
                                            ''

                                        ) : (
                                                <button onClick={() => { setIsOpen(!isOpen) }} type="button" className="inline-flex p-1  transition-all duration-200 lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                                                    <TfiMenuAlt className='text-xl' />
                                                </button>
                                        )
                                    }
                                </div>
                                

                                <ul className="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
                                    <NavLink className={'text-base font-semibold  transition-all duration-200 hover:text-opacity-80'} to={'/'}><li className=''>Home</li></NavLink>
                                    <NavLink className={'text-base font-semibold  transition-all duration-200 hover:text-opacity-80'} to={'/bio-datas'}><li className=''>Biodatas</li></NavLink>
                                    <NavLink className={'text-base font-semibold  transition-all duration-200 hover:text-opacity-80'} to={'/about-us'}><li className=''>About</li></NavLink>
                                    <NavLink className={'text-base font-semibold  transition-all duration-200 hover:text-opacity-80'} to={'/contact'}><li className=''>Contact</li></NavLink>
                                    <div className="w-px h-5 bg-primary"></div>
                                    <div className='flex items-center'>
                                        {
                                            loading ? (
                                                <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
                                            ) : (
                                                user ? (
                                                    <div className=" flex items-center gap-2 ">
                                                        <Tooltip id="my-tooltip" />
                                                        <div>
                                                            <div data-tooltip-id="my-tooltip" place="top" data-tooltip-content={user?.displayName || 'Unknown'} tabIndex={0} role="button" className=" m-1">
                                                                {
                                                                    user?.photoURL ? (
                                                                        <img src={user?.photoURL} alt="" className="w-8 h-8 rounded-full " />
                                                                    ) : (
                                                                        <div className="bg-[#3bd8d8] text-lg w-8 h-8 flex justify-center items-center rounded-full">
                                                                            {
                                                                                user?.displayName ? (

                                                                                    <p>{user?.displayName.charAt(0).toUpperCase()}</p>
                                                                                ) : (
                                                                                    <p>U</p>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>

                                                        </div>
                                                        <Link to={'/dashboard'} className='font-light px-2 py-1 border-r text-sm hover:shadow-md  duration-300 border-primary rounded-md'>Dashboard</Link>
                                                    </div>
                                                ) : (
                                                    <div className='flex ml-6 items-center gap-4'>
                                                        <HiOutlineUser className='text-xl' />
                                                        <Link onClick={() => { setIsOpen(false) }} to={'/login'}>Login</Link>
                                                    </div>
                                                )
                                            )
                                        }

                                        <div className=' pl-10'>
                                            <button className='flex items-center gap-2 bg-primary dark:bg-[#2a6e55] rounded-md text-sm px-4 py-2 text-white dark:text-gray-200 font-light hover:shadow-md '>Get Premium</button>
                                        </div>
                                    </div>
                                </ul>
                            </div>

                        </div>
                    </header>

                </div>
            </div>
            <header className={`fixed w-full bg-white dark:bg-[#1b3c44] text-heading dark:text-heading2 z-10  transition-transform duration-[0.5s] 
            ${showNavbar ? 'transform -translate-y-[315px] md:-translate-y-[205px] lg:-translate-y-[125%]' : 'transform -translate-y-[380px]'} ${hidden && 'none'}`}>
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        <div className="flex-shrink-0">
                            <a href="#" title="" className="flex gap-2 items-center">
                                <img className='w-[25px] lg:w-[40px]' src={logo} alt="" />
                                <p className=' font-semibold text-xl lg:text-3xl'>WedMate</p>
                            </a>
                        </div>
                        <div>
                            {
                                isOpen ? (
                                    ''

                                ) : (
                                        <button onClick={() => {
                                            setIsOpen(!isOpen)
                                            setShowNavbar(false)
                                        }} type="button" className="inline-flex p-1  transition-all duration-200 lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                                        <TfiMenuAlt className='text-xl' />
                                    </button>
                                )
                            }
                        </div>

                        <ul className="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
                            <NavLink className={'text-base font-semibold  transition-all duration-200 hover:text-opacity-80'} to={'/'}><li className=''>Home</li></NavLink>
                            <NavLink className={'text-base font-semibold  transition-all duration-200 hover:text-opacity-80'} to={'/fnsf'}><li className=''>ALl Jobs</li></NavLink>
                            <NavLink className={'text-base font-semibold  transition-all duration-200 hover:text-opacity-80'} to={'/gsgwgw'}><li className=''>Contact</li></NavLink>
                            <div className="w-px h-5 bg-primary"></div>
                            <div className='flex items-center'>
                                {
                                    loading ? (
                                        <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
                                    ) : (
                                        user ? (
                                            <div className=" flex items-center gap-2 ">
                                                <Tooltip id="my-tooltip" />
                                                <div>
                                                    <div data-tooltip-id="my-tooltip" place="top" data-tooltip-content={user?.displayName || 'Unknown'} tabIndex={0} role="button" className=" m-1">
                                                        {
                                                            user?.photoURL ? (
                                                                <img src={user?.photoURL} alt="" className="w-8 h-8 rounded-full " />
                                                            ) : (
                                                                <div className="bg-[#3bd8d8] text-lg w-8 h-8 flex justify-center items-center rounded-full">
                                                                    {
                                                                        user?.displayName ? (

                                                                            <p>{user?.displayName.charAt(0).toUpperCase()}</p>
                                                                        ) : (
                                                                            <p>U</p>
                                                                        )
                                                                    }
                                                                </div>
                                                            )
                                                        }
                                                    </div>

                                                </div>
                                                <Link to={'/dashboard'} className='font-light px-2 py-1 border-r text-sm hover:shadow-md  duration-300 border-primary rounded-md'>Dashboard</Link>
                                            </div>
                                        ) : (
                                            <div className='flex ml-6 items-center gap-4'>
                                                <HiOutlineUser className='text-xl' />
                                                <Link onClick={() => { setIsOpen(false) }} to={'/login'}>Login</Link>
                                            </div>
                                        )
                                    )
                                }

                                <div className=' pl-10'>
                                    <button className='flex items-center gap-2 bg-primary dark:bg-[#2a6e55] rounded-md text-sm px-4 py-2 text-white dark:text-gray-200 font-light hover:shadow-md '>Get Premium</button>
                                </div>
                            </div>
                        </ul>
                    </div>

                </div>
            </header>

            
            {/* toggle menu */}
            <ul className={`fixed overflow-auto w-4/6 md:w-5/12 lg:hidden py-12 px-6 h-screen transition-all duration-500 z-20 bg-white dark:bg-[#1b3c44] ${isOpen ? 'top-0 left-0 lg:bg-white dark:text-heading2  text-black' : '-left-[100%] top-0   dark:text-heading2  text-black'}`}>
                <IoClose onClick={handleClose} className='   text-4xl font-bold text-primary w-[25px] lg:hidden absolute top-0 right-2' />
                <li className='flex flex-col lg:flex-row gap-4 lg:gap-6 text-sm'>
                    <div className="flex-shrink-0">
                        <a href="#" title="" className="flex gap-2 items-center">
                            <img className='w-[25px] lg:w-[40px]' src={logo} alt="" />
                            <p className=' font-semibold text-xl lg:text-3xl'>WedMate</p>
                        </a>
                    </div>
                    <NavLink className={''} to={'/'} onClick={() => { setIsOpen(false) }}>Home</NavLink>


                    <NavLink className={''} to={'/all-jobs'} onClick={() => { setIsOpen(false)  }}>All Jobs</NavLink>


                    <NavLink className={''} to={`/add-a-job`} onClick={() => { setIsOpen(false) }}>Add A Job</NavLink>


                    <NavLink className={''} to={`/applied-jobs`} onClick={() => { setIsOpen(false)}}>Applied Jobs</NavLink>

                    <NavLink className={''} to={`/my-jobs`} onClick={() => { setIsOpen(false) }}>My Jobs</NavLink>

                    <NavLink className={''} to={'/blogs'} onClick={() => { setIsOpen(false)}}>Blogs</NavLink>

                </li>
                <div className='mt-12'>
                    {
                        loading ? (
                            <div className="skeleton size-12 rounded-full shrink-0"></div>
                        ) : (
                            user ? (
                                <div className=" flex flex-col md:flex-row gap-2 ">
                                    <Tooltip id="my-tooltip" />
                                    <div>
                                        <div data-tooltip-id="my-tooltip" place="top" data-tooltip-content={user?.displayName || 'Unknown'} tabIndex={0} role="button" className=" m-1">
                                            {
                                                user?.photoURL ? (
                                                    <img src={user?.photoURL} alt="" className=" size-12  rounded-full " />
                                                ) : (
                                                    <div className="bg-[#3bd8d8] text-lg w-8 h-8 flex justify-center items-center rounded-full">
                                                        {
                                                            user?.displayName ? (

                                                                <p>{user?.displayName.charAt(0).toUpperCase()}</p>
                                                            ) : (
                                                                <p>U</p>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>

                                    </div>
                                        <div>
                                            <p className='font-semibold text-lg'>{user?.displayName}</p>
                                            <p className='text-sm font-light'>{user?.email}</p>
                                            <div className='flex items-center gap-4 mt-4'>
                                                <NavLink to={'/dashboard'} className={'bg-[#596e42] rounded-md px-2 py-1 text-white text-sm font-light'}>Dashboard</NavLink>
                                                <a className='cursor-pointer ml-2' onClick={handleClick}> Sign out</a>
                                            </div>
                                        </div>
                                </div>
                            ) : (
                                <div className='flex items-center gap-4'>
                                            <HiOutlineUser className='text-xl' />
                                            <Link onClick={() => { setIsOpen(false) }} to={'/login'}>Login</Link>
                                </div>
                            )
                        )
                    }

                    <div className='mt-6'>
                        <button className=' bg-primary dark:bg-[#2a6e55] rounded-md w-full text-center py-2 !text-sm text-white dark:text-gray-200 font-light '>Get Premium</button>
                    </div>
                </div>
            </ul>

            <div className=''>
                <img className=' w-[40px] lg:w-[80px] fixed bottom-0 right-0' src="https://rn53themes.net/themes/matrimo/images/leaf/8.png" alt="" />
            </div>
            <div className=''>
                <img className='rotate-12 w-[60px] lg:w-[150px] fixed top-[200px] -left-[10px]' src="https://rn53themes.net/themes/matrimo/images/leaf/5.png" alt="" />
            </div>
        </nav>
    );
};

export default Navbar;
