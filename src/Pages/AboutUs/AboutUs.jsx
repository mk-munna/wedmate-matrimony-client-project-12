import React, { useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutUs = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className='bg-[#ECF0F2] text-heading'>
            <Helmet>
                <title>About Us | WedMate</title>
            </Helmet>
            <section className="py-10 sm:py-16 lg:py-24">
                <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h1 data-aos="fade-up" className='text-3xl font-bold sm:text-4xl lg:text-5xl'>About <span className="text-primary">WedMate</span></h1>
                        <p data-aos="fade-up" data-aos-delay="100" className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500">Connecting hearts, creating happiness.</p>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="200" className="mt-10 text-center">
                        <img className="object-cover mx-auto rounded-lg" src="https://rn53themes.net/themes/matrimo/images/banner.jpg" alt="About WedMate" />
                    </div>
                    <div data-aos="fade-up" data-aos-delay="300" className="max-w-3xl mx-auto mt-12 text-center">
                        <p className="mt-4 text-lg leading-relaxed text-gray-400">At WedMate, we believe in the power of love and the importance of meaningful connections. Our mission is to bring people together and help them find their perfect match. We provide a trusted platform where individuals can discover, connect, and build lasting relationships.</p>
                        <p className="mt-4 text-lg leading-relaxed text-gray-400">Founded with a passion for making love accessible to all, WedMate is dedicated to offering a safe and supportive environment for everyone. Whether you're looking for a life partner, companionship, or just want to explore the possibilities, we're here to support you every step of the way.</p>
                        <p className="mt-4 text-lg leading-relaxed text-gray-400">Join our community and start your journey towards finding true love today. Welcome to WedMate - where love begins!</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
