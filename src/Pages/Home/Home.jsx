import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../../Components/Banner';
import PremiumProfileCards from '../../Components/PremiumProfileCards';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Banner></Banner>
            <PremiumProfileCards></PremiumProfileCards>
        </div>
    );
};

export default Home;