import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../../Components/Banner';
import PremiumProfileCards from '../../Components/PremiumProfileCards';
import HowItWorks from '../../Components/HowItWorks';
import CounterSection from '../../Components/CounterSection';
import SuccessStory from '../../Components/SuccessStory';

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <PremiumProfileCards></PremiumProfileCards>
            <HowItWorks></HowItWorks>
            <CounterSection></CounterSection>
            <SuccessStory></SuccessStory>
        </div>
    );
};

export default Home;