import React from 'react';

import logo from '../../public/heart-crack-solid.png'
const Footer = () => {
    return (
        <div className='mt-12'>
            <hr />
            <div className='mt-20 px-20'>
                <div className='flex items-center gap2'>
                    <img src={logo} alt="" />
                </div>
           </div>
        </div>
    );
};

export default Footer;