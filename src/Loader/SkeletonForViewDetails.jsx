import React from 'react';

const SkeletonLoaderForViewDetails = () => {
    return (
        <div className="md:mt-[80px] mt-6 px-6 md:px-16">
            <div className="animate-pulse flex flex-col gap-8 lg:flex-row">
                <div className=' mx-auto md:w-[580px] flex-grow'>
                    <div className="image-container">
                        <div className='md:w-[580px] md:h-[580px] w-[330px] h-[300px] bg-gray-300 rounded-md'></div>
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <div className='w-1/2 h-[40px] md:h-[70px] bg-gray-300 rounded-md'></div>
                        <div className='w-1/2 h-[40px] md:h-[70px] bg-gray-300 rounded-md'></div>
                    </div>
                </div>
                <div className="p-6  lg:mt-0 lg:w-1/2">
                    {/* Placeholder for text content */}
                    <div className='w-full h-8 bg-gray-300 rounded-md mb-4'></div>
                    <div className='flex gap-6'>
                        <div className='w-full h-8 bg-gray-300 rounded-md'></div>
                        <div className='w-full h-8 bg-gray-300 rounded-md'></div>
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-heading dark:text-heading2'>
                        {/* Placeholder for grid items */}
                        <div className='flex flex-col py-2 px-10 items-center border border-gray-300 rounded-md'>
                            <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
                            <div className='w-16 h-6 bg-gray-300 rounded-md mt-2'></div>
                            <div className='w-24 h-6 bg-gray-300 rounded-md mt-2'></div>
                        </div>
                        <div className='flex flex-col py-2 px-10 items-center border border-gray-300 rounded-md'>
                            <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
                            <div className='w-16 h-6 bg-gray-300 rounded-md mt-2'></div>
                            <div className='w-24 h-6 bg-gray-300 rounded-md mt-2'></div>
                        </div>
                        <div className='flex flex-col py-2 px-10 items-center border border-gray-300 rounded-md'>
                            <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
                            <div className='w-16 h-6 bg-gray-300 rounded-md mt-2'></div>
                            <div className='w-24 h-6 bg-gray-300 rounded-md mt-2'></div>
                        </div>
                        <div className='flex flex-col py-2 px-10 items-center border border-gray-300 rounded-md'>
                            <div className='w-12 h-12 bg-gray-300 rounded-full'></div>
                            <div className='w-16 h-6 bg-gray-300 rounded-md mt-2'></div>
                            <div className='w-24 h-6 bg-gray-300 rounded-md mt-2'></div>
                        </div>
                    </div>
                    {/* Placeholder for About section */}
                    <div className='w-full h-12 bg-gray-300 rounded-md mt-6'></div>
                    <div className='w-full h-64 bg-gray-300 rounded-md mt-4'></div>
                    <div className='  mt-6'>
                            <div className='w-full rounded-md p-3'>
                                <div className='w-24 h-6 bg-gray-300 rounded-md'></div>
                                <div className='w-full h-6 bg-gray-300 rounded-md mt-2'></div>
                                <div className='w-full h-6 bg-gray-300 rounded-md mt-3'></div>
                            </div>
                    </div>
                </div>
            </div>
            <div className=' flex flex-col lg:flex-row gap-14 lg:gap-32 dark:text-heading2'>
                <div className='w-full rounded-md p-3'>
                    <div className='w-24 h-6 bg-gray-300 rounded-md'></div>
                    <div className='w-full h-6 bg-gray-300 rounded-md mt-2'></div>
                    <div className='w-full h-6 bg-gray-300 rounded-md mt-3'></div>
                    <div className='w-full h-6 bg-gray-300 rounded-md mt-3'></div>
                    <div className='w-full h-6 bg-gray-300 rounded-md mt-3'></div>
                </div>
                <div className='w-full rounded-md p-3'>
                    <div className='w-24 h-6 bg-gray-300 rounded-md'></div>
                    <div className='w-full h-6 bg-gray-300 rounded-md mt-2'></div>
                    <div className='w-full h-6 bg-gray-300 rounded-md mt-3'></div>
                    <div className='w-full h-6 bg-gray-300 rounded-md mt-3'></div>
                    <div className='w-full h-6 bg-gray-300 rounded-md mt-3'></div>
                </div>
                <div className='w-full rounded-md p-3'>
                    <div className='w-24 h-6 bg-gray-300 rounded-md'></div>
                    <div className='w-full h-6 bg-gray-300 rounded-md mt-2'></div>
                    <div className='w-full h-6 bg-gray-300 rounded-md mt-3'></div>
                    <div className='w-full h-6 bg-gray-300 rounded-md mt-3'></div>
                    <div className='w-full h-6 bg-gray-300 rounded-md mt-3'></div>
                </div>
            </div>
            <div className='w-32 h-8 mt-12 bg-gray-300 rounded-md'></div>
            <div className='mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                <div className='w-full bg-gray-300 rounded-md p-6'>
                    <div className='w-full h-12 bg-gray-300 rounded-md mb-4'></div>
                </div>
                <div className='w-full bg-gray-300 rounded-md p-6'>
                    <div className='w-full h-12 bg-gray-300 rounded-md mb-4'></div>
                </div>
                <div className='w-full bg-gray-300 rounded-md p-6'>
                    <div className='w-full h-12 bg-gray-300 rounded-md mb-4'></div>
                </div>
                <div className='w-full hidden lg:block bg-gray-300 rounded-md p-6'>
                    <div className='w-full h-12 bg-gray-300 rounded-md mb-4'></div>
                </div>
                <div className='w-full hidden lg:block bg-gray-300 rounded-md p-6'>
                    <div className='w-full h-12 bg-gray-300 rounded-md mb-4'></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoaderForViewDetails;
