
import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="p-4 border rounded-lg animate-pulse">
            <div className="w-full h-32 bg-gray-300 rounded-lg mb-4"></div>
            <div className='flex justify-between'>
                <div className="w-1/4 h-5 bg-gray-300 rounded"></div>
                <div className='w-1/4 h-5 bg-gray-300 rounded'></div>
            </div>
            <div className='space-y-1 mt-2'>
                <div className='w-1/3 h-4 bg-gray-300 rounded'></div>
                <div className='w-2/3 h-4 bg-gray-300 rounded'></div>
                <div className='w-1/2 h-4 bg-gray-300 rounded'></div>
            </div>
            <div className='flex gap-4 mt-2'>
                <div className='w-[110px] h-6 bg-gray-300 rounded-md'></div>
                <div className='w-[25px] h-6 bg-gray-300 rounded-md'></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
