import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../../Components/Banner';
import PremiumProfileCards from '../../Components/PremiumProfileCards';
import HowItWorks from '../../Components/HowItWorks';
import CounterSection from '../../Components/CounterSection';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <PremiumProfileCards></PremiumProfileCards>
            <HowItWorks></HowItWorks>
            <CounterSection></CounterSection>
        </div>
    );
};

export default Home;