import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdOutlineWorkspacePremium } from 'react-icons/md';
import { SlLocationPin } from 'react-icons/sl';
import Select from 'react-select';
import { useTheme } from '../Provider/ThemeProvider';
import PremiumProfileCardSkeleton from '../Loader/PremiumProfileCardSkeleton';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const PremiumProfileCards = () => {
    const [resultData, setResultData] = useState([]);
    const { theme } = useTheme()
    const axiosPublic = useAxiosPublic()
    const options = [
        { value: 'asc', label: ' Ascending ' },
        { value: 'dsc', label: ' Descending ' },
    ];

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['premium-profiles'],
        queryFn: () => loadData(),
    });

    const loadData = async () => {
        const { data } = await axiosPublic.get(`/biodatas/premium`);
        return data.biodatas;
    };
    console.log(data)
    const [selectedOption, setSelectedOption] = useState({ value: 'asc', label: ' Sort By Age ' });

    useEffect(() => {
        if (data) {
            const sortedData = selectedOption.value === 'asc'
                ? [...data].sort((a, b) => a.age - b.age)
                : [...data].sort((a, b) => b.age - a.age);
            setResultData(sortedData);
        }
    }, [selectedOption, data]);

    if (isError) {
        return <p className='text-center'>Error: {error.message}</p>;
    }

    return (
        <div className='lg:px-16   dark:bg-[#182d31]'>
            <div className="px-6 pt-24 -mt-1">
                <h1 className="pl-5 border-l-4 text-primary dark:text-primary2 font-semibold text-4xl">
                    Shining a <span className="font-extrabold text-heading dark:text-[#bebebe]">Spotlight on<br /> Some Premium</span> Profiles
                </h1>

                <div className='flex lg:flex-row flex-col justify-between'>
                    <p className="md:w-[700px] mt-6 !text-[18px] font-secondary !leading-[26px] text-Description dark:text-Description2 sm:text-xl">
                        Welcome to our premium profile showcase! Explore and celebrate these exceptional individuals who shine brightly in our community spotlight.
                    </p>

                    <div className='flex justify-center'>
                        <Select
                            className='mt-6 w-[150px]'
                            options={options}
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    border: `1px solid ${theme ? '#1C7261' : ''}`,
                                    borderRadius: '4px',
                                    padding: '2px',
                                    minHeight: '30px',
                                    fontSize: '14px',
                                    backgroundColor: 'transparent',
                                    color: theme ? '#FFFFDF' : '#000',
                                    '&:hover': {
                                        border: `1px solid #1C7261`,
                                        boxShadow: state.isFocused ? `0 0 0 1px #1C7261` : "",
                                    },
                                    boxShadow: "",
                                }),
                                valueContainer: (provided) => ({
                                    ...provided,
                                    padding: '0 6px',
                                    color: theme ? '#FFFFDF' : '#000',
                                }),
                                input: (provided) => ({
                                    ...provided,
                                    margin: '0',
                                    padding: '0',
                                    backgroundColor: 'transparent',
                                    color: theme ? '#FFFFDF' : '#000',
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    fontSize: '14px',
                                    color: theme ? '#CBCCD5' : '#000',
                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isSelected ? '#1B7261' : state.isFocused ? '#CABCB2' : theme ? '#333' : '#FFF',
                                    color: state.isSelected ? "white" : state.isFocused ? 'black' : theme ? '#FFF' : '#000',
                                    fontSize: '14px',
                                    ':active': {
                                        backgroundColor: '#1B7261',
                                        color: '#FFF',
                                    },
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    fontSize: '14px',
                                    backgroundColor: theme ? '#333' : '#FFF',
                                    color: theme ? '#FFF' : '#000',
                                }),
                                placeholder: (provided) => ({
                                    ...provided,
                                    fontSize: '14px',
                                    color: theme ? '#BEBEBE' : '#000',
                                }),
                                indicatorsContainer: (provided) => ({
                                    ...provided,
                                    height: '30px',
                                    color: theme ? 'white' : '#000',
                                }),

                            }}
                        />
                    </div>
                </div>
            </div>

            {/* cards */}
            <div className='px-6 lg:px-0 mt-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3'>
                {
                    isPending
                        ? Array.from({ length: 6 }).map((_, index) => <PremiumProfileCardSkeleton key={index} />)
                        : resultData?.map((profile, index) => (
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
                                <p className='font-light dark:text-Description2'>{profile?.about?.slice(0, 70) + " ..."}</p>
                                <div className='flex gap-4 text-sm'>
                                    <p><span className='dark:text-heading2'>Age :</span> <span className='bg-[#c2ddc4] font-light px-1 rounded-md'>{profile.age}</span></p>
                                    <span className='dark:text-heading2'>Job : <span className='bg-[#cabcb2] font-light px-2 dark:text-black rounded-md'>{profile.occupation}</span></span>
                                </div>
                                <div className='flex dark:text-heading2 justify-between'>
                                    <p className='text-sm flex items-center gap-1'><SlLocationPin className='text-primary dark:text-heading2' /> Division : <span className='font-light'>{profile.permanent_division}</span></p>
                                    <Link to={`/details/${profile._id}`} className='h-[25px] w-[110px] rounded-md text-sm dynamic-button2 text-primary dark:text-[#34a88b] hover:dark:text-white duration-500   px-6 hover:text-white py-3'><span className='absolute z-10 top-[3px] left-[18px] text-[12px]'>View Details</span></Link>
                                </div>
                            </div>
                        ))}
            </div>
        </div>
    );
};

export default PremiumProfileCards;
