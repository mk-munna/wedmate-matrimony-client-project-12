import React from 'react';
import { FaUsers } from 'react-icons/fa';
import { IoIosHeartEmpty, IoIosMan } from 'react-icons/io';
import { IoWoman } from 'react-icons/io5';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const CounterSection = () => {
    
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <div className='my-24 px-6 md:px-20' ref={ref}>
            {inView && (
                <div className=' dark:shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:px-20 mx-auto border-b border-t border-primary'>
                    <div className='py-10  flex justify-center gap-4 border-t md:border-t-0  border-primary'>
                        <div className=''>
                            <div className='border rounded-md p-2 border-primary'><IoIosHeartEmpty className='text-2xl text-primary' /></div>
                        </div>
                        <div className='w-24'>
                            <h1 className='text-5xl text-primary'><CountUp end={500} duration={2} start={inView ? 0 : null} /></h1>
                            <p className='dark:text-Description2 mt-2'>COUPLES PARED</p>
                        </div>
                    </div>
                    <div className='py-10 flex justify-center gap-4 md:border-l  border-t md:border-t-0  border-primary'>
                        <div className=''>
                            <div className='border rounded-md p-2 border-primary'><IoIosMan className='text-2xl text-primary' /></div>
                        </div>
                        <div className='w-24'>
                            <h1 className='text-5xl text-primary'> <CountUp end={300} duration={2} start={inView ? 0 : null} /></h1>
                            <p className='dark:text-Description2 mt-2'>MENS</p>
                        </div>
                    </div>
                    <div className='py-10 flex justify-center gap-4 lg:border-l border-t md:border-t-0   border-primary'>
                        <div className=''>
                            <div className='border rounded-md p-2 border-primary'><IoWoman className='text-2xl text-primary' /></div>
                        </div>
                        <div className='w-24'>
                            <h1 className='text-5xl text-primary'><CountUp end={433} duration={2} start={inView ? 0 : null} /></h1>
                            <p className='uppercase dark:text-Description2 mt-2'>Womans</p>
                        </div>
                    </div>
                    <div className='py-10 flex justify-center gap-4 md:border-l border-t md:border-t-0   border-primary'>
                        <div className=''>
                            <div className='border rounded-md p-2 border-primary'><FaUsers className='text-2xl text-primary' /></div>
                        </div>
                        <div className='w-24'>
                            <h1 className='text-5xl text-primary'><CountUp end={3843} duration={2} start={inView ? 0 : null} /></h1>
                            <p className='uppercase mt-2 dark:text-Description2'>Registered</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CounterSection;