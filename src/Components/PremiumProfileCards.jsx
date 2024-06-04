import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect } from 'react';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { SlLocationPin } from 'react-icons/sl';

const PremiumProfileCards = () => {
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['todos'],
        queryFn: () => loadData(),
    })
    const loadData = async () => {
        const { data } = await axios.get("../../public/biodatas.json")
        return data
    }
    console.log(data)
    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div className='mt-12 lg:px-16 mb-52'>
            <div className="px-6 pt-24 -mt-1">
                <h1 className="pl-5 border-l-4 text-primary text-4xl"> Shining a <span className="font-bold">Spotlight on<br /> Some Premium</span>  Profiles</h1>

                <p className="md:w-[700px] mt-6 !text-[18px] font-secondary !leading-[26px] text-Description dark:text-Description2 sm:text-xl ">Welcome to our premium profile showcase! Explore and celebrate these exceptional individuals who shine brightly in our community spotlight.</p>
            </div>

            {/* cards */}
            <div className=' px-6 lg:px-0 mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3'>
                {
                    data.map((profile, index) => {
                        return (
                            <div key={index} className='flex rounded-md  p-6 shadow-xl bg-gray-50 dark:bg-[#1c3131] flex-col gap-4'>
                                <div className='flex relative gap-4'>
                                    <div className=' absolute -top-10 left-0'>
                                        <img className='h-[100px] rounded-xl w-[100px] object-cover' src={profile.profile_image} alt="" />

                                        <span className='absolute bottom-2 right-2 text-black rounded-full p-[2px] bg-orange-200 '><MdOutlineWorkspacePremium /></span>
                                    </div>
                                    <div className='flex text-black dark:text-heading2 text-sm ml-[140px] flex-col gap-2'>
                                        <p className=''>Biodata Id : {profile.bioData_id}</p>
                                        <h1>Name : {profile.name}</h1>
                                        <p className=''>Gender : {profile.biodata_type}</p>
                                    </div>
                                </div>
                                <p className='font-light dark:text-Description2'>{profile.about.slice(0, 70) + " " + "..."}</p>
                                <div className='flex gap-4 text-sm'>
                                    <p><span className='dark:text-heading2'>Age :</span> <span className='bg-[#c2ddc4] font-light px-1 rounded-md'>{profile.age}</span></p>
                                    <span className='dark:text-heading2'>Job :  <span className='bg-[#cabcb2] font-light px-2 dark:text-black rounded-md'>{profile.occupation}</span></span>
                                </div>
                                <div className='flex dark:text-heading2 justify-between'>
                                    <p className='text-sm  flex items-center gap-1 '><SlLocationPin className='text-primary dark:text-heading2 ' /> Division : <span className='font-light'>{profile.permanent_division}</span></p>

                                    <button className='h-[12px] w-[110px] rounded-xl text-sm dynamic-button2 text-primary px-6 hover:text-white py-3'><span className='absolute z-10 top-[2px] left-[10px]'>View Details</span></button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default PremiumProfileCards;