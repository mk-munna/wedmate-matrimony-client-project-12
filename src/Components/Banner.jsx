import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter'
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import './Banner.css'
import { Link } from 'react-router-dom';


const Banner = () => {
    const [mobile, setMobile] = useState(false)
    const screen = window.innerWidth
    console.log(screen)
    useEffect(() => {
        const handleResize = () => { 
            if (window.innerWidth < 768) {
                setMobile(true)
            } else {
                setMobile(false)
            }
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    },[])
    return (
        <div className="bg-[#ECF0F2] dark:bg-[#183336]">
            <section className=" lg:max-w-[90%] mx-auto sm:py-16 lg:py-24">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex gap-12 flex-col-reverse lg:flex-row">
                        <div className='lg:w-1/2'>
                            <p className=' font-semibold rounded-md text-primary inline px-4'>Welcome To  WedMate</p>
                            <h1 className=" leading-[60px] mt-4 font-bold text-heading dark:text-heading2 md:text-[40px] text-[26px] lg:text-[50px]">Discover Your <br /> <span className='text-primary'><Typewriter
                                words={['Soulmate', 'True Love', 'Life Partner', 'Perfect Match']}
                                loop={10}
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            /></span> Here
                            </h1>
                            <p className="mt-6 !text-[18px] font-secondary !leading-[26px] text-Description dark:text-Description2 sm:text-xl">Join WedMate and find your ideal partner. Connect with people who share your values and interests. Start your journey to lasting love today!</p>
                            <div className='mt-8 flex items-center gap-8'>
                                <button className='h-[45px] w-[145px] dynamic-button bg-primary text-white px-6 hover:text-primary py-3'><span className='absolute z-10 top-[10px] left-[22px]'>Register Now</span></button>
                                <button className='flex text-gray-600 gap-5 items-center'><span className='bg-white p-3 rounded-full moving-up'><MdOutlineSupervisorAccount className='text-2xl text-primary' /></span><Link to={'/sign-up'} className='hover:border-r border-primary dark:text-Description2 rounded-md z-[1] pr-4'>Try Free</Link></button>
                            </div>
                            <div className='flex mt-12 items-center gap-8'>
                                <div className='flex'>
                                    <img className='size-[55px] bottom-0 rounded-full' src="https://templates.hibotheme.com/wazo/default/assets/img/team/author-1.jpg" alt="" />
                                    <img className='size-[55px] -ml-4 rounded-full' src="https://templates.hibotheme.com/wazo/default/assets/img/team/author-2.jpg" alt="" />
                                    <img className='size-[55px] -ml-4 rounded-full' src="https://templates.hibotheme.com/wazo/default/assets/img/team/author-3.jpg " alt="" />
                                    <img className='size-[55px] -ml-4 rounded-full' src=" https://templates.hibotheme.com/wazo/default/assets/img/team/author-4.jpg" alt="" />

                                </div>
                                <div>
                                    <p className=' text-Description dark:text-Description2 font-secondary'>Meet other Users who joined WebMate recently</p>
                                </div>
                            </div>
                        </div>

                        <div className='lg:w-1/2 py-8 relative gap-6 flex'>
                            <img className='absolute -top-12 -left-[60px] movingLeftRight' src="https://templates.hibotheme.com/wazo/default/assets/img/hero/hero-shape-7.png" alt="" />
                            <motion.div
                                initial={{ opacity: 1, y: 50, x: mobile? 180: 240 }}
                                animate={{ opacity: 1, y: 50, x: mobile? 200 : 260 }}
                                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
                                className='absolute'>
                                <img className='w-[150px]' src="https://templates.hibotheme.com/wazo/default/assets/img/hero/hero-shape-2.png" alt="" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 1, y: 350, x: -100 }}
                                animate={{ opacity: 1, y: 280, x: -70 }}
                                transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                                className='absolute'>
                                <img className='w-[150px]' src="https://templates.hibotheme.com/wazo/default/assets/img/hero/hero-shape-6.png" alt="" />
                            </motion.div>
                            <img className='absolute  opacity-10 bottom-[40px]  md:right-[150px] lg:right-0' src="https://i.ibb.co/B2QCbxh/hero-shape-1.png" alt="" />
                            <div className='z-[1]'>
                                <img className=' lg:w-[250px] ' src="https://i.ibb.co/M5PgnYc/hero-img-1.png" alt="Hero 1" />
                            </div>
                            <div className='z-[1]'>
                                <div className='h-[180px]'></div>
                                <img className=' lg:w-[250px] ' src="https://i.ibb.co/ccNznGB/hero-img-2.png" alt="Hero 2" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner;