import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { motion } from 'framer-motion';

const SuccessStory = () => {

    const fetchSuccessStories = async () => {
        const { data } = await axios.get('../../public/success.json');
        return data;
    };
    const { data, isLoading, error } = useQuery({
        queryKey: ['successStories'],
        queryFn: fetchSuccessStories,
    });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        // centerPadding: "60px",
        // className: "center",
        // centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        // autoplay: true,
        autoplaySpeed: 2000,
        swipeToSlide: true,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading success stories</div>;

    return (
        <div className='py-12 px-6 md:px-10 lg:px-20'>
                <motion.div
                    initial={{ opacity: 1, y: 150, x: 100 }}
                    animate={{ opacity: 1, y: 80, x: 70 }}
                    transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                    className='absolute'>
                    <img className='' src="https://templates.hibotheme.com/wazo/default/assets/img/hero/hero-shape-5.png" alt="" />
                </motion.div>
            <h1 className="pl-5 border-l-4 text-primary font-semibold text-4xl">
                Heartwarming <span className='font-extrabold dark:text-heading2 text-heading'>Success Stories <br /> of Love</span> and Commitment
            </h1>
            <p className="md:w-[700px] mt-6 !text-[18px] font-secondary !leading-[26px] text-Description dark:text-Description2 sm:text-xl">
                Uncover beautiful love stories! Witness the inspiring journeys of couples who discovered true love and happiness through our community.
            </p>
            <div className="slider-container mt-12">
                <Slider {...settings} >
                    {data.sort((a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)).map(story => (
                        <div key={story._id} className=' px-4 pt-[65px] relative'>
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
                                <p className='mt-6 font-light'>{story.successStoryText}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default SuccessStory;
