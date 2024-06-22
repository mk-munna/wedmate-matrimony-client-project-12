import React, { useEffect, useState } from 'react';

import logo from '../../public/heart-crack-solid.png'
import { SlLocationPin } from 'react-icons/sl';
import { TbPhoneCall } from 'react-icons/tb';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { BsClockHistory } from 'react-icons/bs';
import { motion } from 'framer-motion';
const Footer = () => {
    const [mobile, setMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='mt-12 pt-24 pb-6 relative bg-[#ECF0F2] dark:bg-[#183235]'>
            <div className=' px-10 lg:px-20 flex flex-col lg:flex-row gap-8'>
                <motion.div
                    initial={{ opacity: 1, y: 120, x: 80 }}
                    animate={{ opacity: 1, y: 120, x: 20 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                    className='absolute'>
                    <img className=' rotate-[290deg]' src="https://templates.hibotheme.com/wazo/default/assets/img/hero/hero-shape-5.png" alt="" />
                </motion.div>
                <div className="lg:w-[400px]">
                    <a href="#" title="" className="flex gap-2 items-center">
                        <img className='w-[40px]' src={logo} alt="" />
                        <p className=' font-semibold text-heading dark:text-heading2 text-3xl'>WedMate</p>
                    </a>
                    <p className='mt-4 text-xl font-light dark:text-Description2'>Your Journey to Love Starts Here with WedMate</p>
                    <button className='h-[55px] mt-6 w-[200px] rounded-full dynamic-button2 text-primary dark:text-heading2 px-6 border-primary border hover:text-white py-3'><span className='absolute z-10 top-[15px] left-[40px]'>Register Now</span></button>
                </div>
                
                <div className='flex gap-12 flex-col font-light md:flex-row text-lg'>
                    <div className='w-[340px]'>
                        <h1 className='uppercase  dark:text-heading2 font-normal mb-8'>GET IN TOUCH</h1>
                        <div className='space-y-3 dark:text-Description2'>
                            <p className='flex items-center gap-3'><SlLocationPin className=' dark:text-primary2 text-primary text-4xl' />374 William S Canning Blvd, Fall River MA 2721, USA</p>
                            <p className='flex items-center gap-3'><TbPhoneCall className=' dark:text-primary2 text-primary text-2xl' />(+880)1893345368</p>
                            <p className='flex items-center gap-3'><MdOutlineMarkEmailRead className='text-primary  dark:text-primary2  text-2xl' />support@webmate.app</p>
                            <p className='flex items-center gap-3'><BsClockHistory className='text-primary dark:text-primary2  text-2xl' />10:00 - 17:00</p>
                        </div>
                    </div>
                    
                    <div>
                        <motion.div
                            initial={{ opacity: 1, y: 50, x: 50, scale: mobile ? 0.8 : 1 }}
                            animate={{ opacity: 1, y: 15, x: 15, scale: mobile ? 0.8 : 1 }}
                            transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                            className='absolute'>
                            <img className='w-[150px]' src="https://templates.hibotheme.com/wazo/default/assets/img/hero/hero-shape-6.png" alt="" />
                        </motion.div>
                        <h1 className='uppercase font-normal  dark:text-heading2 mb-8'>Social media</h1>
                        <div className='flex gap-4'>
                            <a href="#!"><img src="https://rn53themes.net/themes/matrimo/images/social/1.png" alt="" loading="lazy"/></a>
                            <a href="#!"><img src="https://rn53themes.net/themes/matrimo/images/social/2.png" alt="" loading="lazy"/></a>
                            <a href="#!"><img src="	https://rn53themes.net/themes/matrimo/images/social/3.png" alt="" loading="lazy"/></a>
                            <a href="#!"><img src="	https://rn53themes.net/themes/matrimo/images/social/5.png" alt="" loading="lazy"/></a>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='dark:border-[#235c50] mt-12 ' />
            <p className='font-light mt-4  dark:text-Description2 text-center py-4'>Copyright © 2024. <a href='#' className='underline cursor-pointer'>WedMate.com</a> All rights reserved.</p>
        </div>
    );
};

export default Footer;