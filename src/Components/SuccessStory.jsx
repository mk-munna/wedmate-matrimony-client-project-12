import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { motion } from 'framer-motion';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const NextArrow = ({ onClick }) => {
    return (
        <div className="custom-arrow custom-next cursor-pointer " onClick={onClick}>
            <i className="fas bg-primary p-2 z-[1] absolute text-white right-0 lg:-right-10 bottom-[30%] rounded-md fa-chevron-right"></i>
        </div>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <div className="custom-arrow custom-prev cursor-pointer" onClick={onClick}>
            <i className="fas bg-primary z-[1] p-2 text-white absolute lg:-left-10 bottom-[30%] rounded-md fa-chevron-left"></i>
        </div>
    );
};

const SuccessStory = () => {
    const axiosPublic = useAxiosPublic()
    const fetchSuccessStories = async () => {
        const { data } = await axiosPublic.get(`/success-stories`);
        return data;
    };

    const { data, isPending, error } = useQuery({
        queryKey: ['successStories'],
        queryFn: fetchSuccessStories,
    });
console.log({data, isPending, error});
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 2000,
        swipeToSlide: true,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (isPending) return <div className='text-center'>Loading...</div>;
    if (error) return <div className='text-center'>Error loading success stories</div>;

    return (
        <div className='py-12 px-6 md:px-10 lg:px-20'>
            <motion.div
                initial={{ opacity: 1, y: 150, x: 100 }}
                animate={{ opacity: 1, y: 80, x: 70 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                className='absolute'>
                <img className='' src="https://templates.hibotheme.com/wazo/default/assets/img/hero/hero-shape-5.png" alt="" />
            </motion.div>
            <h1 className="pl-5 border-l-4 text-primary dark:text-primary2 font-semibold text-4xl">
                Heartwarming <span className='font-extrabold dark:text-[#bebebe] text-heading'>Success Stories <br /> of Love</span> and Commitment
            </h1>
            <p className="md:w-[700px] mt-6 !text-[18px] font-secondary !leading-[26px] text-Description dark:text-Description2 sm:text-xl">
                Uncover beautiful love stories! Witness the inspiring journeys of couples who discovered true love and happiness through our community.
            </p>
            <div className="slider-container mt-12">
                <Slider {...settings}>
                    {data?.sort((a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)).map((story) => (
                        <div key={story._id} className='px-4 pt-[65px] relative'>
                            <img
                                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 51%)' }}
                                src={story.coupleImage} alt="Couple" className='size-32 absolute left-12 -top-0 object-cover' />
                            <div className='border h-[300px] pt-[80px] px-6 rounded-xl border-primary '>
                                <div className='flex justify-between'>
                                    <p className='text-sm text-heading dark:text-heading2'>Marriage Date: <span className='font-light'>{new Date(story.marriageDate).toLocaleDateString()}</span></p>
                                    <Stack spacing={1}>
                                        <Rating name="size-small" defaultValue={story.reviewStar} size="small" />
                                    </Stack>
                                </div>
                                <p className='mt-6 font-light text-Description dark:text-Description2'>{story.successStoryText}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default SuccessStory;
