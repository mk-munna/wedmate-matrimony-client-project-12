import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../../Components/Banner';
import PremiumProfileCards from '../../Components/PremiumProfileCards';
import HowItWorks from '../../Components/HowItWorks';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <PremiumProfileCards></PremiumProfileCards>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;