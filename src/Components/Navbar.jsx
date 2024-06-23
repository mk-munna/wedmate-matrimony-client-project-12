import React, { useState, useEffect, useContext } from 'react';
import { FaBook, FaHome, FaList, FaRegMoon, FaRegUser, FaUserAlt, FaUsers, FaUtensils } from 'react-icons/fa';
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
import { IoCallOutline, IoClose, IoShieldCheckmarkOutline } from 'react-icons/io5';
import { MdKeyboardArrowDown, MdMarkEmailRead, MdOutlineAlternateEmail } from 'react-icons/md';
import { SlSocialFacebook, SlSocialLinkedin } from 'react-icons/sl';
import { HiOutlineUser } from 'react-icons/hi';
import { Tooltip } from 'react-tooltip'
import { useTheme } from '../Provider/ThemeProvider';
import useAdmin from '../Hooks/useAdmin';
import { BiPen } from "react-icons/bi";
import { CiEdit, CiLogout } from "react-icons/ci";
import { SlCallOut } from "react-icons/sl";
import { LuHeartHandshake } from "react-icons/lu";
import { MdOutlineViewInAr } from "react-icons/md";
// import './Header.css'
import { GiTentacleHeart } from "react-icons/gi";

const Navbar = () => {
    const { user, loading } = useContext(AuthContext)
    const { theme, setTheme } = useTheme()
    // console.log(user)

    const [isOpen, setIsOpen] = useState(false)
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [showNavbar, setShowNavbar] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [showSubMenu1, setShowSubMenu1] = useState(false);
    const [showLine, setShowLine] = useState(false);
    const [showLine1, setShowLine1] = useState(false);
    const [showLine2, setShowLine2] = useState(false);
    const [showLine3, setShowLine3] = useState(false);
    const [showLine4, setShowLine4] = useState(false);
    const [showLine5, setShowLine5] = useState(false);
    const [showLine6, setShowLine6] = useState(false);
    const [isAdmin] = useAdmin();
    // console.log({ isOpen, showNavbar, hidden, menuVisible })
    useEffect(() => {
        // console.log(window.scrollY)
        const handleScroll = () => {

            if (window.scrollY >= 150) {
                if (window.scrollY > lastScrollTop) {
                    setHidden(false)
                    setShowNavbar(false);

                } else {
                    if (!isOpen && !menuVisible) {
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
    }, [lastScrollTop, isOpen, menuVisible]);
    // console.log({ hidden });
    // console.log({ showNavbar });
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                toast.success(' successfully logged out!')
            }).catch(err => {
                console.log(err.message);
            })
    }
    const handleClose = () => {
        setIsOpen(!isOpen);
        if (window.scrollY >= 150) {
            setShowNavbar(true);
        }
    }
    const timestamp = 1718209785698;
    const date = new Date(timestamp);
    return (
        <div>
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
                        <header className={`bg-white dark:bg-[#1b3c44] text-heading dark:text-heading2 lg:absolute  ${hidden ? '-top-[200px]' : '-top-[15px]'} left-1 right-1 lg:w-[1120px]  z-10  mx-auto -mt-4 transition-all duration-[0.5s] `}>
                            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                                <div className="flex items-center justify-between h-16 lg:h-20">
                                    <div className="flex-shrink-0">
                                        <a href="#" title="" className="flex gap-2 items-center">
                                            <img className='w-[25px] md:w-[30px] lg:w-[40px]' src={logo} alt="" />
                                            <p className=' text-xl md:text-2xl lg:text-3xl'>WedMate</p>
                                        </a>
                                    </div>
                                    <div>
                                        {
                                            isOpen ? (
                                                ''

                                            ) : (
                                                <button onClick={() => { setIsOpen(!isOpen),setMenuVisible(false) }} type="button" className="inline-flex p-1  transition-all duration-200 lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                                                    <div className="button-shadow !h-[42px] absolute !w-[42px]">
                                                        <div className="button-content">
                                                            <span className="block w-[18px] h-[3px] bg-white mb-1"></span>
                                                            <span className="block w-[18px] h-[3px] bg-white mb-1"></span>
                                                            <span className="block w-[18px] h-[3px] bg-white"></span>
                                                        </div>
                                                    </div>
                                                </button>
                                            )
                                        }
                                    </div>


                                    <ul className="hidden ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
                                        <NavLink className={'text-base  font-light transition-all duration-200 hover:text-opacity-80'} to={'/'}><li className=''>Home</li></NavLink>
                                        <NavLink className={'text-base  font-light   transition-all duration-200 hover:text-opacity-80'} to={'/bio-datas'}><li className=''>Biodatas</li></NavLink>
                                        <NavLink className={'text-base   font-light  transition-all duration-200 hover:text-opacity-80'} to={'/about-us'}><li className=''>About</li></NavLink>
                                        <NavLink className={'text-base   font-light  transition-all duration-200 hover:text-opacity-80'} to={'/contact'}><li className=''>Contact</li></NavLink>
                                        <div className="w-px h-5 bg-primary"></div>
                                        <div className='flex items-center'>
                                            {
                                                loading ? (
                                                    <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
                                                ) : (
                                                    user ? (
                                                        <div className=" flex items-center gap-2 relative">
                                                            <Tooltip id="my-tooltip" />
                                                            <div>
                                                                <div data-tooltip-id="my-tooltip" place="top" data-tooltip-content={user?.displayName || 'Unknown'} tabIndex={0} role="button" className=" m-1 pr-4">
                                                                    {
                                                                        user?.photoURL ? (
                                                                            <img src={user?.photoURL} alt="" className="w-8 h-8 object-cover rounded-full " />
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
                                                            <Link
                                                                onMouseEnter={() => setShowSubMenu(true)}
                                                                onMouseLeave={() => setShowSubMenu(false)}
                                                                to={isAdmin ? "/dashboard/admin-home" : "/dashboard/user-home"} className='font-light flex items-center gap-2  duration-[.35s]  '>Dashboard<MdKeyboardArrowDown /></Link>
                                                        

                                                                <div
                                                                    onMouseEnter={() => setShowSubMenu(true)}
                                                                    onMouseLeave={() => setShowSubMenu(false)}
                                                                    className={`absolute rounded-md bg-white dark:bg-[#1B3C44] transition-all  duration-[.35s] font-light left-12 top-[70%] ${showSubMenu ? "scale-y-100 translate-y-0" : "scale-y-0 -translate-y-[115px]"}`}>

                                                                    <ul className={`${isAdmin ? "w-[220px]" : "w-[210px]"} px-4 pt-8 pb-4`}>
                                                                        {/* NavLink 1 */}
                                                                        <div
                                                                            onMouseEnter={() => setShowLine(true)}
                                                                            onMouseLeave={() => setShowLine(false)}
                                                                            className="flex  gap-2 items-center"
                                                                        >
                                                                            <div>
                                                                                <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine ? "h-4" : "h-0"}`}></div>
                                                                            </div>
                                                                            <div className='py-2'>
                                                                                <NavLink
                                                                                    to={isAdmin ? "/dashboard/admin-home" : "/dashboard/user-home"}
                                                                                    className={`hover:text-primary transition-all duration-[.35s] ${showLine ? "ml-1" : "-ml-2"}`}
                                                                                >
                                                                                        {
                                                                                            isAdmin?"Admin Home" : "User Home"
                                                                                    }
                                                                                </NavLink>
                                                                            </div>
                                                                        </div>

                                                                            {
                                                                                isAdmin ? (
                                                                                    <div>
                                                                                        {/* NavLink 2 */}
                                                                                        <div
                                                                                            onMouseEnter={() => setShowLine1(true)}
                                                                                            onMouseLeave={() => setShowLine1(false)}
                                                                                            className="flex gap-2 items-center"
                                                                                        >
                                                                                            <div>
                                                                                                <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine1 ? "h-4" : "h-0"}`}></div>
                                                                                            </div>
                                                                                            <div className='py-2'>
                                                                                                <NavLink
                                                                                                to="/dashboard/manage-users"
                                                                                                    className={`hover:text-primary transition-all duration-[.35s] ${showLine1 ? "ml-1" : "-ml-2"} `}
                                                                                                >
                                                                                                    Manage Users
                                                                                                </NavLink>
                                                                                            </div>
                                                                                        </div>
                                                                                        {/* NavLink 2 */}
                                                                                        <div
                                                                                            onMouseEnter={() => setShowLine2(true)}
                                                                                            onMouseLeave={() => setShowLine2(false)}
                                                                                            className="flex gap-2 items-center"
                                                                                        >
                                                                                            <div>
                                                                                                <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine2 ? "h-4" : "h-0"}`}></div>
                                                                                            </div>
                                                                                            <div className='py-2'>
                                                                                                <NavLink
                                                                                                to="/dashboard/approved-premium"
                                                                                                    className={`hover:text-primary transition-all duration-[.35s] ${showLine2 ? "ml-1" : "-ml-2"} `}
                                                                                                >
                                                                                                    Approve Premium
                                                                                                </NavLink>
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* NavLink 3 */}
                                                                                        <div
                                                                                            onMouseEnter={() => setShowLine3(true)}
                                                                                            onMouseLeave={() => setShowLine3(false)}
                                                                                            className="flex gap-2 items-center"
                                                                                        >
                                                                                            <div>
                                                                                                <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine3 ? "h-4" : "h-0"}`}></div>
                                                                                            </div>
                                                                                            <div className='py-2'>
                                                                                                <NavLink
                                                                                                to="/dashboard/approved-contact-request"
                                                                                                    className={`hover:text-primary transition-all duration-[.35s] ${showLine3 ? "ml-1" : "-ml-2"} `}
                                                                                                >
                                                                                                    Approve Contact Req..
                                                                                                </NavLink>
                                                                                            </div>
                                                                                        </div>

                                                                                        {/* NavLink 4 */}
                                                                                        <div
                                                                                            onMouseEnter={() => setShowLine4(true)}
                                                                                            onMouseLeave={() => setShowLine4(false)}
                                                                                            className="flex gap-2 items-center"
                                                                                        >
                                                                                            <div>
                                                                                                <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine4 ? "h-4" : "h-0"}`}></div>
                                                                                            </div>
                                                                                            <div className='py-2'>
                                                                                                <NavLink
                                                                                                to="/dashboard/success-story"
                                                                                                    className={`hover:text-primary transition-all duration-[.35s] ${showLine4 ? "ml-1" : "-ml-2"} `}
                                                                                                >
                                                                                                    Success Stories
                                                                                                </NavLink>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                        <div>
                                                                                            {/* NavLink 2 */}
                                                                                            <div
                                                                                                onMouseEnter={() => setShowLine1(true)}
                                                                                                onMouseLeave={() => setShowLine1(false)}
                                                                                                className="flex gap-2 items-center"
                                                                                            >
                                                                                                <div>
                                                                                                    <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine1 ? "h-4" : "h-0"}`}></div>
                                                                                                </div>
                                                                                                <div className='py-2'>
                                                                                                    <NavLink
                                                                                                        to="/dashboard/edit-biodata"
                                                                                                        className={`hover:text-primary transition-all duration-[.35s] ${showLine1 ? "ml-1" : "-ml-2"} `}
                                                                                                    >
                                                                                                        Edit Biodata
                                                                                                    </NavLink>
                                                                                                </div>
                                                                                            </div>
                                                                                            {/* NavLink 2 */}
                                                                                            <div
                                                                                                onMouseEnter={() => setShowLine2(true)}
                                                                                                onMouseLeave={() => setShowLine2(false)}
                                                                                                className="flex gap-2 items-center"
                                                                                            >
                                                                                                <div>
                                                                                                    <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine2 ? "h-4" : "h-0"}`}></div>
                                                                                                </div>
                                                                                                <div className='py-2'>
                                                                                                    <NavLink
                                                                                                        to="/dashboard/view-biodata"
                                                                                                        className={`hover:text-primary transition-all duration-[.35s] ${showLine2 ? "ml-1" : "-ml-2"} `}
                                                                                                    >
                                                                                                        View Biodata
                                                                                                    </NavLink>
                                                                                                </div>
                                                                                            </div>

                                                                                            {/* NavLink 3 */}
                                                                                            <div
                                                                                                onMouseEnter={() => setShowLine3(true)}
                                                                                                onMouseLeave={() => setShowLine3(false)}
                                                                                                className="flex gap-2 items-center"
                                                                                            >
                                                                                                <div>
                                                                                                    <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine3 ? "h-4" : "h-0"}`}></div>
                                                                                                </div>
                                                                                                <div className='py-2'>
                                                                                                    <NavLink
                                                                                                        to="/dashboard/contact-request"
                                                                                                        className={`hover:text-primary transition-all duration-[.35s] ${showLine3 ? "ml-1" : "-ml-2"} `}
                                                                                                    >
                                                                                                        Contact Request
                                                                                                    </NavLink>
                                                                                                </div>
                                                                                            </div>

                                                                                            {/* NavLink 4 */}
                                                                                            <div
                                                                                                onMouseEnter={() => setShowLine4(true)}
                                                                                                onMouseLeave={() => setShowLine4(false)}
                                                                                                className="flex gap-2 items-center"
                                                                                            >
                                                                                                <div>
                                                                                                    <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine4 ? "h-4" : "h-0"}`}></div>
                                                                                                </div>
                                                                                                <div className='py-2'>
                                                                                                    <NavLink
                                                                                                        to="/dashboard/favourites"
                                                                                                        className={`hover:text-primary transition-all duration-[.35s] ${showLine4 ? "ml-1" : "-ml-2"} `}
                                                                                                    >
                                                                                                        Favourites Biodata
                                                                                                    </NavLink>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                )
                                                                        }

                                                                        {/* NavLink 5 (Logout button) */}
                                                                        <div
                                                                            onMouseEnter={() => setShowLine5(true)}
                                                                            onMouseLeave={() => setShowLine5(false)}
                                                                            className="flex gap-2 items-center"
                                                                        >
                                                                            <div>
                                                                                <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine5 ? "h-4" : "h-0"}`}></div>
                                                                            </div>
                                                                            <div className='py-2'>
                                                                                <button
                                                                                    onClick={handleLogout}
                                                                                    className={`hover:text-primary transition-all duration-[.35s] ${showLine5 ? "ml-1" : "-ml-2"}`}
                                                                                >
                                                                                    Logout
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </ul>

                                                                </div>
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
                                                <button className='h-[45px] w-[145px] dynamic-button-premium bg-primary text-white px-6 hover:text-primary py-3'><span className='absolute z-10 duration-700 font-secondary top-[10px] left-[22px]'>Get Premium</span></button>
                                            </div>
                                        </div>
                                    </ul>
                                </div>

                            </div>
                        </header>

                    </div>
                </div>
                <header className={`fixed w-full bg-white dark:bg-[#1b3c44] text-heading dark:text-heading2 z-20  transition-transform duration-[0.5s] 
            ${showNavbar ? 'transform -translate-y-[315px] md:-translate-y-[205px] lg:-translate-y-[125%]' : 'transform -translate-y-[380px]'} ${hidden && 'none'}`}>
                    <div className="px-4 mx-auto sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16 lg:h-20">
                            <div className="flex-shrink-0">
                                <a href="#" title="" className="flex gap-2 items-center">
                                    <img className='w-[25px] lg:w-[40px]' src={logo} alt="" />
                                    <p className=' text-xl lg:text-3xl'>WedMate</p>
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
                                                setMenuVisible(false)
                                        }} type="button" className="inline-flex p-1  transition-all duration-200 lg:hidden focus:bg-gray-100 hover:bg-gray-100">
                                            <div className="button-shadow !h-[42px] absolute !w-[42px]">
                                                <div className="button-content">
                                                    <span className="block w-[18px] h-[3px] bg-white mb-1"></span>
                                                    <span className="block w-[18px] h-[3px] bg-white mb-1"></span>
                                                    <span className="block w-[18px] h-[3px] bg-white"></span>
                                                </div>
                                            </div>
                                        </button>
                                    )
                                }
                            </div>

                            <ul className="hidden  ml-auto lg:flex lg:items-center lg:justify-center lg:space-x-10">
                                <NavLink className={'text-base   font-light  transition-all duration-200 hover:text-opacity-80'} to={'/'}><li className=''>Home</li></NavLink>
                                <NavLink className={'text-base  font-light   transition-all duration-200 hover:text-opacity-80'} to={'/bio-datas'}><li className=''>Biodatas</li></NavLink>
                                <NavLink className={'text-base   font-light  transition-all duration-200 hover:text-opacity-80'} to={'/gsgwgw'}><li className=''>Contact</li></NavLink>
                                <div className="w-px h-5 bg-primary"></div>
                                <div className='flex items-center'>
                                    {
                                        loading ? (
                                            <div className="skeleton w-8 h-8 rounded-full shrink-0"></div>
                                        ) : (
                                            user ? (
                                                <div className=" flex items-center gap-2 ">
                                                    <Tooltip id="my-tooltip" />
                                                    <div className='pr-4'>
                                                        <div data-tooltip-id="my-tooltip" place="top" data-tooltip-content={user?.displayName || 'Unknown'} tabIndex={0} role="button" className=" m-1">
                                                            {
                                                                user?.photoURL ? (
                                                                    <img src={user?.photoURL} alt="" className="w-8 object-cover h-8 rounded-full " />
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
                                                    <Link
                                                        onMouseEnter={() => setShowSubMenu1(true)}
                                                        onMouseLeave={() => setShowSubMenu1(false)}
                                                        to={isAdmin ? "/dashboard/admin-home" : "/dashboard/user-home"} className='font-light flex items-center gap-2  duration-[.35s]  '>Dashboard<MdKeyboardArrowDown /></Link>
                                                    {

                                                        <div
                                                            onMouseEnter={() => setShowSubMenu1(true)}
                                                            onMouseLeave={() => setShowSubMenu1(false)}
                                                            className={`absolute rounded-md bg-white dark:bg-[#1B3C44] transition-all  duration-[.35s] font-light left-12 top-[70%] ${showSubMenu1 ? "scale-y-100 -translate-y-[10px] translate-x-[870px]" : "scale-y-0 -translate-y-[120px] translate-x-[870px]"}`}>

                                                                <ul className={`${isAdmin ? "w-[220px]" : "w-[210px]"} px-4 pt-8 pb-4`}>
                                                                    {/* NavLink 1 */}
                                                                    <div
                                                                        onMouseEnter={() => setShowLine(true)}
                                                                        onMouseLeave={() => setShowLine(false)}
                                                                        className="flex  gap-2 items-center"
                                                                    >
                                                                        <div>
                                                                            <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine ? "h-4" : "h-0"}`}></div>
                                                                        </div>
                                                                        <div className='py-2'>
                                                                            <NavLink
                                                                                to={isAdmin ? "/dashboard/admin-home" : "/dashboard/user-home"}
                                                                                className={`hover:text-primary transition-all duration-[.35s] ${showLine ? "ml-1" : "-ml-2"}`}
                                                                            >
                                                                                {
                                                                                    isAdmin ? "Admin Home" : "User Home"
                                                                                }
                                                                            </NavLink>
                                                                        </div>
                                                                    </div>

                                                                    {
                                                                        isAdmin ? (
                                                                            <div>
                                                                                {/* NavLink 2 */}
                                                                                <div
                                                                                    onMouseEnter={() => setShowLine1(true)}
                                                                                    onMouseLeave={() => setShowLine1(false)}
                                                                                    className="flex gap-2 items-center"
                                                                                >
                                                                                    <div>
                                                                                        <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine1 ? "h-4" : "h-0"}`}></div>
                                                                                    </div>
                                                                                    <div className='py-2'>
                                                                                        <NavLink
                                                                                            to="/dashboard/manage-users"
                                                                                            className={`hover:text-primary transition-all duration-[.35s] ${showLine1 ? "ml-1" : "-ml-2"} `}
                                                                                        >
                                                                                            Manage Users
                                                                                        </NavLink>
                                                                                    </div>
                                                                                </div>
                                                                                {/* NavLink 2 */}
                                                                                <div
                                                                                    onMouseEnter={() => setShowLine2(true)}
                                                                                    onMouseLeave={() => setShowLine2(false)}
                                                                                    className="flex gap-2 items-center"
                                                                                >
                                                                                    <div>
                                                                                        <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine2 ? "h-4" : "h-0"}`}></div>
                                                                                    </div>
                                                                                    <div className='py-2'>
                                                                                        <NavLink
                                                                                            to="/dashboard/approved-premium"
                                                                                            className={`hover:text-primary transition-all duration-[.35s] ${showLine2 ? "ml-1" : "-ml-2"} `}
                                                                                        >
                                                                                            Approve Premium
                                                                                        </NavLink>
                                                                                    </div>
                                                                                </div>

                                                                                {/* NavLink 3 */}
                                                                                <div
                                                                                    onMouseEnter={() => setShowLine3(true)}
                                                                                    onMouseLeave={() => setShowLine3(false)}
                                                                                    className="flex gap-2 items-center"
                                                                                >
                                                                                    <div>
                                                                                        <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine3 ? "h-4" : "h-0"}`}></div>
                                                                                    </div>
                                                                                    <div className='py-2'>
                                                                                        <NavLink
                                                                                            to="/dashboard/approved-contact-request"
                                                                                            className={`hover:text-primary transition-all duration-[.35s] ${showLine3 ? "ml-1" : "-ml-2"} `}
                                                                                        >
                                                                                            Approve Contact Req..
                                                                                        </NavLink>
                                                                                    </div>
                                                                                </div>

                                                                                {/* NavLink 4 */}
                                                                                <div
                                                                                    onMouseEnter={() => setShowLine4(true)}
                                                                                    onMouseLeave={() => setShowLine4(false)}
                                                                                    className="flex gap-2 items-center"
                                                                                >
                                                                                    <div>
                                                                                        <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine4 ? "h-4" : "h-0"}`}></div>
                                                                                    </div>
                                                                                    <div className='py-2'>
                                                                                        <NavLink
                                                                                            to="/dashboard/success-story"
                                                                                            className={`hover:text-primary transition-all duration-[.35s] ${showLine4 ? "ml-1" : "-ml-2"} `}
                                                                                        >
                                                                                            Success Stories
                                                                                        </NavLink>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div>
                                                                                {/* NavLink 2 */}
                                                                                <div
                                                                                    onMouseEnter={() => setShowLine1(true)}
                                                                                    onMouseLeave={() => setShowLine1(false)}
                                                                                    className="flex gap-2 items-center"
                                                                                >
                                                                                    <div>
                                                                                        <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine1 ? "h-4" : "h-0"}`}></div>
                                                                                    </div>
                                                                                    <div className='py-2'>
                                                                                        <NavLink
                                                                                            to="/dashboard/edit-biodata"
                                                                                            className={`hover:text-primary transition-all duration-[.35s] ${showLine1 ? "ml-1" : "-ml-2"} `}
                                                                                        >
                                                                                            Edit Biodata
                                                                                        </NavLink>
                                                                                    </div>
                                                                                </div>
                                                                                {/* NavLink 2 */}
                                                                                <div
                                                                                    onMouseEnter={() => setShowLine2(true)}
                                                                                    onMouseLeave={() => setShowLine2(false)}
                                                                                    className="flex gap-2 items-center"
                                                                                >
                                                                                    <div>
                                                                                        <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine2 ? "h-4" : "h-0"}`}></div>
                                                                                    </div>
                                                                                    <div className='py-2'>
                                                                                        <NavLink
                                                                                            to="/dashboard/view-biodata"
                                                                                            className={`hover:text-primary transition-all duration-[.35s] ${showLine2 ? "ml-1" : "-ml-2"} `}
                                                                                        >
                                                                                            View Biodata
                                                                                        </NavLink>
                                                                                    </div>
                                                                                </div>

                                                                                {/* NavLink 3 */}
                                                                                <div
                                                                                    onMouseEnter={() => setShowLine3(true)}
                                                                                    onMouseLeave={() => setShowLine3(false)}
                                                                                    className="flex gap-2 items-center"
                                                                                >
                                                                                    <div>
                                                                                        <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine3 ? "h-4" : "h-0"}`}></div>
                                                                                    </div>
                                                                                    <div className='py-2'>
                                                                                        <NavLink
                                                                                            to="/dashboard/contact-request"
                                                                                            className={`hover:text-primary transition-all duration-[.35s] ${showLine3 ? "ml-1" : "-ml-2"} `}
                                                                                        >
                                                                                            Contact Request
                                                                                        </NavLink>
                                                                                    </div>
                                                                                </div>

                                                                                {/* NavLink 4 */}
                                                                                <div
                                                                                    onMouseEnter={() => setShowLine4(true)}
                                                                                    onMouseLeave={() => setShowLine4(false)}
                                                                                    className="flex gap-2 items-center"
                                                                                >
                                                                                    <div>
                                                                                        <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine4 ? "h-4" : "h-0"}`}></div>
                                                                                    </div>
                                                                                    <div className='py-2'>
                                                                                        <NavLink
                                                                                            to="/dashboard/favourites"
                                                                                            className={`hover:text-primary transition-all duration-[.35s] ${showLine4 ? "ml-1" : "-ml-2"} `}
                                                                                        >
                                                                                            Favourites Biodata
                                                                                        </NavLink>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }

                                                                    {/* NavLink 5 (Logout button) */}
                                                                    <div
                                                                        onMouseEnter={() => setShowLine5(true)}
                                                                        onMouseLeave={() => setShowLine5(false)}
                                                                        className="flex gap-2 items-center"
                                                                    >
                                                                        <div>
                                                                            <div className={`w-[2px] bg-primary transition-all duration-[.35s] ${showLine5 ? "h-4" : "h-0"}`}></div>
                                                                        </div>
                                                                        <div className='py-2'>
                                                                            <button
                                                                                onClick={handleLogout}
                                                                                className={`hover:text-primary transition-all duration-[.35s] ${showLine5 ? "ml-1" : "-ml-2"}`}
                                                                            >
                                                                                Logout
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </ul>
                                                        </div>

                                                    }
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
                                        <button className='h-[45px] w-[145px] dynamic-button-premium bg-primary text-white px-6 duration-700 hover:text-primary py-3'><span className='absolute z-10 font-secondary top-[10px] left-[22px]'>Get Premium</span></button>
                                    </div>
                                </div>
                            </ul>
                        </div>

                    </div>
                </header>


                {/* toggle menu */}
                <div className={`fixed overflow-auto w-4/6 md:w-5/12 lg:hidden py-12 px-6 h-screen transition-all duration-500 z-20 bg-white dark:bg-[#1b3c44] ${isOpen ? 'top-0 left-0 lg:bg-white dark:text-heading2  text-black' : '-left-[100%] top-0   dark:text-heading2  text-black'}`}>
                    <IoClose onClick={handleClose} className='   text-4xl font-bold text-primary w-[25px] lg:hidden absolute top-0 right-2' />
                    <ul className='flex flex-col lg:flex-row gap-4 lg:gap-6 text-sm'>
                        <div className="flex-shrink-0">
                            <a href="#" title="" className="flex gap-2 items-center">
                                <img className='w-[25px] lg:w-[40px]' src={logo} alt="" />
                                <p className=' text-xl lg:text-3xl'>WedMate</p>
                            </a>
                        </div>
                        <NavLink onClick={() => { setIsOpen(false) }} className={'text-base  font-light transition-all duration-200 hover:text-opacity-80'} to={'/'}><li className=''>Home</li></NavLink>

                        <NavLink onClick={() => { setIsOpen(false) }} className={'text-base  font-light   transition-all duration-200 hover:text-opacity-80'} to={'/bio-datas'}><li className=''>Biodatas</li>
                        </NavLink>

                        <NavLink onClick={() => { setIsOpen(false) }} className={'text-base   font-light  transition-all duration-200 hover:text-opacity-80'} to={'/about-us'}><li className=''>About</li>
                        </NavLink>

                        <NavLink onClick={() => { setIsOpen(false) }} className={'text-base   font-light  transition-all duration-200 hover:text-opacity-80'} to={'/contact'}><li className=''>Contact</li>
                        </NavLink>

                    </ul>
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
                                                        <img src={user?.photoURL} alt="" className=" size-12 object-cover  rounded-full " />
                                                    ) : (
                                                        <div className="bg-[#3bd8d8] text-lg w-8 h-8 object-cover flex justify-center items-center rounded-full">
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
                                            <p className='text-lg capitalize'>{user?.displayName}</p>
                                            <p className='text-sm font-light'>{user?.email}</p>
                                            <div className=' mt-4'>
                                                <a className='cursor-pointer ml-2' onClick={handleLogout}> Sign out</a>
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
                </div>

                <div className=''>
                    <img className=' w-[40px] lg:w-[80px] fixed bottom-0 right-0' src="https://rn53themes.net/themes/matrimo/images/leaf/8.png" alt="" />
                </div>
                <div className=''>
                    <img className='rotate-12 w-[60px] lg:w-[150px] fixed top-[200px] -left-[10px]' src="https://rn53themes.net/themes/matrimo/images/leaf/5.png" alt="" />
                </div>
            </nav>
            <section className="lg:hidden">
                <div className=" dark:text-heading2 bg-secondary2 dark:bg-[#183235]">
                    {
                        menuVisible ? "" : user ? (
                            (
                                <div className="lg:hidden fixed z-[12] top-[80px] md:right-[25px] right-[16px] flex justify-end">
                                    <button onClick={() => { setMenuVisible(!menuVisible), setShowNavbar(false), setIsOpen(false) }} className="button-shadow p-1 border-2 border-white">
                                        <div className="button-content">
                                            <img src={user?.photoURL} className="size-[38px] rounded-full object-cover" alt="" />
                                        </div>
                                    </button>
                                </div>
                            )
                        ): ""
                    }
                    <ul
                        className={`fixed lg:hidden top-0 left-0 z-[11]  bg-white dark:bg-[#1B3C44] p-6 h-full lg:w-[250px] w-[75%] max-w-[300px] space-y-3 rounded-xl transform transition-transform duration-[.5s] ease-in-out ${menuVisible ? "translate-x-0" : "-translate-x-full"
                            }`}
                    >
                        <div className="mt-12 justify-between items-center">
                            <h1 className='text-xl capitalize pl-6 pb-4 '>Hi, Welcome {user?.displayName} !</h1>
                            <div className="px-6 ">
                                <img
                                    src={user?.photoURL}
                                    className="size-[100px] rounded-full object-cover  border-4 border-[#ECF0F2] dark:border-[#183235]"
                                    alt=""
                                />
                            </div>
                            <button onClick={() => { setMenuVisible(!menuVisible), setShowNavbar(true) }} className=" absolute top-4 right-4 text-primary">
                                <IoClose className="text-3xl " />
                            </button>
                        </div>
                        {isAdmin ? (
                            <div className="px-2 space-y-2 pt-6 pb-4 font-light">
                                <NavLink onClick={() => { setMenuVisible(!menuVisible), setShowNavbar(true) }}
                                    to="/dashboard/admin-home"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <FaHome></FaHome>
                                    </div>
                                    Admin Home
                                </NavLink>
                                <NavLink onClick={() => { setMenuVisible(!menuVisible), setShowNavbar(true) }}
                                    to="/dashboard/manage-users"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <FaUsers />
                                    </div>
                                    Manage Users
                                </NavLink>
                                <NavLink onClick={() => { setMenuVisible(!menuVisible), setShowNavbar(true) }}
                                    to={`/dashboard/approved-premium`}
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <IoShieldCheckmarkOutline />
                                    </div>
                                    Approve Premium
                                </NavLink>
                                <NavLink onClick={() => { setMenuVisible(!menuVisible), setShowNavbar(true) }}
                                    to="/dashboard/contact-request"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <MdMarkEmailRead />
                                    </div>
                                    Approve Contact Req..
                                </NavLink>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMenuVisible(!menuVisible);
                                        setShowNavbar(true)
                                    }}
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <CiLogout />
                                    </div>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="px-2 space-y-2 pt-6 pb-4 font-light">
                                <NavLink onClick={() => { setMenuVisible(!menuVisible), setShowNavbar(true) }}
                                    to="/dashboard/user-home"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <FaHome></FaHome>
                                    </div>
                                    User Dashboard
                                </NavLink>
                                <NavLink onClick={() => { setMenuVisible(!menuVisible), setShowNavbar(true) }}
                                    to="/dashboard/edit-biodata"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <CiEdit />
                                    </div>
                                    Edit Biodata
                                </NavLink>
                                <NavLink onClick={() => { setMenuVisible(!menuVisible), setShowNavbar(true) }}
                                    to={`/dashboard/view-biodata`}
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <MdOutlineViewInAr />
                                    </div>
                                    View Biodata
                                </NavLink>
                                <NavLink onClick={() => { setMenuVisible(!menuVisible), setShowNavbar(true) }}
                                    to="/dashboard/contact-request"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <SlCallOut />
                                    </div>
                                    Contact Request
                                </NavLink>
                                <NavLink onClick={() => { setMenuVisible(!menuVisible), setShowNavbar(true) }}
                                    to="/dashboard/favourites"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <LuHeartHandshake />
                                    </div>
                                    Favourites Biodata
                                </NavLink>
                                <NavLink onClick={() => { setMenuVisible(!menuVisible), setShowNavbar(true) }}
                                    to="/dashboard/got-married"
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                            <GiTentacleHeart />
                                    </div>
                                        Got Married
                                </NavLink>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMenuVisible(!menuVisible);
                                        setShowNavbar(true)
                                    }}
                                    className="flex p-2 gap-2 items-center"
                                >
                                    <div>
                                        <CiLogout />
                                    </div>
                                    Logout
                                </button>
                            </div>
                        )}
                    </ul>
                </div>
            </section >
        </div >
    );
};
export default Navbar;