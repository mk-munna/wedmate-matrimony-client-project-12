import React, { useEffect } from 'react';
import './Contact.css'
import { FaArrowRight } from 'react-icons/fa';
import { FiArrowDownRight } from 'react-icons/fi';
import { Box, TextField } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

import { Helmet } from "react-helmet-async";

const Contact = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className='mx-auto dark:text-Description2 max-w-[300px] md:max-w-screen-sm my-10 md:my-16 lg:my-20 lg:max-w-5xl'>
            <Helmet>
                <title>WedMate | Contact</title>
            </Helmet>
            <h1 data-aos="fade-up" data-aos-duration="500" className=' here md:text-7xl lg:text-8xl text-6xl font-OpenSans text-primary font-bold'>Here to <span className="help">support...</span></h1>
            <div className='flex flex-col lg:flex-row gap-20 md:gap-20 lg:gap-[100px] mt-20'>
                <div className='lg:w-[700px] w-[300px] md:w-full'>
                    <form data-aos="fade-right" data-aos-duration="600">
                        <p className='mb-2 font-semibold'>Name*</p>
                        <input type="text" placeholder="Your name" name="name" className="bg-transparent border border-primary2 px-6 py-[14px] rounded-md focus:outline-none w-full" />
                        <br />
                        <br />
                        <p className='mb-2 font-semibold'>Email*</p>
                        <input type="text" placeholder="Your email" name="email" className="bg-transparent border border-primary2 px-6 py-[14px] rounded-md focus:outline-none w-full " />
                        <br />
                        <br />
                        <p className='mb-2 font-semibold'>Phone*</p>
                        <input type="text" placeholder="Your phone" name="phone" className="bg-transparent border border-primary2 px-6 py-[14px] rounded-md focus:outline-none w-full " />
                        <br />
                        <br />
                        <p className='mb-2 font-semibold'>Message*</p>
                        <textarea rows={6} cols={5} type="text" placeholder="Your message" name="message" className="bg-transparent border border-primary2 px-6 py-[14px] rounded-md focus:outline-none w-full" />
                        <br />
                        <br />
                        <button className='bg-primary text-white px-8 font-Outfit py-2 rounded-md flex items-center gap-3'>Send Message<FaArrowRight /> </button>
                    </form>
                </div>
                <div data-aos="fade-left" data-aos-duration="700" className='space-y-8'>
                    <h2 className='font-PlayFairDisplay text-5xl lg:text-left text-center  font-semibold'>Join our newsletter</h2>
                    <p className='lg:text-left text-center'>Looking for love? Stay connected with the latest updates, tips, and success stories by joining our exclusive newsletter!</p>
                    <div className='w-[300px] md:w-full lg:w-full mx-0 md:mx-0 lg:mx-auto '>
                        <div className='w-[300px] md:w-[400px] lg:w-full mx-auto'>
                            <p className='mb-3 font-semibold'>Email Address</p>
                            <div className='flex'>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 0, width: '100%', maxWidth: '400px' }, // Adjusted width for better mobile layout
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        label={'Your Email'}
                                        id="Email"
                                        variant="outlined"
                                        size="small"
                                        sx={
                                            {
                                                '& .MuiInputLabel-root': {
                                                    color: 'gray',
                                                    fontSize: '12px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    top: '10%',
                                                    '&.Mui-focused': {
                                                        color: 'white',
                                                        backgroundColor: '#5BBC04',
                                                        padding: '2px 8px 2px 8px',
                                                        borderRadius: '5px',
                                                        fontWeight: 'bold',
                                                    },
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '&:hover fieldset': {
                                                        border: 'none',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        border: 'none',
                                                    },
                                                    '& input ': {
                                                        border: '1px solid gray',
                                                        borderRight: 'none',
                                                        borderRightRadius: '0px',
                                                        borderTopLeftRadius: '5px',
                                                        borderBottomLeftRadius: '5px',
                                                        color: 'white',
                                                    },
                                                },
                                            }
                                        }
                                    />
                                </Box>
                                <button><FiArrowDownRight className='bg-primary text-white rounded-r-[5px] text-[43px] p-2' /></button>
                            </div>
                        </div>
                        <div className='hidden md:flex  lg:flex flex-col md:flex-row lg:flex-row gap-16 mt-12'>
                            <div className='w-[280px]  mx-auto lg:mx-0 px-6 lg:px-0'>
                                <h3 className='font-semibold text-center lg:text-left'>Pages</h3>
                                <div className='mt-2 text-center lg:text-left'>
                                    <span className='mr-4 hover:text-primary underline cursor-pointer'>Home</span>
                                    <span className='mr-4 hover:text-primary underline cursor-pointer'>Biodatas</span>
                                    <span className='mr-4 hover:text-primary underline cursor-pointer'>Contact</span> <br />
                                    <span className='mr-4 hover:text-primary underline cursor-pointer'>About</span>
                                </div>
                                <h3 className='font-semibold mt-4 lg:text-left text-center'>Legal</h3>
                                <div className='mt-2 lg:text-left text-center'>
                                    <span className='mr-4 hover:underline cursor-pointer'>Terms of use</span>
                                    <span className='mr-4 hover:underline cursor-pointer'>Privacy policy</span>
                                    <span className='mr-4 hover:underline cursor-pointer'>Cookie policy</span> <br />
                                </div>
                            </div>
                            <div>
                                <h3 className='font-semibold text-center lg:text-left'>Alternative contact of us</h3>
                                <div className='mt-2 space-y-2 text-center lg:text-left lg:pb-0 pb-6'>
                                    <p>info@mkmunna.com</p>
                                    <p>+2535445(546)6</p>
                                    <p>Lewa House Pimibi Ltd.</p>
                                    <p>Po. Box 760</p>
                                    <p>Isiolo</p>
                                    <p>60300</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;