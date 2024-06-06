import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { SlLocationPin } from 'react-icons/sl';
import Select from 'react-select';

const PremiumProfileCards = () => {
    const [resultData, setResultData] = useState([]);
    const options = [
        { value: 'asc', label: ' Ascending ' },
        { value: 'dsc', label: ' Descending ' },
    ];

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['premium-profiles'],
        queryFn: () => loadData(),
    });

    const loadData = async () => {
        const { data } = await axios.get("../../public/biodatas.json");
        return data;
    };

    const [selectedOption, setSelectedOption] = useState({ value: 'asc', label: ' Sort By Age ' });

    useEffect(() => {
        if (data) {
            const sortedData = selectedOption.value === 'asc'
                ? [...data].sort((a, b) => a.age - b.age)
                : [...data].sort((a, b) => b.age - a.age);
            setResultData(sortedData);
        }
    }, [selectedOption, data]);

    if (isPending) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    return (
        <div className='lg:px-16  bg-[#fcfffb] dark:bg-dark'>
            <div className="px-6 pt-24 -mt-1">
                <h1 className="pl-5 border-l-4 text-primary font-semibold text-4xl">
                    Shining a <span className="font-extrabold text-heading dark:text-heading2">Spotlight on<br /> Some Premium</span> Profiles
                </h1>

                <div className='flex lg:flex-row flex-col justify-between'>
                    <p className="md:w-[700px] mt-6 !text-[18px] font-secondary !leading-[26px] text-Description dark:text-Description2 sm:text-xl">
                        Welcome to our premium profile showcase! Explore and celebrate these exceptional individuals who shine brightly in our community spotlight.
                    </p>

                    <Select
                        options={options}
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        styles={{
                            control: (baseStyles) => ({
                                ...baseStyles,
                                fontSize: '12px',
                                backgroundColor: '#1C7261',
                                border: "none",
                            }),
                            menu: (baseStyles) => ({
                                ...baseStyles,
                                fontSize: "12px",
                                border: "none",
                            }),
                            singleValue: (baseStyles) => ({
                                ...baseStyles,
                                color: 'white',

                            }),
                        }}
                        theme={(theme) => ({
                            ...theme,
                            border: "none",
                            borderRadius: 5,
                            fontSIze: "12px",
                            colors: {
                                ...theme.colors,
                                primary25: '#DBE6E6',
                                primary: '#1B7261',
                            },
                        })}
                    />
                </div>
            </div>

            {/* cards */}
            <div className='px-6 lg:px-0 mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3'>
                {resultData.map((profile, index) => (
                    <div key={index} className='flex rounded-md p-6 shadow-xl bg-gray-50 dark:bg-[#1c3131] flex-col gap-4'>
                        <div className='flex relative gap-4'>
                            <div className='absolute -top-10 left-0'>
                                <img className='h-[100px] rounded-xl w-[100px] object-cover' src={profile.profile_image} alt="" />
                                <span className='absolute bottom-2 right-2 text-black rounded-full p-[2px] bg-yellow-500'><MdOutlineWorkspacePremium /></span>
                            </div>
                            <div className='flex text-black dark:text-heading2 text-sm ml-[140px] flex-col gap-2'>
                                <p>Biodata Id : {profile.bioData_id}</p>
                                <h1>Name : {profile.name}</h1>
                                <p>Gender : {profile.bioData_type}</p>
                            </div>
                        </div>
                        <p className='font-light dark:text-Description2'>{profile.about.slice(0, 70) + " ..."}</p>
                        <div className='flex gap-4 text-sm'>
                            <p><span className='dark:text-heading2'>Age :</span> <span className='bg-[#c2ddc4] font-light px-1 rounded-md'>{profile.age}</span></p>
                            <span className='dark:text-heading2'>Job : <span className='bg-[#cabcb2] font-light px-2 dark:text-black rounded-md'>{profile.occupation}</span></span>
                        </div>
                        <div className='flex dark:text-heading2 justify-between'>
                            <p className='text-sm flex items-center gap-1'><SlLocationPin className='text-primary dark:text-heading2' /> Division : <span className='font-light'>{profile.permanent_division}</span></p>
                            <button className='h-[25px] w-[110px] rounded-md text-sm dynamic-button2 text-primary px-6 hover:text-white py-3'><span className='absolute z-10 top-[3px] left-[18px] text-[12px]'>View Details</span></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PremiumProfileCards;
