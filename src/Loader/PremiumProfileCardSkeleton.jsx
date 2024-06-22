import React from 'react';

const PremiumProfileCardSkeleton = () => {
    return (
        <div className='flex rounded-md p-6 shadow-xl bg-gray-50 dark:bg-[#1c3131] flex-col gap-4 animate-pulse'>
            <div className='flex relative gap-4'>
                <div className='absolute -top-10 left-0 bg-gray-300 dark:bg-gray-600 w-20 h-20 rounded-full'></div>
                <div className='flex text-black dark:text-heading2 text-sm ml-[140px] flex-col gap-2'>
                    <p className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></p>
                    <h1 className="w-40 h-5 bg-gray-300 dark:bg-gray-600 rounded"></h1>
                    <p className="w-24 h-4 bg-gray-300 dark:bg-gray-600 rounded"></p>
                </div>
            </div>
            <p className='font-light dark:text-Description2 w-full h-4 bg-gray-300 dark:bg-gray-600 rounded'></p>
            <div className='flex gap-4 text-sm'>
                <p className='w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded'></p>
                <span className='w-20 h-4 bg-gray-300 dark:bg-gray-600 rounded'></span>
            </div>
            <div className='flex dark:text-heading2 justify-between'>
                <p className='text-sm flex items-center gap-1'><span className='text-primary dark:text-heading2 w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded-full'></span> <span className='w-16 h-4 bg-gray-300 dark:bg-gray-600 rounded'></span></p>
                <button className='h-[25px] w-[110px] rounded-md text-sm dynamic-button2 text-primary dark:text-[#34a88b] hover:dark:text-white duration-500   px-6 hover:text-white py-3'><span className='absolute z-10 top-[3px] left-[18px] text-[12px]'>View Details</span></button>
            </div>
        </div>
    );
};

export default PremiumProfileCardSkeleton;
